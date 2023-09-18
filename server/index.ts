export {};
const Koa = require("koa");
const cors = require("koa-cors");
const dotenv = require("dotenv").config();
const { koaBody } = require("koa-body");
const serve = require("koa-static");
const mount = require("koa-mount");
const path = require("path");

const router = require("./router");
const app = new Koa();

const corsOptions = {
  origin: `http://localhost:${process.env.FRONT_END_PORT}`,
  credentials: true,
};

const itemPicturesDir = path.join(__dirname, "../images/item_pictures/");
const profilePicturesDir = path.join(__dirname, "../images/profile_pictures/");

app.use(mount("/images/item_pictures", serve(itemPicturesDir)));
app.use(mount("/images/profile_pictures", serve(profilePicturesDir)));

console.log(profilePicturesDir, " I AM HERE");

app.use(cors(corsOptions));
app.use(
  koaBody({
    multipart: true,
    urlencoded: true,
    json: true,
  })
);

app.use(router.routes());
app.listen(process.env.PORT, () =>
  console.log(`Server running at http://localhost:${process.env.PORT}`)
);
