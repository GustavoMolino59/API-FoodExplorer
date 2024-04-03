const {Router} = require("express")
const FavoriteController = require('../controller/FavoritesController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated');


const favoritesRoutes = Router()
const favoriteController = new FavoriteController()

//rotas
favoritesRoutes.post('/', ensureAuthenticated, favoriteController.create)
favoritesRoutes.get('/', ensureAuthenticated, favoriteController.index)
favoritesRoutes.get('/:mealId', ensureAuthenticated, favoriteController.show)
favoritesRoutes.delete('/:mealId', ensureAuthenticated, favoriteController.delete)


module.exports = favoritesRoutes