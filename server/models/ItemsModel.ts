import { UUID } from "crypto";
import { ItemCreated, ItemType } from "../types/ItemTypes";
import prisma from "./connections";

// const { deleteItemPicture } = require('../controllers/ItemController');

// CREATES AN ITEM
async function createItem(itemInfo: ItemType, user_id: UUID): Promise<ItemCreated> {

  const newItem: ItemCreated = await prisma.items.create({
    data: {
      item_id: crypto.randomUUID(),
      user_created: user_id,
      ...itemInfo,
    },
    select: {
      product_name: true,
      product_description: true,
      product_price: true,
      product_region: true,
      product_pictures: true,
      item_id: true,
    },
  });

  return newItem;

};

// DELETES AN ITEM BY ITEM ID
async function deleteItem(item_id: UUID) {

  const item: ItemCreated = await prisma.items.delete({
    where: {
      item_id,
    }
  });

  return item.product_pictures;
};

async function deleteAllFromUser(user_id: UUID) {

  const userItems = await prisma.$transaction([
    prisma.items.findMany({
      where: {
        user_created: user_id,
      },
      select: {
        product_pictures: true,
      }
    }),
    prisma.items.deleteMany({
      where: {
        user_created: user_id,
      }
    })
  ])

  const productPictures: string[] = userItems[0].map((item: { product_pictures: string }) => {
    return item.product_pictures;
  });

  return productPictures;
};

// UPDATES ALL OF THE USER INFORMATION
async function updateItem(itemInfo: ItemType, item_id: UUID): Promise<ItemCreated> {

  const updatedItem: ItemCreated = await prisma.items.update({
    where: {
      item_id,
    },
    data: {
      ...itemInfo
    },
    select: {
      product_name: true,
      product_description: true,
      product_price: true,
      product_region: true,
      product_pictures: true,
      item_id: true,
    },
  });

  return updatedItem;

};

// FINDS A USER AND RETURNS IT'S INFORMATION
async function findItem(item_id: UUID): Promise<ItemCreated> {

  const item: ItemCreated = prisma.items.findUnique({
    where: {
      item_id
    },
    select: {
      product_name: true,
      product_description: true,
      product_price: true,
      product_region: true,
      product_pictures: true,
      item_id: true,
      user_created: true,
    },
  });

  return item;
};

module.exports = {
  createItem,
  deleteItem,
  updateItem,
  findItem,
  deleteAllFromUser
}