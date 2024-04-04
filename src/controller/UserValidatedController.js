const knex = require('../database/knex')
const AppError = require("../utils/AppError")

class UsersValidatedController {
    async index(request, response) {
        
        const { user } = request;

        if(user){
            const checkUserExists = await knex("users").where({ id: user.id });

            if (checkUserExists.length === 0) {
                throw new AppError("Unauthorized", 401);
            }
            return response.status(200).json();
        }

        return response.status(200).json();
    }
}
  
  module.exports = UsersValidatedController;