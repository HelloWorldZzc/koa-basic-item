//koa能使用中间插件处理 koa-json-error，借助此来辅助完成
//本案例更多的是指原生的错误处理
const koa=require("koa")
const app=new koa()
const Router=require("koa-router")
const router=new Router()
//404:请求资源没有找到或者没有ctx.body的时候，koa自动返回404错误
//手动抛出错误 ctx.throw手动抛出
//500：运行的时候出错了

router.get("/",ctx=>{
    console.log("准备报错")
    //错误码 描述
    ctx.throw(502,"错误")
})

//koa继承于emitter类，因此可以通过emit提交一个错误，通过on进行统一错误处理
app.on("error",(err,ctx)=>{
    console.warn(err)
    ctx.body={
        message:err.err,
        status:err.status
    }
})
router.post("/",ctx=>{
    console.log("准备报错")
   ctx.app.emit("error",{err:"不知道什么错误",status: 10086},ctx)

})

app.use(router.routes())
app.listen(3000)