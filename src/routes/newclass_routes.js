const newClassRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const newClassCtrl = require('../controllers/newclass_controller');

newClassRoutes.get(routes.LIST_NEWCLASS, newClassCtrl.find);
newClassRoutes.get(routes.NEW_CLASS_FILTER, newClassCtrl.filter);
newClassRoutes.post(routes.LIST_NEWCLASS, verifyTokenCtrl.verifyToken, newClassCtrl.create);
newClassRoutes.post(routes.NEWCLASS_REMOVE, verifyTokenCtrl.verifyToken, newClassCtrl.deleteByID);
newClassRoutes.post(routes.NEWCLASS_UPDATE, verifyTokenCtrl.verifyToken, newClassCtrl.updateByID);

module.exports = newClassRoutes;