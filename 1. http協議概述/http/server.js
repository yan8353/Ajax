const Koa = require("koa");
const Router = require("koa-router");
const parser = require("koa-parser");

const app =new Koa;
const router = new Router();
app.use(parser());

//數據
let dataList = ["香蕉","蘋果","橘子"];

//get查看
router.get("/fruits",ctx => {

    ctx.body = dataList;
})


//post添加
router.post("/fruits",ctx => {
    let fruit =ctx.request.body.fruit;
    dataList.push(fruit); //push方法可以在array結尾追加資料
    ctx.body = dataList;
})


//put修改
router.put("/fruits/:id",ctx => {    //路由傳參 /:id --> ctx.params.id
    let id = ctx.params.id;
    let fruit = ctx.request.body.fruit;
    dataList.splice(id,1,fruit); //splice(要刪除元素的索引，刪除幾個元素，將刪除的元素替換成xx)
    ctx.body = dataList;
})


//delete刪除
router.delete("/fruits",ctx => {
    let id = ctx.params.id;    
    dataList.splice(id,1); //splicce(要刪除元素的索引,刪除幾個元素,將刪除的元素替換成xx)
    ctx.body = dataList;
})




app.use(router.routes());

app.listen(3000, () => {
    console.log("server is running");
});