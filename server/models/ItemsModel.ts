import { UUID } from "crypto";
import { ItemCreated, ItemType } from "../types/ItemTypes";
import prisma from "./connections";

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

  await prisma.items.delete({
    where: {
      item_id,
    }
  });
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
}