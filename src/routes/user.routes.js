const {Router} = require("express")
const multer = require('multer')
const UserController = require('../controller/UserController')
const UserValidatedController = require("../controller/UserValidatedController")

const ensureAuthenticated = require('../middleware/ensureAuthenticated')
const usersRoutes = Router()
const userController = new UserController()
const userValidatedController = new UserValidatedController()

usersRoutes.post("/", userController.create)

usersRoutes.get('/validated', ensureAuthenticated, userValidatedController.index)

module.exports = usersRoutes;