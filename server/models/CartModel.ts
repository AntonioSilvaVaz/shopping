import { UUID } from "crypto";
import prisma from "./connections";
import { CartType } from "../types/CartTypes";

async function createCart(user_id: UUID) {
  const cartCreated: CartType = await prisma.cart.create({
    data: {
      user_id,
      list: JSON.stringify([]),
    }
  });
  return cartCreated;
};

async function deleteCart(user_id: UUID) {
  await prisma.cart.delete({
    where: {
      user_id,
    }
  })
};

async function getCartFromUser(user_id: UUID) {

  const cart: CartType = await prisma.cart.findUnique({
    where: {
      user_id
    }
  });

  return cart;

};

async function addToUserCart(item_id: UUID, user_id: UUID) {

  const currentCart = await getCartFromUser(user_id);
  const currList = JSON.parse(currentCart.list);
  currList.push(item_id);

  const cartUpdated: CartType = await prisma.cart.update({
    where: {
      user_id
    },
    data: {
      list: JSON.stringify(currList)
    }
  });

  return cartUpdated;
};

async function removeFromUserCart(item_id: UUID, user_id: UUID) {
  const currentCart = await getCartFromUser(user_id);
  const currList = JSON.parse(currentCart.list);
  const updatedList = currList.filter((currItemId: UUID) => item_id !== currItemId);

  const cartUpdated: CartType = await prisma.cart.update({
    where: {
      user_id
    },
    data: {
      list: JSON.stringify(updatedList)
    }
  });

  return cartUpdated;
};

module.exports = {
  getCartFromUser,
  createCart,
  deleteCart,
  addToUserCart,
  removeFromUserCart,
}