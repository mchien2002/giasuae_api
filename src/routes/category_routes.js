const categoryRoutes = require('express').Router();
const routes = require('../api_constant');
const categoryCtr = require('../controllers/category_controller');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');

categoryRoutes.get(routes.LIST_CATEGORY, categoryCtr.find);
categoryRoutes.post(routes.LIST_CATEGORY, verifyTokenCtrl.verifyToken, categoryCtr.create);
categoryRoutes.post(routes.CATEGORY_REMOVE, verifyTokenCtrl.verifyToken, categoryCtr.deleteByID);
categoryRoutes.post(routes.CATEGORY_UPDATE, verifyTokenCtrl.verifyToken, categoryCtr.updateByID);

module.exports = categoryRoutes;