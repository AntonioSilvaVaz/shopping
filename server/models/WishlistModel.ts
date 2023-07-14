import { UUID } from "crypto";
import prisma from "./connections";
import { WishlistJSON, WishlistList, WishlistType } from "../types/WishlistTypes";

// CREATES A NEW WISHLIST
async function createWishlist(user_id: UUID) {
  const wishlistCreated: WishlistType = await prisma.wishlist.create({
    data: {
      user_id,
      list: JSON.stringify([]),
    },
    select: {
      user_id: true,
      list: true
    },
  });
  return wishlistCreated;
};

// DELETES A WISHLIST
async function deleteWishlist(user_id: UUID) {
  await prisma.wishlist.delete({
    where: {
      user_id,
    }
  })
};

// GETS A WISHLIST FROM A SPECIFIC USER
async function getWishlistFromUser(user_id: UUID): Promise<WishlistJSON> {

  const wishlist: WishlistJSON = await prisma.wishlist.findUnique({
    where: {
      user_id
    },
    select: {
      user_id: true,
      list: true
    },
  });

  return wishlist;

};

// ADDS TO USER WISHLIST
async function addToUserWishlist(item_id: UUID, user_id: UUID, amount: number) {

  const currentWishlist: WishlistJSON = await getWishlistFromUser(user_id);
  const newList: WishlistList[] = JSON.parse(currentWishlist.list);

  let itemFound = false;

  for (let index = 0; index < newList.length; index++) {

    const item: WishlistList = newList[index];
    if (item.item_id === item_id) {
      itemFound = true;
      newList[index].amount += amount;
      break;
    }

  }

  if (!itemFound) {
    newList.push({ amount: 1, item_id });
  }


  const wishlistUpdated: WishlistType = await prisma.wishlist.update({
    where: {
      user_id
    },
    select: {
      user_id: true,
      list: true
    },
    data: {
      list: JSON.stringify(newList)
    }
  });

  return wishlistUpdated;
};

// REMOVES FROM USER WISHLIST
async function removeFromUserWishlist(item_id: UUID, user_id: UUID, amountRemove: number) {

  const currentWishlist: WishlistJSON = await getWishlistFromUser(user_id);
  const newList: WishlistList[] = JSON.parse(currentWishlist.list);

  let wishlistUpdated;

  if (amountRemove === -1) {
    wishlistUpdated = newList.filter((item) => item_id !== item.item_id);
  } else {
    for (let index = 0; index < newList.length; index++) {

      const item: WishlistList = newList[index];
      if (item.item_id === item_id) {
        newList[index].amount -= amountRemove;
        if (newList[index].amount <= 0) {
          newList.splice(index, 1);
        }

        break;
      }

    }
    wishlistUpdated = newList;
  }

  const cartUpdated: WishlistType = await prisma.wishlist.update({
    where: {
      user_id
    },
    select: {
      user_id: true,
      list: true
    },
    data: {
      list: JSON.stringify(wishlistUpdated)
    }
  });

  return cartUpdated;
};

module.exports = {
  getWishlistFromUser,
  createWishlist,
  deleteWishlist,
  addToUserWishlist,
  removeFromUserWishlist,
}