const { Op } = require('sequelize')
const Cart = require('../model/cart.model')
const Goods = require('../model/goods.model')

class cartService{
    async createOrUpdate(user_id,goods_id){
        let res=await Cart.findOne({
            where:{
                //op.and表示两个都要表示
                [Op.and]:{
                    user_id,
                    goods_id
                }
            }
        })
        if (res){
            //存在一条记录，number+1
            await res.increment("number")
            return await  res.reload()
        }
        else {
            return await Cart.create({
                user_id,
                goods_id
            })
        }
    }
    async findCarts(pageNum, pageSize){
        const offset = (pageNum - 1) * pageSize
        const { count, rows } = await Cart.findAndCountAll({
            attributes: ['id', 'number', 'selected'],//只展示出这些内容
            offset: offset,
            limit: pageSize * 1,
            include: {
                //外键
                model: Goods,
                as: 'goods_info',//外键的名
                attributes: ['id', 'goods_name', 'goods_price'],//展示外键中的信息
            },
        })
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }
    async updateCarts(params){
        const { id, number, selected } = params
        const res = await Cart.findByPk(id)
        if (!res) return ''
        number !== undefined ? (res.number = number) : ''
        if (selected !== undefined) {
            res.selected = selected
        }
        return await res.save()
    }
    async removeCarts(ids){
        return await Cart.destroy({
            where: {
                id: {
                    [Op.in]: ids,
                },
            },
        })
    }
    async selectAllCarts(user_id){
        return await Cart.update(
            { selected: true },
            {
                where: {
                    user_id,
                },
            }
        )
    }
    async unselectAllCarts(user_id) {
        return await Cart.update(
            { selected: false },
            {
                where: {
                    user_id,
                },
            }
        )
    }
}
module.exports=new cartService()