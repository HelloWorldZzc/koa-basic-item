const koa=require("koa")
const app=new koa()
app.use((ctx)=>{
    if (ctx.request.url==="/1"){
        if (ctx.request.method==="POST"){
            ctx.body="/1 的post请求"
        }
        else {
            ctx.body="/1 的非post请求"
        }
    }else {
        if (ctx.request.method==="POST"){
            ctx.body="/其他 的post请求"
        }
        else {
            ctx.body="/ 其他的请他请求"
        }
    }
})
//对于简单的逻辑关系，确实能顾直接使用中间件完成
app.listen(3000)