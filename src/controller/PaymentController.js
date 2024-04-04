const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class PaymentController{

    async showPaymentDatails(request, response){
        const user_id = request.user.id;

        const meal = await knex("meals")
        const order = await knex('orders').where({user_id}).andWhere({"status":"open"})
        if(order.length == 0){
            throw new AppError('Nenhum item no carrinho')
        }
        const order_details = await knex('orders_details').where({order_id:order[0].id})

        const orderWithDetails = order.map(order => {
            const oderDetail = order_details.filter(detail => detail.order_id == order.id);
            return{
                ...order,
                details: oderDetail
            }
        })

        const paymentData = orderWithDetails[0].details.map(detail => {
            const mealInclude =  meal.filter(meal => meal.id == detail.meal_id);
            return{
                ...detail,
                meal: mealInclude
            }
        })
        

        return response.json({paymentData, order})
    }

    async executePayment(request, response){
        const{creditCard, expireDate, CVV} = request.body
        const user_id = request.user.id
   
        await new Promise(resolve => setTimeout(resolve, 5000)); // Espera de 5 segundos
        
        await knex('orders').update({status:'pending'}).where({user_id}).andWhere({status:'open'})
        
        return response.status(200).json()
    }   
}


module.exports = PaymentController