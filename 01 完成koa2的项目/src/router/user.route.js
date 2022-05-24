const Router = require('koa-router')
const {register,login,changePassword}=require("../controller/user.controller")
const { auth } = require('../middleware/auth.middleware')
const {
    userValidator,
    verifyUser,
    addPassword,
    verifyLogin,
} = require('../middleware/user.middleware')
//给所有的路由都加上前缀/users
const router = new Router({ prefix: '/users' })
//注册用户的路由
router.post("/register",userValidator,verifyUser,addPassword,register)
//用户登录的路由
router.post("/login",userValidator,verifyLogin,login)
//修改密码
router.patch('/',auth,addPassword,changePassword)
module.exports = router

