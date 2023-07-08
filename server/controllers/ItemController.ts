import { Context, Next } from "koa";
import { ItemCreated, ItemType } from "../types/UserTypes";
const { getUserSessionToken } = require('./UserController');
const { createItem } = require('../models/ItemsModel');

async function createNewItem(ctx: Context, next: Next) {

  try {

    const userId = getUserSessionToken(ctx);
    const {
      product_name, product_description, product_price,
      product_region, product_pictures
    }: ItemType = ctx.request.body as ItemType;

    const productInfo = { product_name, product_description, product_price, product_region, product_pictures };
    const itemCreated: ItemCreated = await createItem(productInfo, userId);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify(itemCreated);

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }


};

async function getItem(ctx: Context, next: Next) {

  try {

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

module.exports = {
  createNewItem,
  getItem,

}