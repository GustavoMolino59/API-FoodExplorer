const knex = require('../database/knex')
const {hash} = require('bcryptjs')
const AppError = require("../utils/AppError")
const validator = require("validator")

class UserController {
    
    async create(request, response){
        
        const {name, email, password} = request.body;
       
        //Verify if user exists
        const checkUserExists = await knex('users').where({email})
        
        if(checkUserExists.length > 0){
            throw new AppError("Este email já esta em uso")
        }
        //Verify email and password
        validarSeEmailExiste(email)
        passwordValidation(password)


        //Encrypt password
        const hashedPassowrd = await hash(password, 8)
        await knex("users").insert({
            name,
            email,
            password: hashedPassowrd
        })
        
        return response.status(201).json();
    }

    //Nao existe protótipo para atualizar dados do cliente, mas por funcao criada por padrao

}

function validarSeEmailExiste(email){
    if(email){
        const isEmail =  validator.isEmail(email)
        //Verificar email válido
        if(!isEmail){
            throw new AppError("Digite um email válido")
        }
    }
}

function passwordValidation(password){
    if(password){
        const hasSpecialChar = /[^a-zA-Z0-9 ]/.test(password);

        if(password.length < 8){
            throw new AppError("Senha muito curta")
        }
        if(!hasSpecialChar){
            throw new AppError ("Insera pelo menos um caracter especial")
        }
    }
}

module.exports = UserController;