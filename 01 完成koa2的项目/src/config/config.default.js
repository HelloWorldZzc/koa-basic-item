//配置文件夹 默认的配置文件
const path=require("path")
const dotenv=require("dotenv")
dotenv.config({path:path.resolve(__dirname,'../../.env'),debug: true})
module.exports=process.env