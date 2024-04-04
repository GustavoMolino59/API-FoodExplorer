const knex = require('../database/knex')
const AppError = require("../utils/AppError")

class UsersValidatedController {
    async index(request, response) {
        
        const { user } = request;

        if(user){
            const checkUserExists = await knex("users").where({ id: user.id });

            if (checkUserExists.length === 0) {
                console.log("não autorizado")
                console.log(user)
                console.log( checkUserExists)
                throw new AppError("Unauthorized", 401);
            }
            console.log(" utorizado", user, checkUserExists)
            return response.status(200).json();
        }

        return response.status(200).json();
    }
}
  
  module.exports = UsersValidatedController;