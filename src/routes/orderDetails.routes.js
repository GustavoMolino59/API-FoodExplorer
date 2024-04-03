const {Router} = require("express")
const OrderDetailsController = require('../controller/OrderDetailsController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

orderDetailsRoutes = Router()
const orderDetailsController = new OrderDetailsController();


orderDetailsRoutes.get('/', ensureAuthenticated, orderDetailsController.index);

orderDetailsRoutes.delete('/:id', ensureAuthenticated, orderDetailsController.delete);

module.exports = orderDetailsRoutes