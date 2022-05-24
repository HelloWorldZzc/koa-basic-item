//koa是express原班人马打造的，现在使用的koa是2版本
//能够使用async与await解决回调地狱的问题
const koa=require("koa")
const app=new koa()
app.use((ctx)=>{
    ctx.response.body="hello koa2"
})
app.listen(3000,()=>{
    console.log("服务器3000启动ing")
})
