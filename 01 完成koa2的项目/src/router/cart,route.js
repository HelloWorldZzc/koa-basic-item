const Router = require('koa-router')
const { auth} = require('../middleware/auth.middleware')
const { validator } = require('../middleware/cart.middleware')
const {add,findAll,update,remove,selectAll,unselectAll}=require("../controller/cart.controller")

const router = new Router({ prefix: '/cart' })
//添加购物车的接口
router.post('/', auth, validator({ goods_id: 'number' }), add)
//获取购物车列表
router.get('/', auth, findAll)
//更新购物车信息
router.patch(
    '/:id',
    auth,
    validator({
        number: { type: 'number', required: false },
        selected: { type: 'bool', required: false },
    }),
    update
)
//删除购物车信息
router.delete('/', auth, validator({ ids: 'array' }), remove)

//购物车的全选
router.post('/selectAll', auth, selectAll)
//购物车的全不选
router.post('/unselectAll', auth, unselectAll)
module.exports = router

