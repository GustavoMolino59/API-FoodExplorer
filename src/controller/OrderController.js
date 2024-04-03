
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class OrderController {

    async create(request, response){
        
        const{meal_id, quantity} = request.body;
        
        const user_id = request.user.id;
        
        //buscar a refeiçãos
        const meal = await knex('meals').where({id:meal_id}).first()
        
        //Criar uma nova ordem ou atualizar a existente
        const actual_order = await knex('orders').where({status:'open'}).andWhere({user_id})
        
        if(actual_order.length > 0){
            const newValue = actual_order[0].total_amount + (meal.price*quantity)
            await knex('orders').update({total_amount:newValue}).where({id:actual_order[0].id})
            await knex('orders_details').insert({
                order_id:actual_order[0].id,
                meal_id: meal.id,
                quantity,
                subtotal_amount: meal.price*quantity
            })
            return response.json()
        }
        
        else{
                const newValue = meal.price * quantity;
                console.log(newValue)
            const[order_id] = await knex('orders').insert({
                user_id,
                total_amount:newValue,
                status:'open'
            })  
            
            await knex('orders_details').insert({
                order_id:order_id,
                meal_id: meal.id,
                quantity,
                subtotal_amount: newValue
            })
            return response.json()
        }
        //Criar a order_details
        
    }



    // Mostra todas as ordens existentes - Usar no histórico
    async index(request, response){
        const user_id = request.user.id;
        const{role} = request.user;
        console.log(role)
        if(role == 'customer'){
            const order = await knex('orders').where({user_id}).innerJoin('orders_details', 'orders.id', 'orders_details.order_id')
            .select([
                "orders.id",
                "orders.user_id",
                "orders.total_amount",
                "orders.status",
                "orders.order_date"
            ]).orderBy('orders.order_date', 'desc').groupBy('orders.id');;
            const order_details = await knex('orders_details')
            
            const orderWithDetails = order.map(order => {
                const oderDetail = order_details.filter(detail => detail.order_id == order.id);
                return{
                    ...order,
                    details: oderDetail
                }
            })
            //buscar as refeições aqui e devolver todos os detalhes de pagamento
            return response.status(200).json(orderWithDetails);
        }
        else if(role == 'admin'){
            
            const order = await knex('orders')
                        .innerJoin('orders_details', 'orders.id', 'orders_details.order_id')
                        .select([
                            "orders.id",
                            "orders.user_id",
                            "orders.total_amount",
                            "orders.status",
                            "orders.order_date"
                        ]).orderBy('orders.order_date', 'desc').groupBy('orders.id');;
            console.log(order)
            const order_details = await knex('orders_details')
            
            const orderWithDetails = order.map(order => {
                const oderDetail = order_details.filter(detail => detail.order_id == order.id);
                
                
                return{
                    ...order,
                    details: oderDetail
                }
                
            })
            console.log(orderWithDetails)
            //buscar as refeições aqui e devolver todos os detalhes de pagamento
            return response.status(200).json(orderWithDetails);
        }

    }

    async changeStatus(request, response){
        const {status, order_id} = request.body;
        
        await knex('orders').update({status}).where({"id":order_id})
     
        return response.json()
    }
}


module.exports = OrderController