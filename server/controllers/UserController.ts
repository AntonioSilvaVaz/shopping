import { Next, Context } from "koa";
import { SessionTokenType, UserRegistered, UserType } from "../types/UserTypes";
const { createUser, findUserByEmail, deleteUser, updateUser } = require('../models/UserModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

async function loginUser(ctx: Context, next: Next) {

  try {
    const { email, password } = ctx.request.body as UserType;
    const userExists: UserRegistered | undefined = await findUserByEmail(email);

    if (!userExists) {
      ctx.status = 404;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify("User doesn't exist");
      return;
    }

    const samePassword = bcrypt.compareSync(password, userExists.password);
    if (samePassword) {
      const sessionToken = jwt.sign({ user_id: userExists.user_id }, process.env.SECRET);
      ctx.cookies.set("session_token", sessionToken);
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify("Logged in");
      return;
    } else {
      ctx.status = 401;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify("Wrong password");
      return;
    }

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

async function createNewUser(ctx: Context, next: Next) {

  try {
    const { email, password, name }: UserType = ctx.request.body as UserType;
    const userExists = await findUserByEmail(email);

    if (userExists) {
      ctx.status = 409;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('User already exists');
      return;
    };

    const newUser = await createUser({ email, password, name });
    ctx.status = 200;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(newUser);

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

async function deleteAnUser(ctx: Context, next: Next) {

  try {
    const userId = getUserSessionToken(ctx);
    await deleteUser(userId);
    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('User deleted');

  } catch (error) {

    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');

  }

};

async function updatedAnUser(ctx: Context, next: Next) {

  try {
    const sessionTokenJWT = ctx.cookies.get('session_token');
    const sessionToken = jwt.verify(sessionTokenJWT, process.env.SECRET);

    const updateItems: any = {};
    const { email, password, name } = ctx.request.body as UserType;

    if (email) updateItems.email = email;
    if (password) updateItems.password = password;
    if (name) updateItems.name = name;

    if (email) {
      const userExists = await findUserByEmail(email);
      if (userExists) {
        ctx.status = 409;
        ctx.type = 'application/json';
        ctx.body = JSON.stringify('User already exists');
        return;
      };
    }

    const userUpdated = await updateUser(updateItems, sessionToken.user_id)
    ctx.status = 202;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(userUpdated);

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

async function logUserOut(ctx: Context, next: Next) {

  try {
    ctx.cookies.set('session_token', null);
    ctx.status = 200;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Logged out');

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }
};

// GETS THE USER ID FROM THE SESSION TOKEN
function getUserSessionToken(ctx: Context) {
  const sessionTokenJWT = ctx.cookies.get('session_token');
  const sessionToken: SessionTokenType = jwt.verify(sessionTokenJWT, process.env.SECRET);
  return sessionToken.user_id;
};

module.exports = {
  createNewUser,
  deleteAnUser,
  loginUser,
  updatedAnUser,
  logUserOut,
  getUserSessionToken,
};