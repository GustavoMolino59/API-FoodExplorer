const knex = require('../database/knex')
const AppError = require("../utils/AppError")

class UsersValidatedController {

    async index(request, response) {
        
        
        return response.status(200).json();
    }
}

module.exports = UsersValidatedController