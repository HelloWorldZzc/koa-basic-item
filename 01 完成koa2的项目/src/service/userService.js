const User=require("../model/user.mode")
class UserService{
    //增加新的用户，真正执行添加用户的操作
    async createUser(user_name,password){
        //像数据库中发送请求 添加操作
        const res=await User.create({
            user_name:user_name,
            password:password
        })
        return res.dataValues
    }

    // 获得用户的信息
    async getUerInfo({ id, user_name, password, is_admin }) {
        const whereOpt = {}
        //id，username，password，is_admin其中有一个填了即可
        id && Object.assign(whereOpt, { id })
        user_name && Object.assign(whereOpt, { user_name })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })
        //从数据库中读取一条信息
        const res = await User.findOne({
            attributes: ['id', 'user_name', 'password', 'is_admin'],
            where: whereOpt,
        })
        console.log(res)
        return res ? res.dataValues : null
    }

    // 更新用户
    async updateById({ id, user_name, password, is_admin }) {
        const whereOpt = { id }
        const newUser = {}

        user_name && Object.assign(newUser, { user_name })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })

        const res = await User.update(newUser, { where: whereOpt })
        //返回最后所处理的条数
        return res[0] > 0 ? true : false
    }
}
module.exports=new UserService()