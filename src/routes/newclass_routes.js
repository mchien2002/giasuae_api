const newClassRoutes = require('express').Router();
const routes = require('../api_constant');
const newClassCtrl = require('../controllers/newclass_controller');

newClassRoutes.get(routes.LIST_NEWCLASS, newClassCtrl.find);
newClassRoutes.get(routes.NEW_CLASS_FILTER, newClassCtrl.filter);
newClassRoutes.post(routes.LIST_NEWCLASS, newClassCtrl.create);
newClassRoutes.post(routes.NEWCLASS_REMOVE, newClassCtrl.deleteByID);
newClassRoutes.post(routes.NEWCLASS_UPDATE, newClassCtrl.updateByID);

module.exports = newClassRoutes;