const knex = require('../database/knex')
const AppError = require("../utils/AppError")

class UsersValidatedController {

    async index(request, response) {
        
        if(request.user){
            const { user } = request;
            console.log('user na validated')
            console.log(user)
            const checkUserExists = await knex("users").where({ id: user.id });
            console.log(checkUserExists)
            if(checkUserExists.length === 0) {
                throw new AppError("Unauthorized", 401);
            }
            return response.status(200).json();
        }
        throw new AppError("Unauthorized", 401)
    }
}

module.exports = UsersValidatedController