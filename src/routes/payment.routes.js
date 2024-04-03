const {Router} = require("express")
const PaymentController = require('../controller/PaymentController')
const ensureAuthenticated = require('../middleware/ensureAuthenticated');

paymentRoutes = Router()
const paymentController = new PaymentController();


paymentRoutes.get('/', ensureAuthenticated, paymentController.showPaymentDatails)
paymentRoutes.patch('/', ensureAuthenticated, paymentController.executePayment)

module.exports = paymentRoutes
