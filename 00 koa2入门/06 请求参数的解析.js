const koa=require("koa")
const app=new koa()
const Router=require("koa-router")
const router=new Router()

//1、使用query处理参数
// get /?start=1&end=2
router.get("/",ctx=>{
    const {start,end}=ctx.query
    ctx.body={
        start,end
    }
})
//2、使用params
router.get("/:id",ctx=>{
    const id=ctx.params.id
    ctx.body={
        id
    }
})
app.use(router.routes())
app.listen(3000)

//3、处理body参数
//koa原生支持body参数解析，通常借助社区中的中间件实现，官方推荐的有
//koa-body(推荐，能上传文件)  |  koa-bodyparser
//使用 在app.use(xxx())
//ctx.request.body
