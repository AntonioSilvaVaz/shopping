import { UUID } from "crypto";
import prisma from "./connections";
import { WishlistType } from "../types/WishlistTypes";

// CREATES A NEW WISHLIST
async function createWishlist(user_id: UUID) {
  const wishlistCreated: WishlistType = await prisma.wishlist.create({
    data: {
      user_id,
      list: JSON.stringify([]),
    }
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
async function getWishlistFromUser(user_id: UUID) {

  const wishlist: WishlistType = await prisma.wishlist.findUnique({
    where: {
      user_id
    }
  });

  return wishlist;

};

// ADDS TO USER WISHLIST
async function addToUserWishlist(item_id: UUID, user_id: UUID) {

  const currentWishlist: WishlistType = await getWishlistFromUser(user_id);
  const newList = JSON.parse(currentWishlist.list);
  newList.push(item_id);

  const wishlistUpdated: WishlistType = await prisma.wishlist.update({
    where: {
      user_id
    },
    data: {
      list: JSON.stringify(newList)
    }
  });

  return wishlistUpdated;
};

// REMOVES FROM USER WISHLIST
async function removeFromUserWishlist(item_id: UUID, user_id: UUID) {
  const currentWishlist = await getWishlistFromUser(user_id);
  const newList = JSON.parse(currentWishlist.list);
  const wishlistUpdated = newList.filter((currItemId: UUID) => item_id !== currItemId);

  const cartUpdated: WishlistType = await prisma.wishlist.update({
    where: {
      user_id
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