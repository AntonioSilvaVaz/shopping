import { Next, Context } from "koa";
import { SessionTokenType, UserRegistered, UserType } from "../types/UserTypes";
import { UUID } from "crypto";
const {
  createUser,
  findUserByEmail,
  deleteUser,
  updateUser,
  findUserById,
} = require("../models/UserModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

async function createProfilePicture(img: any, fileName: string) {
  const destinationPath = `images/profile_pictures/${fileName}.jpg`;
  fs.renameSync(img.filepath, destinationPath);
  return fileName;
}

async function deleteProfilePicture(fileName: string) {
  fs.unlinkSync(`images/profile_pictures/${fileName}`);
}

async function deleteItemPicture(fileNames: string[]) {
  fileNames.forEach((fileName) => {
    fs.unlinkSync(`images/items/${fileName}`);
  });
}

async function loginUser(ctx: Context, next: Next) {
  try {
    const { email, password } = ctx.request.body as UserType;
    const userExists: UserRegistered | undefined = await findUserByEmail(email);

    if (!userExists) {
      ctx.status = 404;
      ctx.type = "application/json";
      ctx.body = JSON.stringify("User doesn't exist");
      return;
    }

    const samePassword = bcrypt.compareSync(password, userExists.password);
    if (samePassword) {
      const sessionToken = jwt.sign(
        { user_id: userExists.user_id },
        process.env.SECRET
      );
      ctx.cookies.set("session_token", sessionToken, {
        path: "/",
        domain: "localhost",
        secure: false,
        httpOnly: false,
        maxAge: 3600000,
        sameSite: "strict",
      });
      ctx.status = 200;
      ctx.type = "application/json";
      ctx.body = JSON.stringify(userExists);
      return;
    } else {
      ctx.status = 401;
      ctx.type = "application/json";
      ctx.body = JSON.stringify("Wrong password");
      return;
    }
  } catch (error) {
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

async function createNewUser(ctx: any, next: Next) {
  let fileName;
  try {
    const { email, password, name }: UserType = ctx.request.body as UserType;
    const userExists = await findUserByEmail(email);

    if (userExists) {
      ctx.status = 409;
      ctx.type = "application/json";
      ctx.body = JSON.stringify("User already exists");
      return;
    }

    const newUser = await createUser({ email, password, name });

    if (ctx.request.files.profile_picture) {
      fileName = await createProfilePicture(
        ctx.request.files.profile_picture,
        newUser.user_id
      );
    }

    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(newUser);
  } catch (error) {
    if (fileName) {
      deleteProfilePicture(fileName);
    }
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

async function sendUserId(ctx: Context, next: Next) {
  const user_id = getUserSessionToken(ctx);
  ctx.status = 200;
  ctx.type = "application/json";
  ctx.body = JSON.stringify({ user_id });
}

async function deleteAnUser(ctx: Context, next: Next) {
  try {
    const { profile_picture } = ctx.request.body as { profile_picture: string };

    const userId = getUserSessionToken(ctx);
    const pictures_delete: string[] = await deleteUser(userId);
    pictures_delete.forEach((value) => {
      deleteItemPicture(JSON.parse(value));
    });

    if (profile_picture) {
      deleteProfilePicture(profile_picture);
    }
    ctx.status = 201;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("User deleted");
  } catch (error) {
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

async function updatedAnUser(ctx: any, next: Next) {
  let fileName;
  try {
    const user_id = getUserSessionToken(ctx);
    if (!user_id) return;

    const updateItems: any = {};
    const { email, password, name, profile_picture } = ctx.request
      .body as UserType;

    if (email) updateItems.email = email;
    if (password) updateItems.password = password;
    if (name) updateItems.name = name;
    if (ctx.request.files.profile_picture) {
      fileName = await createProfilePicture(
        ctx.request.files.profile_picture,
        user_id
      );
      updateItems.profile_picture = fileName;
      if (profile_picture) {
        deleteProfilePicture(profile_picture);
      }
    }

    if (email) {
      const userExists = await findUserByEmail(email);
      if (userExists) {
        ctx.status = 409;
        ctx.type = "application/json";
        ctx.body = JSON.stringify("User already exists");
        return;
      }
    }

    const userUpdated = await updateUser(updateItems, user_id);
    ctx.status = 202;
    ctx.type = "application/json";
    ctx.body = JSON.stringify(userUpdated);
  } catch (error) {
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

async function logUserOut(ctx: Context, next: Next) {
  try {
    ctx.cookies.set("session_token", null);
    ctx.status = 200;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Logged out");
  } catch (error) {
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

async function getUserInfo(ctx: Context, next: Next) {
  try {
    const { user_id } = ctx.request.body as { user_id: UUID };
    const userInfo = await findUserById(user_id);

    if (userInfo === null) {
      ctx.status = 404;
      ctx.type = "application/json";
      ctx.body = JSON.stringify(404);
      return;
    } else {
      ctx.status = 200;
      ctx.type = "application/json";
      ctx.body = JSON.stringify(userInfo);
    }
  } catch (error) {
    ctx.status = 500;
    ctx.type = "application/json";
    ctx.body = JSON.stringify("Server failed");
  }
}

// GETS THE USER ID FROM THE SESSION TOKEN
function getUserSessionToken(ctx: Context): UUID | undefined {
  const sessionTokenJWT = ctx.cookies.get("session_token");

  if (!sessionTokenJWT) return undefined;
  const sessionToken: SessionTokenType = jwt.verify(
    sessionTokenJWT,
    process.env.SECRET
  );
  return sessionToken.user_id;
}

module.exports = {
  createNewUser,
  sendUserId,
  deleteAnUser,
  loginUser,
  updatedAnUser,
  logUserOut,
  getUserSessionToken,
  getUserInfo,
};
