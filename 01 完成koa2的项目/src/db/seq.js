//数据库操作函数 mysql2能支持异步操作,两个库必须同时都安装才有效
const { Sequelize } = require('sequelize')
//读取配置文件的相关信息
const {MYSQL_HOST,MYSQL_USER,MYSQL_PWD,MYSQL_DB} =require("../config/config.default")
const seq = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql',
})
//执行 返回的是一个promise对象
seq.authenticate()
    .then(() => {
    })
    .catch((err) => {
        console.log('数据库连接失败', err)
    })
//这只是创建了一个数据库连接的js，其他的操作需要到model中进行
module.exports=seq