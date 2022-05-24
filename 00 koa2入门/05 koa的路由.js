const koa=require("koa")
const Router=require("koa-router")
const app=new koa()
const router=new Router()
const cors = require('koa2-cors');
// 允许跨域,koa的跨域问题有专门的库，与express的跨域问题所使用的插件不一样
app.use(cors())

router.get("/",(ctx)=>{
    ctx.body="这是主页"
})
router.post("/user",(ctx)=>{
    ctx.body="这是用户页"
})
//不管是什么请求都行
router.all("/test",(ctx)=>{
    ctx.body="test"
})
app.use(router.routes())
app.use(router.allowedMethods())//允许所有的访问类型
//这个的作用，能够智能的报错，比如使用/请求访问post类型，报405，访问没有听过的类型比如link，报501
app.listen(3000)