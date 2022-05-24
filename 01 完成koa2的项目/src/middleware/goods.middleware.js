const { goodsFormatError } = require('../constant/err.type')
//在users页面是通过手写body判断的，这里能通过koa-parameter帮助我们判断传入的类型
const validator=async (ctx,next)=>{
    try {
        ctx.verifyParams({
            goods_name: { type: 'string', required: true },
            goods_price: { type: 'number', required: true },
            goods_num: { type: 'number', required: true },
        })
    } catch (err) {
        console.error(err)
        goodsFormatError.result = err
        return ctx.app.emit('error', goodsFormatError, ctx)
    }
    await next()
}
module.exports={
    validator
}