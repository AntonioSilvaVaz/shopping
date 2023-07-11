import { UUID } from "crypto";
import { Context, Next } from "koa";
import { CartType } from "../types/CartTypes";
const { getUserSessionToken } = require('./UserController');
const { getCartFromUser, addToUserCart, removeFromUserCart } = require('../models/CartModel');

async function getCart(ctx: Context, next: Next) {

  try {

    const user_id: UUID = getUserSessionToken(ctx);
    const cart: CartType = await getCartFromUser(user_id);

    ctx.status = 200;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...cart, list: JSON.parse(cart.list) });

  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }


};

async function addToCart(ctx: Context, next: Next) {

  try {

    const { item_id } = ctx.request.body as { item_id: UUID };
    const user_id: UUID = getUserSessionToken(ctx);
    const cartUpdated: CartType = await addToUserCart(item_id, user_id);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...cartUpdated, list: JSON.parse(cartUpdated.list) });
  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }
}

async function removeCart(ctx: Context, next: Next) {
  try {

    const { item_id } = ctx.request.body as { item_id: UUID };
    const user_id: UUID = getUserSessionToken(ctx);
    const cartUpdated: CartType = await removeFromUserCart(item_id, user_id);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...cartUpdated, list: JSON.parse(cartUpdated.list) });
  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

}


module.exports = {
  getCart,
  addToCart,
  removeCart
}