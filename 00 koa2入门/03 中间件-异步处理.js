const koa=require("koa")
const app=new koa()
//同步任务输出abc
// app.use( (ctx,next)=>{
//     ctx.message="a"
//     next()
//     ctx.response.body=ctx.message
// })
// app.use((ctx,next)=>{
//     ctx.message+="b"
//     next()
// })
// app.use((ctx,next)=>{
//     ctx.message+="c"
// })
//
// app.listen(3000,()=>{
//     console.log("3000启动！")
// })

//前面两个是同步，后面一个是异步的状态下输出
//使用await的前提是使用async
//这里的next也要使用await，等待异步函数的执行
app.use(async (ctx,next)=>{
    ctx.message="a"
    await next()
    ctx.body=ctx.message
})
app.use(async (ctx,next)=>{
    ctx.message+="b"
    await next()
})
//要是不使用async与await写法 会由于异步的原因不能展示
// app.use((ctx,next)=>{
//     Promise.resolve("c").then(data=>{
//         ctx.message=data
//     })
//     next()
// })
app.use(async (ctx,next)=>{
    const res=await Promise.resolve("c")
    ctx.message+=res
    next()
})
app.listen(3000,()=>{
    console.log("3000启动!")
})