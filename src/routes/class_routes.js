const classRouter = require('express').Router();
const routes = require('../api_constant');
const classCtrl = require('../controllers/class_controller');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');

classRouter.get(routes.LIST_CLASS, classCtrl.find);
classRouter.post(routes.LIST_CLASS, verifyTokenCtrl.verifyToken, classCtrl.create);
classRouter.post(routes.CLASS_REMOVE, verifyTokenCtrl.verifyToken, classCtrl.deleteByID);
classRouter.post(routes.CLASS_UPDATE, verifyTokenCtrl.verifyToken, classCtrl.updateByID);

module.exports = classRouter;