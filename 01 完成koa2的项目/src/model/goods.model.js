const { DataTypes } = require('sequelize')
const seq = require('../db/seq')
const Goods = seq.define(
    'goods',
    {
        goods_name: {
            type: DataTypes.STRING,
            allowNull: false,
            comment: '商品名称',
        },
        goods_price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            comment: '商品价格',
        },
        goods_num: {
            type: DataTypes.INTEGER,
            allowNull: false,
            comment: '商品库存',
        }
    },
    {
        //隐藏字段
        paranoid: true,
    }
)
//小心使用...要是数表存在强制删除数据表
//Goods.sync({ force: true }).then()
module.exports = Goods