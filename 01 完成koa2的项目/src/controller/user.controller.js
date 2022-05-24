const jwt=require("jsonwebtoken")
const {createUser,getUerInfo,updateById} =require("../service/userService")
const { userRegisterError } = require('../constant/err.type')
const {JWT_SECRET}=require("../config/config.default")
class UserController{
    async register(ctx, next) {
        //获取数据
        const { user_name, password } = ctx.request.body
        // 2. 操作数据库
        try {
            const res = await createUser(user_name, password)
            // 3. 返回结果
            ctx.body = {
                code: 0,
                message: '用户注册成功',
                result: {
                    id: res.id,
                    user_name: res.user_name,
                },
            }
        } catch (err) {
            console.log(err)
            ctx.app.emit('error', userRegisterError, ctx)
        }
    }
    async login(ctx,next) {
        const {user_name} = ctx.request.body
        try {
            //es6的解构赋值，把获得到信息的password赋值给第一项password，其他的部分全部赋值给res
            const {password, ...res} = await getUerInfo({user_name})
            ctx.body = {
                code: 0,
                message: '用户登录成功',
                result: {
                    //给用户赋值token
                    token: jwt.sign(res, JWT_SECRET, {expiresIn: '1d'}),
                },
            }
        }
        catch (e){}
    }
    async changePassword(ctx, next) {
        // 1. 获取数据，根据token获得相关的id
        const id = ctx.state.user.id
        const {password} = ctx.request.body
        // 2. 操作数据库
        if (await updateById({ id, password })) {
            ctx.body = {
                code: 0,
                message: '修改密码成功',
                result: '',
            }
        } else {
            ctx.body = {
                code: '10007',
                message: '修改密码失败',
                result: '',
            }
        }
    }
}
module.exports=new UserController()

//  写成这样的方式不是更加好看吗，搞不懂为什么写的这么Java里气的
//  register=async function (ctx,next){
//     ctx.body="注册成功"
//  }
//  module.exports={
//      register
//  }