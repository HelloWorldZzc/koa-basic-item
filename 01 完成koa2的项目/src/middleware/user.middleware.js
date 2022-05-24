const bcrypt =require("bcryptjs")
const { getUerInfo } = require('../service/userService')
const { userFormatError, userAlreadyExited ,userDoesNotExist,userLoginError,invalidPassword} = require('../constant/err.type')
const userValidator = async (ctx, next) => {
    const { user_name, password } = ctx.request.body
    // 合法性
    if (!user_name || !password) {
        console.error('用户名或密码为空', ctx.request.body)
        ctx.app.emit('error', userFormatError, ctx)
        return
    }
    await next()
}
const verifyUser = async (ctx, next) => {
    const { user_name } = ctx.request.body
    if (await getUerInfo({ user_name })) {
        ctx.app.emit('error', userAlreadyExited, ctx)
        return
    }
    await next()
}
const addPassword = async (ctx, next) => {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10)
    // hash保存的是 密文
    ctx.request.body.password = bcrypt.hashSync(password, salt)
    await next()
}
const verifyLogin = async (ctx, next) => {
    // 1. 判断用户是否存在(不存在:报错)
    const { user_name, password } = ctx.request.body
    try {
        const res = await getUerInfo({ user_name })
        if (!res) {
            console.error('用户名不存在', { user_name })
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        // 2. 密码是否匹配(不匹配: 报错)
        if (!bcrypt.compareSync(password, res.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (err) {
        console.error(err)
        return ctx.app.emit('error', userLoginError, ctx)
    }
    await next()
}
module.exports = {
    userValidator,
    verifyUser,
    addPassword,
    verifyLogin
}