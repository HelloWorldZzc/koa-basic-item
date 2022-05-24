const path = require('path')
const {
    fileUploadError,
    publishGoodsError,
    AddGoodsIDError,
    invalidGoodsID
} = require('../constant/err.type')
const {
    createGoods,
    updateGoods,
    removeGoods,
    restoreGoods,
    findGoods
} = require('../service/goods.service')
class GoodsController{
    async upload(ctx, next) {
        //ctx.request.files是本身koa-body所支持的，读取文件的
        const { file } = ctx.request.files
            if (file) {
                ctx.body = {
                    code: 0,
                    message: '商品图片上传成功',
                    result: ""
                }
            } else {
                return ctx.app.emit('error', fileUploadError, ctx)
            }
        }
    async create(ctx,next){
        try {
            const { res } = await createGoods(ctx.request.body)
            ctx.body = {
                code: 0,
                message: '发布商品成功',
                result: res,
            }
        } catch (err) {
            console.error(err)
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }
    async update(ctx,next){
        try {
            const res = await updateGoods(ctx.params.id, ctx.request.body)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: '修改商品成功',
                    result: '',
                }
            } else {
                return ctx.app.emit('error', AddGoodsIDError, ctx)
            }
        } catch (err) {
            console.error(err)
        }
    }
    async remove(ctx,next) {
        const res = await removeGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '下架商品成功',
                result: '',
            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }
    async restore(ctx,next){
        const res = await restoreGoods(ctx.params.id)
        if (res) {
            ctx.body = {
                code: 0,
                message: '上架商品成功',
                result: '',
            }
        } else {
            return ctx.app.emit('error', invalidGoodsID, ctx)
        }
    }
    async findAll(ctx,next){
        // 1. 解析pageNum和pageSize
        const { pageNum = 1, pageSize = 10 } = ctx.request.query
        const res = await findGoods(pageNum, pageSize)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: '获取商品列表成功',
            result: res,
        }
    }
}
module.exports=new GoodsController()