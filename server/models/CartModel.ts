import { UUID } from "crypto";
import prisma from "./connections";
import { CartType, CartTypeJSON, CartListType } from "../types/CartTypes";

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

async function getCartFromUser(user_id: UUID): Promise<CartTypeJSON> {

  const cart: CartTypeJSON = await prisma.cart.findUnique({
    where: {
      user_id
    }
  });

  return cart;

};

async function addToUserCart(item_id: UUID, user_id: UUID, amount: number) {

  const currentCart = await getCartFromUser(user_id);
  const currList = JSON.parse(currentCart.list);

  let itemFound = false;

  for (let index = 0; index < currList.length; index++) {

    const item: CartListType = currList[index];
    if (item.item_id === item_id) {
      itemFound = true;
      currList[index].amount += amount;
      break;
    }

  }

  if (!itemFound) {
    currList.push({ amount: 1, item_id });
  }

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

async function removeFromUserCart(item_id: UUID, user_id: UUID, amountRemove: number) {
  const currentCart = await getCartFromUser(user_id);
  const currList: CartListType[] = JSON.parse(currentCart.list);

  let updatedList;

  if (amountRemove === -1) {
    updatedList = currList.filter((item) => item_id !== item.item_id);
  } else {
    for (let index = 0; index < currList.length; index++) {

      const item: CartListType = currList[index];
      if (item.item_id === item_id) {
        currList[index].amount -= amountRemove;
        if (currList[index].amount <= 0) {
          currList.splice(index, 1);
        }

        break;
      }

    }
    updatedList = currList;
  }

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