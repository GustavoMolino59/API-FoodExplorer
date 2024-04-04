const AppError = require('../utils/AppError')

const { verify } = require('jsonwebtoken')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next){
    const authHeader = request.headers; // pegando o header da request que diz respeito a autorização
    

    
    if(!authHeader.cookie){
        throw new AppError('token jwt não apresentado', 401)
    }
    
    const [, token] = authHeader.cookie.split('token=')
    
    try{
        
        const{role, sub: user_id } = verify(token, authConfig.jwt.secret)
        
        request.user = {
            id:Number(user_id),
            role
        }
        console.log(request.user)
        return next();
    }catch{
        
        new AppError('JT token inválido')
    }
}

module.exports = ensureAuthenticated;