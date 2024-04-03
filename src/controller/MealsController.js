
const knex = require("../database/knex");
const AppError = require("../utils/AppError");
class MealsController{
    
    async create(request, response){

        const {name, description,  categoria, price, tags} = request.body;
        const meal = await knex("meals").where({name})

        if(meal.length>0){
            throw new AppError("Esse prato já existe, edite ele ou remova e crie novamente")
        }
        
        
        //insere uma nova meal
        const[meal_id] = await knex("meals").insert({
            name,
            description,
            categoria,
            price
        })
        
        //insere a tag realacionada a devida meal
        const tagsInsert = tags.map(title => {
            return{
                meal_id,
                title
            }
        })

        await knex("tags").insert(tagsInsert);

        return response.status(201).json(meal_id);

    }
    async index(request, response){
        
        const {title} = request.query;
        if(title){
            const mealsSearch = await knex('meals').whereLike("name", `%${title}%`)
            const MelsTagsSearch = await knex("tags")
            .select(["meals.id", "meals.name", "meals.description", "meals.price"])
            .whereLike("tags.title", `%${title}%`)
            .innerJoin("meals", "meals.id", "tags.id")
            
            const mealsResult = mealsSearch.concat(MelsTagsSearch)

            return response.json(mealsResult)

        }
        else{
            const meals = await knex("meals")
            return response.json(meals)
        }
        
    }
    async show(request, response){
        const{id} = request.params
        const meal = await knex("meals").where({id}).first()
        const tags = await knex("tags").where({meal_id: id}).orderBy("title")
        return response.json({meal, tags})
    }
    
    async delete(request, response){
        const{id} = request.params
        await knex("meals").where({id}).delete()
        return response.json();
    }

    async edit(request, response){
        
        const{id} = request.params;
        const{name, description, categoria, price} = request.body;
        
        const meal = await knex('meals').where({id}).first();
        
        const newMeal = {
            "name": name,
            "description": description,
            "avatar":meal.avatar,
            "categoria": categoria,
            "price": price ,
        }
         await knex('meals').update(newMeal).where({id})
        return response.status(200).json()
    }
}   

module.exports = MealsController