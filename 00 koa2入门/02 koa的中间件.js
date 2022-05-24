//tip：koa2的中间件使用到了洋葱模型
//中间件加载的顺序符合洋葱模型的顺序
const koa=require("koa")
const app=new koa()
// app.use((ctx,next)=>{
//     console.log("中间件1 |")
//     next()
//     console.log("中间件1 ||")
// })
// app.use((ctx,next)=>{
//     console.log("中间件2 |")
//     next()
//     console.log("中间件2 ||")
// })
// app.use((ctx,next)=>{
//     console.log("中间件3 |")
//     next()
//     console.log("中间件3 ||")
//     ctx.response.body="返回点东西怕404"
// })

//app.use 会返回this，因此上面的描述方法也能通过这样的方式来表达
app
    .use((ctx, next) => {
        console.log('中间件1 |')
        next()
        console.log('中间件1 ||')
    })
    .use((ctx, next) => {
        console.log('中间件2 |')
        next()
        console.log('中间件2 ||')
    })
    .use((ctx,next) => {
        console.log('中间件3 |')
        ctx.body = '组装完成'
        next()
        console.log('中间件3 ||')
    })

app.listen(3000,()=>{
    console.log("3000端口启动ing")
})
