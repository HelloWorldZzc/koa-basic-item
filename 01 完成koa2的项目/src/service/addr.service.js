const Address = require('../model/addr.model')
class addrService{
    async createAddr(addr) {
        return await Address.create(addr)
    }
    async findAllAddr(user_id) {
        return await Address.findAll({
            attributes: ['id', 'consignee', 'phone', 'address', 'is_default'],
            where: { user_id },
        })
    }
    async updateAddr(id, addr) {
        return await Address.update(addr, { where: { id } })
    }
    async removeAddr(id) {
        return await Address.destroy({ where: { id } })
    }
    async setDefaultAddr(user_id, id) {
        //把其他位默认的改为false，把指定不为默认的改为true
        await Address.update(
            { is_default: false },
            {
                where: {
                    user_id,
                },
            }
        )
        return await Address.update(
            { is_default: true },
            {
                where: {
                    id,
                },
            }
        )
    }
}
module.exports=new addrService()