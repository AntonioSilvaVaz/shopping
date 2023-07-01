import { Context, Next } from "koa"

const getAllItems=async (ctx: Context, next: Next) => {
  ctx.status = 200;
  ctx.type = 'text/plain';
  ctx.body = 'Goodbye';
};

module.exports = {
  getAllItems,
}