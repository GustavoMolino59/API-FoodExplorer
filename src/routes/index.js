const {Router} = require("express")
const usersRoutes = require('./user.routes')
const sessionRoutes = require("./session.routes")
const mealRoutes = require("../routes/meal.routes")
const orderRoutes = require('../routes/orders.routes')
const tagsRoutes = require('./tags.routes')
const orderDetailsRoutes = require('./orderDetails.routes')
const paymentRoutes = require('./payment.routes')
const favoritesRoutes = require('./favorites.routes')
const routes = Router();


routes.use("/users", usersRoutes)
routes.use("/session", sessionRoutes)
routes.use("/meal", mealRoutes)
routes.use("/orders", orderRoutes)
routes.use("/tags", tagsRoutes)
routes.use("/details", orderDetailsRoutes)
routes.use('/payment', paymentRoutes)
routes.use('/favorites', favoritesRoutes)
module.exports = routes;