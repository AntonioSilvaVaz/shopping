import { UUID } from "crypto";
import { UserRegistered, UserType } from "../types/UserTypes";
import prisma from "./connections";
const { createCart, deleteCart } = require('./CartModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// CREATES A USER WITH (NAME, EMAIL, PASSWORD, USER_ID)
async function createUser(userInfo: UserType): Promise<UserRegistered> {

  // hashing the password
  userInfo.password = bcrypt.hashSync(userInfo.password, Number(process.env.SALT_ROUNDS));
  const user_id = crypto.randomUUID();

  const newUser: UserRegistered = await prisma.users.create({
    data: {
      ...userInfo,
      user_id
    }
  });

  await createCart(user_id);

  return newUser;
};

// DELETES AN USER BY USER ID
async function deleteUser(user_id: UUID) {
  await prisma.users.delete({
    where: {
      user_id,
    }
  });

  await deleteCart(user_id);
};

// UPDATES ALL OF THE USER INFORMATION
async function updateUser(userInfo: UserType, user_id: UUID) {

  if (userInfo.password) {
    userInfo.password = bcrypt.hashSync(userInfo.password, Number(process.env.SALT_ROUNDS));
  }

  const updatedUser: UserRegistered = await prisma.users.update({
    where: {
      user_id,
    },
    data: {
      ...userInfo
    }
  });

  return updatedUser;

};

// FINDS A USER BY ID
async function findUserById(user_id: UUID) {

  const user: UserRegistered = await prisma.users.findUnique({
    where: {
      user_id
    }
  });

  return user;
};

// FINDS A USER BY EMAIL
async function findUserByEmail(email: string) {

  const user: UserRegistered = await prisma.users.findUnique({
    where: {
      email
    }
  });

  return user;
};

module.exports = {
  createUser,
  deleteUser,
  updateUser,
  findUserById,
  findUserByEmail,
}