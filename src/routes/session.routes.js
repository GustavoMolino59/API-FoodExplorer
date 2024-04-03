const {Router} = require('express');
const SessionController = require('../controller/SessionController');

const sessionRoutes = Router();
const sessionController = new SessionController();

sessionRoutes.post('/', sessionController.create)
sessionRoutes.delete("/logout", sessionController.logout);
module.exports = sessionRoutes;