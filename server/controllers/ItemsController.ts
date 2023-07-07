import { Context, Next } from "koa"

const getAllItems = async (ctx: Context, next: Next) => {
  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = JSON.stringify('GOT THIS ROUTE');
};

module.exports = {
  getAllItems,
}