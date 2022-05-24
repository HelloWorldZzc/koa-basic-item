const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
//https://www.sequelize.com.cn/core-concepts/getting-started
// 创建模型(Model user -> 表 users)
const User = seq.define('user', {
    // id 会被sequelize自动创建, 管理
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: '用户名, 唯一',
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: '密码',
    },
    is_admin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: '是否为管理员, 0: 不是管理员(默认); 1: 是管理员',
    },
//timestamps: false 关闭时间戳 -->默认会把时间戳加入到数据表中
},{timestamps: false})


// async function test(){
//     await User.sync().then()
// }
// test()

//更多的参考官方手册
// 强制同步数据库(创建数据表)
//小心使用...要是数表存在强制刷新数据表
// User.sync({ force: true })
module.exports = User