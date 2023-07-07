import { UUID } from "crypto";
import { UserRegistered, UserType } from "../types/UserTypes";
import prisma from "./connections";

// CREATES A USER WITH (NAME, EMAIL, PASSWORD, USER_ID)
async function createUser(userInfo: UserType) {

  const newUser: UserRegistered = await prisma.users.create({
    data: {
      ...userInfo,
      user_id: crypto.randomUUID(),
    }
  });

  return newUser;

};

// DELETES AN USER BY USER ID
async function deleteUser(user_id: UUID) {
  await prisma.users.delete({
    where: {
      user_id,
    }
  });
};

// UPDATES ALL OF THE USER INFORMATION
async function updateUser(userInfo: UserType, user_id: UUID) {

  const updatedUser: UserRegistered = await prisma.users.update({
    where: {
      user_id,
    },
    data:{
      ...userInfo
    }
  });

  return updatedUser;

};

// FINDS A USER AND RETURNS IT'S INFORMATION
async function findUser(user_id:UUID) {

  const user: UserRegistered = prisma.users.findUnique({
    where: {
      user_id
    }
  });

  return user;
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUser,
}