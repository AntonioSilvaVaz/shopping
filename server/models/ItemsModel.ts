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
async function updateItem(itemInfo: ItemType | {product_pictures: string}, item_id: UUID): Promise<ItemCreated> {

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

async function updateImage(item_id: UUID, fileName: string): Promise<ItemCreated> {

  const picturesJSON = (await findItem(item_id)).product_pictures;
  const product_pictures: string[] = JSON.parse(picturesJSON);
  product_pictures.push(fileName);
  const itemInfo: string = JSON.stringify(product_pictures);

  const updatedItem = await updateItem({ product_pictures: itemInfo }, item_id);
  return updatedItem;
};

async function deleteImage(item_id: UUID, fileName: string): Promise<ItemCreated> {

  const picturesJSON = (await findItem(item_id)).product_pictures;
  const product_pictures: string[] = JSON.parse(picturesJSON);
  const filteredArray = product_pictures.filter((item) => item !== fileName);
  const itemInfo: string = JSON.stringify(filteredArray);

  const updatedItem = await updateItem({ product_pictures: itemInfo }, item_id);
  return updatedItem;
};

module.exports = {
  createItem,
  deleteItem,
  updateItem,
  findItem,
  deleteAllFromUser,
  updateImage,
  deleteImage
}