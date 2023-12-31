import { UUID } from "crypto";
import { UserRegistered, UserType } from "../types/UserTypes";
import prisma from "./connections";
const { createCart, deleteCart } = require('./CartModel');
const { createWishlist, deleteWishlist } = require('./WishlistModel');
const { deleteAllFromUser } = require('./ItemsModel');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');

// CREATES A USER WITH (NAME, EMAIL, PASSWORD, USER_ID)
async function createUser(userInfo: UserType): Promise<UserRegistered> {

  // hashing the password
  userInfo.password = bcrypt.hashSync(userInfo.password, Number(process.env.SALT_ROUNDS));
  const user_id = crypto.randomUUID();

  const newUser: UserRegistered = await prisma.users.create({
    select: {
      name: true,
      user_id: true,
      email: true,
      profile_picture: true,
    },
    data: {
      ...userInfo,
      profile_picture: user_id + '.jpg',
      user_id
    }
  });

  const createCartPromise = createCart(user_id);
  const createWishlistPromise = createWishlist(user_id);
  await Promise.all([createCartPromise, createWishlistPromise])

  return newUser;
};

// DELETES AN USER BY USER ID
async function deleteUser(user_id: UUID) {

  const deleteCartPromise = deleteCart(user_id);
  const deleteWishlistPromise = deleteWishlist(user_id);
  const deleteUserItems = deleteAllFromUser(user_id);
  const [_, __, fileNames] = await Promise.all([deleteCartPromise, deleteWishlistPromise, deleteUserItems])

  await prisma.users.delete({
    where: {
      user_id,
    }
  });

  return fileNames

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
    select: {
      name: true,
      user_id: true,
      email: true,
      profile_picture: true,
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
    },
    select: {
      name: true,
      user_id: true,
      email: true,
      profile_picture: true,
    },
  });

  return user;
};

// FINDS A USER BY EMAIL
async function findUserByEmail(email: string) {

  const user: UserRegistered = await prisma.users.findUnique({
    where: {
      email,
    },
    select: {
      name: true,
      user_id: true,
      email: true,
      profile_picture: true,
      password: true,
    },
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