const {Router} = require("express")
const MealsController = require('../controller/MealsController')
const MealsAvatarController = require('../controller/MealsAvatarController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated');
const verifyUserAuthorization = require('../middleware/verifyUserAuthorization')
const multer = require('multer')
const uploadConfig = require('../configs/upload')


const mealRoutes = Router()
const mealController = new MealsController()
const mealAvatarController = new MealsAvatarController()
const upload = multer(uploadConfig.MULTER)

//rotas

mealRoutes.post("/", ensureAuthenticated,verifyUserAuthorization('admin'),  mealController.create)
mealRoutes.put("/:id", ensureAuthenticated,verifyUserAuthorization('admin'), mealController.edit);
mealRoutes.patch("/avatar/:mealId", ensureAuthenticated,verifyUserAuthorization('admin'), upload.single("avatar"), mealAvatarController.update)
mealRoutes.delete('/:id', ensureAuthenticated, mealController.delete)

mealRoutes.get("/", ensureAuthenticated, mealController.index)
mealRoutes.get("/:id", ensureAuthenticated, mealController.show)
module.exports = mealRoutes