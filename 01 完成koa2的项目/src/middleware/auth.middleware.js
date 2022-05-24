const jwt=require("jsonwebtoken")
const {JWT_SECRET}=require("../config/config.default")
const {invalidToken,tokenExpiredError,hasNotAdminPermission}=require("../constant/err.type")

//用户权限相关--看是否登录
const auth=async (ctx,next)=> {
    const { authorization = '' } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    try {
        const user = jwt.verify(token, JWT_SECRET)
        //在ctx上挂载一个属性
        ctx.state.user = user
    } catch (err) {
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }

    }
    await next()
}

//用户权限相关，有没有管理员权限
const hadAdminPermission=async (ctx,next)=>{
    const {is_admin}=ctx.state.user
    if (!is_admin){
        console.error("用户没有管理员权限",ctx.state.user)
        return ctx.app.emit("error",hasNotAdminPermission,ctx)
    }
    await next()
}
module.exports={
    auth,
    hadAdminPermission
}