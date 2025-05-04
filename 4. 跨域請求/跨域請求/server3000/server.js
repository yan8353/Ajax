const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const jsonp = require("koa-jsonp");

const app = new Koa();
const router = new Router();

app.use(static(__dirname + "/public"));
app.use(jsonp());


router.get("/data", ctx => {
  // 設定伺服器的回應標頭，就可以進行跨網域請求。
  ctx.set('Access-Control-Allow-Origin', 'http://127.0.0.1:8080');
  ctx.body = "hello world";
});

app.use(router.routes());
app.listen(3000, () => {
  console.log("server is running");
});
