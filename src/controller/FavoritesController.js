const { response } = require("express");
const knex = require("../database/knex");
const AppError = require("../utils/AppError");


class FavoriteController{

    async create(request, response){
        const{meal_id} = request.body;
        const user_id = request.user.id;

        
        await knex('favorites').insert({user_id, meal_id})

        return response.json()
    }

    async index(request, response){

        const user_id = request.user.id;

        const favorites = await knex('favorites').where({user_id})
        const meals = await knex('meals')
        const favsMeals = favorites.map(favorite => {
            const mealInclude = meals.filter(meal => meal.id == favorite.meal_id)
            const meal = mealInclude[0]
            return{
                ...favorite,
                meal
            }
        })


        return response.json(favsMeals)
    }
    async show(request, response){
        const {mealId} = request.params;
        const user_id = request.user.id;

        const favorite = await knex('favorites').where({meal_id: mealId}).andWhere({user_id})

        if(favorite.length > 0){
            return response.json(favorite)
        }
        else{
            return response.json({"id":"-1"})
        }
    }   
    async delete(request, response){
        const{mealId} = request.params;
        const user_id = request.user.id;

        await knex('favorites').delete().where({meal_id:mealId}).andWhere({user_id:user_id});

        
        return response.json();
    }
}


module.exports = FavoriteController;