import { Context, Next } from "koa";
import { UserType } from "../types/UserTypes";
import { ItemCreated, ItemType } from "../types/ItemTypes";
import { UUID } from "crypto";
const { getUserSessionToken } = require('../controllers/UserController');
const { findUserById } = require('../models/UserModel');
const { findItem } = require('../models/ItemsModel');
const validator = require('validator');
const fs = require('fs');

async function ValidateRegisterAndLogin(ctx: Context, next: Next) {

  const info: UserType = ctx.request.body as UserType;
  let isValidName = true;
  const isRegisterRoute = ctx.URL.pathname === '/create_user' ? true : false;

  const isValidEmail = validator.isEmail(info.email + '');
  const isValidPassword = !validator.isEmpty(info.password !== undefined ? info.password : '');

  if (isRegisterRoute) {
    isValidName = !validator.isEmpty(info.name !== undefined ? info.name : '');
  }

  if (!isValidEmail || !isValidPassword || !isValidName) {
    ctx.status = 400;
    ctx.type = 'applications/json';
    ctx.body = isRegisterRoute ?
      JSON.stringify({ isValidEmail, isValidPassword, isValidName }) :
      JSON.stringify({ isValidEmail, isValidPassword });

    return;
  } else {
    await next();
  }

};

async function ValidateUser(ctx: any, next: Next) {

  const user_id = getUserSessionToken(ctx);

  if (!user_id) {
    ctx.status = 403;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('No user_id passed');
    return;
  }

  const userExists = await findUserById(user_id);
  const item_id = ctx.params.item_id;

  ctx.request.body = {
    item_id,
    ...ctx.request.body,
    profile_picture: userExists?.profile_picture,
  }


  if (!userExists) {
    ctx.status = 404;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Invalid user_id');
    return;
  } else {
    await next();
  }

};

async function ValidateUpdate(ctx: Context, next: Next) {

  const info: UserType = ctx.request.body as UserType;

  const isValidEmail = validator.isEmail(info.email + '');
  const isValidPassword = !validator.isEmpty(info.password !== undefined ? info.password : '');
  const isValidName = !validator.isEmpty(info.name !== undefined ? info.name : '');

  if (
    (!isValidEmail && info.email)
    || (!isValidPassword && info.password)
    || (!isValidName && info.name)
  ) {
    ctx.status = 400;
    ctx.type = 'applications/json';
    ctx.body = JSON.stringify({ isValidEmail, isValidPassword, isValidName });
  } else {
    await next();
  }

};

async function ValidateCreateItem(ctx: any, next: Next) {
  const info: ItemType = ctx.request.body as ItemType;

  const isValidName = !validator.isEmpty(info.product_name ? info.product_name : '');
  const isValidDescription = !validator.isEmpty(info.product_description ? info.product_description : '');
  const isValidPrice = !validator.isEmpty(info.product_price ? info.product_price : '');
  const isValidRegion = !validator.isEmpty(info.product_region ? info.product_region : '');
  const isValidPictures = ctx.request.files.product_pictures;


  if (isValidName && isValidDescription && isValidPrice && isValidRegion && isValidPictures) {
    await next();
  } else {
    ctx.status = 400;
    ctx.type = 'applications/json';
    ctx.body = JSON.stringify({ isValidName, isValidDescription, isValidPrice, isValidRegion, isValidPictures });
  }

};

async function ValidateUpdateItem(ctx: Context, next: Next) {

  const info: ItemCreated = ctx.request.body as ItemCreated;

  const isValidName = !validator.isEmpty(info.product_name ? info.product_name : 'Hello');
  const isValidDescription = !validator.isEmpty(info.product_description ? info.product_description : 'Hello');
  const isValidPrice = !validator.isEmpty(info.product_price ? info.product_price : 'Hello');
  const isValidRegion = !validator.isEmpty(info.product_region ? info.product_region : 'Hello');
  const isValidPictures = !validator.isEmpty(info.product_pictures ? info.product_pictures : 'Hello');
  const isValidItemId = validator.isUUID(info.item_id ? info.item_id : 'Hello');

  if (
    isValidItemId && (
      isValidDescription && isValidPrice && isValidRegion && isValidPictures && isValidItemId
    )
  ) {
    await next();
  } else {
    ctx.status = 400;
    ctx.type = 'applications/json';
    ctx.body = JSON.stringify({
      isValidName, isValidDescription, isValidPrice,
      isValidRegion, isValidPictures, isValidItemId
    });
  }

};

async function ValidateItem(ctx: Context, next: Next) {

  const { item_id } = ctx.request.body as { item_id: UUID };

  const isValidItemId = validator.isUUID(item_id ? item_id : 'Hello');

  if (!isValidItemId) {
    ctx.status = 400;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Invalid item_id');
    return;
  }

  const itemExists = await findItem(item_id);
  if (!itemExists) {
    ctx.status = 404;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify("Item doesn't exist");
    return;
  } else {
    await next();
  }

};

async function ValidateImage(ctx: any, next: Next) {
  const { item_id, fileName } = ctx.request.body as { item_id: UUID, fileName: string };

  const isValidPictures = ctx.request.files?.product_pictures;
  const isValidItemId = validator.isUUID(item_id ? item_id : 'Hello');
  const isValidFileName = await validateFileName(fileName);

  const isRemoveRoute = ctx.URL.pathname === '/remove_image_item' ? true : false;

  if ((isValidPictures && isValidItemId) || (isValidItemId && isValidFileName && isRemoveRoute)) {
    await next();
  } else {
    ctx.status = 400;
    ctx.type = 'applications/json';
    ctx.body = JSON.stringify({ isValidPictures, isValidItemId, isValidFileName });
  }
};

async function validateFileName(fileName: string) {
  const files = fs.readdirSync('./images/items');
  return files.includes(fileName);
}


module.exports = {
  ValidateRegisterAndLogin,
  ValidateUser,
  ValidateUpdate,
  ValidateCreateItem,
  ValidateUpdateItem,
  ValidateItem,
  ValidateImage,
};