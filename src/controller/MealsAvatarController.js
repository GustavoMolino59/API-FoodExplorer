const knex = require("../database/knex")
const AppError = require('../utils/AppError')
const DiskStorage = require('../providers/DiskStorage')


class MealsAvatarController {

    async update(request, response){
        const user_id = request.user.id
        const {mealId}= request.params
        const avatarFilename = request.file.filename; //caminho do arquivo e não arquivo em si

        const diskStorage = new DiskStorage();

        const meal = await knex('meals').where({id: mealId}).first()
        
        if(!user_id){
            new AppError("Apenas usuário autenticados podem alterar a foto de perfil")
        }
        
        if(meal.avatar){ //verifica se já existe um avatar e caso exista realiza o delete da foto antiga
            await diskStorage.delete(meal.avatar) 
        } 
        const filename = await diskStorage.saveFile(avatarFilename); //Passa o avatarFilename para saveFile que transmite do TMP para o uploads e retorna o nome do arquivo
        meal.avatar = filename;

        await knex('meals').update(meal).where({id: mealId}) //chama o knex e da um update com o user que é um json com todos os dados inclusive o de avatar atualizado
        
        return response.status(201).json(meal)
    }
}

module.exports = MealsAvatarController;