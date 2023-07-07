import { Next, Context } from "koa";

async function createNewUser(ctx: Context, next: Next) {

  console.log(ctx.request.body);


  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = JSON.stringify('HELLO');
};

module.exports = {
  createNewUser
}