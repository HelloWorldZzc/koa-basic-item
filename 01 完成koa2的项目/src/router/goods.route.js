const Router = require('koa-router')
const { auth,hadAdminPermission} = require('../middleware/auth.middleware')
const {validator}=require("../middleware/goods.middleware")
const {
    upload,
    create,
    update,
    remove,
    restore,
    findAll
}=require("../controller/goods.controller")
//给所有的路由都加上前缀/users
const router = new Router({ prefix: '/goods' })
//图片上传的接口
router.post('/upload',auth,hadAdminPermission,upload)
//发布商品的接口
router.post("/",auth,hadAdminPermission,validator,create)
//更新商品的接口
router.put('/:id', auth, hadAdminPermission, validator, update)
// 硬删除接口 了解，一般我们的删除都是让用户看不见，并不会真正的将数据库的数据删除
//router.delete('/:id', auth, hadAdminPermission, remove)

//软接口删除，暂时将其隐藏，数据库模型中自带的
router.post('/:id/off', auth, hadAdminPermission, remove)
router.post('/:id/on', auth, hadAdminPermission, restore)

//获取所有的商品数据（没有被下架的）
router.get('/', findAll)

module.exports = router

