import { Context, Next } from "koa"
import prisma from "../models/connections";

const getAllItems = async (ctx: Context, next: Next) => {

  const newUser = await prisma.users.create({
    data: {
      name: 'Antonio',
      user_id: crypto.randomUUID(),
      email: 'antonioaugustosilvavaz@gmail.com',
      password: 'passwordHashed'
    }
  })

  ctx.status = 200;
  ctx.type = 'application/json';
  ctx.body = JSON.stringify(newUser);
};

module.exports = {
  getAllItems,
}