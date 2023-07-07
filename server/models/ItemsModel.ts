import { UUID } from "crypto";
import { ItemCreated, ItemType } from "../types/UserTypes";
import prisma from "./connections";

// CREATES AN ITEM
async function createItem(itemInfo: ItemType, user_id: UUID) {

  const newItem: ItemCreated = await prisma.items.create({
    data: {
      ...itemInfo,
      user_created: user_id,
      item_id: crypto.randomUUID(),
    }
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
async function updateItem(itemInfo: ItemType, item_id: UUID) {

  const updatedItem: ItemCreated = await prisma.items.update({
    where: {
      item_id,
    },
    data: {
      ...itemInfo
    }
  });

  return updatedItem;

};

// FINDS A USER AND RETURNS IT'S INFORMATION
async function findItem(item_id: UUID) {

  const item: ItemCreated = prisma.items.findUnique({
    where: {
      item_id
    }
  });

  return item;
};

module.exports = {
  createItem,
  deleteItem,
  updateItem,
  findItem,
}