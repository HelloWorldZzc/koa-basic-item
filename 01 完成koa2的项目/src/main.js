const {APP_PORT}=require("./config/config.default")
//模块化思想 main函数只是一个入口文件
const app=require("./app/index")
app.listen(APP_PORT, () => {
    console.log(`server is running on http://localhost:${APP_PORT}`)
})

