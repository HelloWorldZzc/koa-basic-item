const Router = require('koa-router')
const { auth} = require('../middleware/auth.middleware')
//validator格式校验的中间件
const { validator } = require('../middleware/cart.middleware')
const {
    create,
    findAll,
    update,
    remove,
    setDefault
    }=require("../controller/addr.controller")

const router = new Router({ prefix: '/addr' })
//添加收获地址的接口
router.post(
    '/',
    auth,
    validator({
        consignee: 'string',
        // phone: { type: 'string', format: /^1\d{10}$/ },
        phone: { type: 'string'},
        address: 'string',
    }),
    create
)
//获取所有的收货地址
router.get('/', auth, findAll)

//更新地址
router.put(
    '/:id',
    auth,
    validator({
        consignee: 'string',
        // phone: { type: 'string', format: /^1\d{10}$/ },
        phone: { type: 'string'},
        address: 'string',
    }),
    update
)
//删除地址
router.delete('/:id', auth, remove)

//设置默认
router.patch('/:id', auth, setDefault)

module.exports = router

