const {Router} = require("express")
const OrderController = require('../controller/OrderController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

orderRoutes = Router()
const orderController = new OrderController();



orderRoutes.post('/', ensureAuthenticated, orderController.create);
orderRoutes.get('/', ensureAuthenticated, orderController.index)
orderRoutes.patch('/', ensureAuthenticated, orderController.changeStatus)
module.exports = orderRoutes;
