import { Context, Next } from "koa";
import { UserType } from "../types/UserTypes";
const { getUserSessionToken } = require('../controllers/UserController');
const { findUserById } = require('../models/UserModel');

const validator = require('validator');

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

async function ValidateUser(ctx: Context, next: Next) {

  const user_id = getUserSessionToken(ctx);

  if (!user_id) {
    ctx.status = 403;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('No user_id passed');
    return;
  }

  const userExists = await findUserById(user_id);

  if(!userExists){
    ctx.status = 404;
    ctx.type = 'application/json';
    ctx.body = JSON.stringify('Invalid user_id');
    return;
  } else{
    await next();
  }

};

async function ValidateUpdate(ctx: Context, next: Next) {

}


module.exports = {
  ValidateRegisterAndLogin,
  ValidateUser
}