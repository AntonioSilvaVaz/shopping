export { };
const Koa = require('koa');
const cors = require('koa-cors');
const dotenv = require('dotenv').config();
const { koaBody } = require('koa-body');


const router = require('./router');
const app = new Koa();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_END_PORT}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(koaBody({
  multipart: true,
  urlencoded: true,
  json: true,
}));
app.use(router.routes());
app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));