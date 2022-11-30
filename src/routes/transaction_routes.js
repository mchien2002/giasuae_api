const transRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const transCrt = require('../controllers/transaction_controller');

transRoutes.get(routes.LIST_TRANSACTION, transCrt.find);
transRoutes.post(routes.LIST_TRANSACTION, verifyTokenCtrl.verifyToken, transCrt.create);
module.exports = transRoutes;
