const categoryRoutes = require('express').Router();
const routes = require('../api_constant');
const categoryCtr = require('../controllers/category_controller');

categoryRoutes.get(routes.LIST_CATEGORY, categoryCtr.find);
categoryRoutes.post(routes.LIST_CATEGORY, categoryCtr.create);
// categoryRoutes.post(routes.CATEGORY_REMOVE, categoryCtr.deleteByID);
categoryRoutes.post(routes.CATEGORY_UPDATE, categoryCtr.updateByID);

module.exports = categoryRoutes;