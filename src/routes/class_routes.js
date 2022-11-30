const classRouter = require('express').Router();
const routes = require('../api_constant');
const classCtrl = require('../controllers/class_controller');

classRouter.get(routes.LIST_CLASS, classCtrl.find);
classRouter.post(routes.LIST_CLASS, classCtrl.create);
classRouter.post(routes.CLASS_REMOVE, classCtrl.deleteByID);
classRouter.post(routes.CLASS_UPDATE, classCtrl.updateByID);

module.exports = classRouter;