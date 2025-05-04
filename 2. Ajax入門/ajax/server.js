const Koa = require("koa");
const Router = require("koa-router");
const nunjucks = require("nunjucks");
const views = require("koa-views");

const app = new Koa();
const router = new Router();

app.use(views(__dirname + '/views', {
  map: { html: 'nunjucks' }
}));

router.get("/", async ctx => {
  await ctx.render("index")
})

router.get("/data", async ctx => {
  ctx.body = "hello world"
})

app.use(router.routes());
 
app.listen("3000", () => {
  console.log("server is running")
});
