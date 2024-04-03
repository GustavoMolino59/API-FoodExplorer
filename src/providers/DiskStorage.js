const fs = require("fs")
const path = require("path")
const uploadConfig = require('../configs/upload')

class DiskStorage{

    async saveFile(file){ //file aqui representa o nome do arquivo
        fs.promises.rename(//Rename tira o arquivo da pasta tmp e passa para upload
            path.resolve(uploadConfig.TMP_FOLDER, file),// passamos para o path a pasta e o nome do arquivo e ele encontra o path da pasta de origem e da pasta de destino
            path.resolve(uploadConfig.UPLOAD_FOLDER, file)
        );

        return file;
    }

    async delete(file){
        const filePath = path.resolve(uploadConfig.UPLOAD_FOLDER, file) //path do arquivo
        try{
            await fs.promises.stat(filePath)  //pega o status do arquivo
        }catch{
            return
        }
        await fs.promises.unlink(filePath) //deleta o arquivo caso tenha retornando um status
    }
}


module.exports = DiskStorage;
