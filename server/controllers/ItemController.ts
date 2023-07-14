import { Context, Next } from "koa";
import { ItemCreated, ItemType } from "../types/ItemTypes";
import { UUID } from "crypto";
import { UserRegistered } from "../types/UserTypes";
const { getUserSessionToken } = require('./UserController');
const { createItem, findItem, updateItem, deleteItem } = require('../models/ItemsModel');
const { findUserById } = require('../models/UserModel');
const fs = require('fs');


async function createItemPicture(img: any[]) {

  const fileNames: string[] = [];

  for (let index = 0; index < img.length; index++) {
    const file = img[index];
    const fileName = Date.now() + file.originalFilename;
    fileNames.push(fileName);
    const destinationPath = `images/items/${fileName}`;
    fs.renameSync(file.filepath, destinationPath);
  }

  return fileNames;
};

async function deleteItemPicture(fileNames: string[]) {
  fileNames.forEach(fileName => {
    fs.unlinkSync(`images/items/${fileName}`);
  });
};

async function createNewItem(ctx: any, next: Next) {

  let fileNames: string[] | undefined;
  try {

    const userId = getUserSessionToken(ctx);
    const {
      product_name, product_description, product_price,
      product_region
    }: ItemType = ctx.request.body as ItemType;

    if (ctx.request.files.product_pictures) {
      fileNames = await createItemPicture(ctx.request.files.product_pictures);
    };

    const product_pictures = JSON.stringify(fileNames);
    const productInfo = { product_name, product_description, product_price, product_region, product_pictures };
    const itemCreated: ItemCreated = await createItem(productInfo, userId);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(itemCreated);

  } catch (error) {
    console.log(error);

    if (fileNames) {
      deleteItemPicture(fileNames);
    }
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }


};

async function getItem(ctx: Context, next: Next) {

  try {

    const { item_id } = ctx.request.body as { item_id: UUID };
    const item = await findItem(item_id);

    if (item) {
      ctx.status = 200;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify(item);
    } else {
      ctx.status = 404;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('Item not found');
    }

  } catch (error) {

    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

async function updateAnItem(ctx: Context, next: Next) {
  try {

    const updateItems: any = {};

    const {
      product_name, product_description, product_price,
      product_region, product_pictures, item_id
    }: ItemCreated = ctx.request.body as ItemCreated;

    const item = await findItem(item_id);
    if (item) {
      if (product_name) updateItems.product_name = product_name;
      if (product_description) updateItems.product_description = product_description;
      if (product_price) updateItems.product_price = product_price;
      if (product_region) updateItems.product_region = product_region;
      if (product_pictures) updateItems.product_pictures = product_pictures;

      const itemUpdated = await updateItem(updateItems, item_id)
      ctx.status = 202;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify(itemUpdated);

    } else {
      ctx.status = 404;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('Invalid item_id');
    }

  } catch (error) {

    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }
};

async function deleteAnItem(ctx: Context, next: Next) {
  try {

    const { item_id }: { item_id: UUID } = ctx.request.body as { item_id: UUID };
    const userId = getUserSessionToken(ctx);
    const item: UserRegistered = await findUserById(userId);
    const itemExists = await findItem(item_id);

    if (item.user_id !== userId) {
      ctx.status = 403;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('Unauthorized');
    } else if (!itemExists) {
      ctx.status = 404;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('Item not found');
    } else {
      await deleteItem(item_id);
      ctx.status = 201;
      ctx.type = 'application/json';
      ctx.body = JSON.stringify('Item deleted');
    }

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }
};

module.exports = {
  createNewItem,
  getItem,
  updateAnItem,
  deleteAnItem,

}