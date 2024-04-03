const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class OrderDetailsController {

    //Soma de todas os itens abertos até agora no pedido atual
    async index(request, response){
        const user_id = request.user.id;
        
        const [totalItems] = await knex('orders')
        .join('orders_details', 'orders.id', '=', 'orders_details.order_id')
        .where({'orders.user_id': user_id})
        .andWhere({"status":"open"})
        .sum('orders_details.quantity as total_items');
        return response.json(totalItems);
    }

    async delete(request, response){
        const {id} = request.params;
        const detail = await knex('orders_details').where({id}).first()
        const order = await knex('orders').where({id:detail.order_id}).first()
        const newValue = order.total_amount - detail.subtotal_amount;

        await knex('orders').update({total_amount: newValue}).where({id: order.id})
        await knex('orders_details').delete().where({id})
                
        return response.json()
    }
}

module.exports = OrderDetailsController