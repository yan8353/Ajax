const Koa = require("koa");
const Router = require("koa-router"); // 修正這裡：正確引入 koa-router
const nunjucks = require("nunjucks");
const static = require("koa-static");
const views = require("koa-views");
const bodyParser = require("koa-bodyparser");

const router = new Router();          // 新增這裡：建立 router 實例
const app = new Koa();

app.use(bodyParser())
app.use(static(__dirname + "/public"));
app.use(views(__dirname + '/views', {
    map: { html: 'nunjucks' }
}));

// 首頁渲染 index.html
router.get("/", async ctx => {
    await ctx.render("index");
});

// 數據
let dataList = ["香蕉", "蘋果", "橘子"];

// GET：查看水果清單
router.get("/fruits", ctx => {
    ctx.body = dataList;
});

// POST：添加水果
router.post("/fruits", ctx => {
    let fruit = ctx.request.body.fruit;
    dataList.push(fruit);
    ctx.body = dataList;
});

// PUT：修改水果（依據 id）
router.put("/fruits/:id", ctx => {
    let id = ctx.params.id;
    let fruit = ctx.request.body.fruit;
    dataList.splice(id, 1, fruit); // 替換指定索引的項目
    ctx.body = dataList;
});

// DELETE：刪除水果（依據 id）
router.delete("/fruits/:id", ctx => {
    let id = ctx.params.id;
    dataList.splice(id, 1); // 移除指定索引的項目
    ctx.body = dataList;
});

// 使用路由中介函式
app.use(router.routes());

app.use(router.allowedMethods()); // 建議加上這個，讓 RESTful 更完整

// 啟動伺服器
app.listen(3000, () => {
    console.log("server is running");
});
