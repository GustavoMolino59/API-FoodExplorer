const knex = require('../database/knex')
const AppError = require("../utils/AppError")
const { compare } = require('bcryptjs')

//Importações para jsonwebtoken
const authConfig = require('../configs/auth')
const {sign} = require('jsonwebtoken')


class SessionController {

    async create(request, response){
        const{email, password} = request.body;
        

        //verificar se o usuario existe
        const user = await knex('users').where({email}).first()
        console.log(user)

        if(!user){
            throw new AppError('Email e/ou senha inválidos')
        }

        //Verificar se a password está correta
        const matchedPassword = await compare(password, user.password);
        if(!matchedPassword){
            throw new AppError("Email e/ou senha inválidos")
        }

        //gerando o token
        const{secret, expiresIn} = authConfig.jwt;
        console.log(secret, expiresIn)
        const token = sign({role: user.role}, secret, {
            subject: String(user.id),
            expiresIn
        })
        response.cookie("token", token, {
            httpOnly: true,
            sameSite: "none",
            secure: true,
            maxAge: 15 * 60 * 1000
          })
        
        
        delete user.password
        return response.status(201).json({user})
    }

    async logout(request, response) {
        response.clearCookie("token");
    
        return response.status(204).json();
      }
    
}

module.exports = SessionController;