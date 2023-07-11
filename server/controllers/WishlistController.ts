import { UUID } from "crypto";
import { Context, Next } from "koa";
import { WishlistType } from "../types/WishlistTypes";
const { getUserSessionToken } = require('./UserController');
const { getWishlistFromUser, addToUserWishlist, removeFromUserWishlist } = require('../models/WishlistModel');

async function getWishlist(ctx: Context, next: Next) {

  try {

    const user_id: UUID = getUserSessionToken(ctx);
    const wishlist: WishlistType = await getWishlistFromUser(user_id);

    ctx.status = 200;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...wishlist, list: JSON.parse(wishlist.list) });

  } catch (error) {
    console.log(error);

    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }


};

async function addToWishlist(ctx: Context, next: Next) {

  try {

    const { item_id } = ctx.request.body as { item_id: UUID };
    const user_id: UUID = getUserSessionToken(ctx);
    const listUpdated: WishlistType = await addToUserWishlist(item_id, user_id);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...listUpdated, list: JSON.parse(listUpdated.list) });
  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }
};

async function removeFromWishlist(ctx: Context, next: Next) {
  try {

    const { item_id } = ctx.request.body as { item_id: UUID };
    const user_id: UUID = getUserSessionToken(ctx);
    const listUpdated: WishlistType = await removeFromUserWishlist(item_id, user_id);

    ctx.status = 201;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify({ ...listUpdated, list: JSON.parse(listUpdated.list) });
  } catch (error) {
    ctx.status = 500;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Server failed');
  }

};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
}