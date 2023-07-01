export {};
const Koa = require('koa');
const router = require('./router');
const cors = require('koa-cors');
const dotenv = require('dotenv').config();


const app = new Koa();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_END_PORT}`,
  credentials: true,
};

app.use(cors(corsOptions));
app.use(router.routes());
app.listen(process.env.PORT, () => console.log(`Server running at http://localhost:${process.env.PORT}`));