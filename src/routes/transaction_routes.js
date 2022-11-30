const transRoutes = require('express').Router();
const routes = require('../api_constant');
const transCrt = require('../controllers/transaction_controller');

transRoutes.get(routes.LIST_TRANSACTION, transCrt.find);
transRoutes.post(routes.LIST_TRANSACTION, transCrt.create);
module.exports = transRoutes;
