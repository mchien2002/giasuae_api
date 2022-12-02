const adminRoutes = require('express').Router();
const routes = require('../api_constant');
const accCtr = require('../controllers/acc_controller');

adminRoutes.post(routes.CHECK_LOGIN, accCtr.verifyLogin);

module.exports = adminRoutes;