const Koa = require('koa')
const parameter=require("koa-parameter")
const path = require('path')
const koa_body=require("koa-body")
const KoaStatic=require("koa-static")
const userRouter=require("../router/user.route")
const goodsRouter=require("../router/goods.route")
const cartRouter=require("../router/cart,route")
const addrRouter=require("../router/addr.route")
const orderRouter=require("../router/order.route")
const errHandle=require("./errHandler")
const app = new Koa()
// koa-body是能够支持文件上传的，但是要对其有一些配置 koaBody也是需要从koa-body中引入
app.use(
    koa_body({
        multipart: true,
        formidable: {
            // 在配制选项option里, 不推荐使用相对路径
            // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,
        },
        //在默认的情况下，koa-body只对post，put,patch请求有效
        //要让他支持对其他的请求也同样生效，需要配置parseMethods
        parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE'],
    })
)
// 动态是的其能动态的读取文件内容
app.use(KoaStatic(path.join(__dirname, '../upload')))
// 中间参数的管理，以免写过多的中间件检查传入的参数
app.use(parameter(app))
//统一的错误处理
app.on("error",errHandle)
//---接入user路由-----(路由接口)
app.use(userRouter.routes())
app.use(userRouter.allowedMethods())
//接入goods路由
app.use(goodsRouter.routes())
app.use(goodsRouter.allowedMethods())
//接口carts路由
app.use(cartRouter.routes())
app.use(cartRouter.allowedMethods())
//接口addr的路由
app.use(addrRouter.routes())
app.use(addrRouter.allowedMethods())
//接口的order的路由
app.use(orderRouter.routes())
app.use(orderRouter.allowedMethods())

module.exports=app