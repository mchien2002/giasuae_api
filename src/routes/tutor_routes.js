const tutorRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const tutorCtrl = require('../controllers/tutor_controller');

tutorRoutes.get(routes.LIST_TUTOR, tutorCtrl.find);
tutorRoutes.get(routes.TUTOR_FILTER, tutorCtrl.filter);
tutorRoutes.post(routes.LIST_TUTOR, verifyTokenCtrl.verifyToken, tutorCtrl.create);
tutorRoutes.post(routes.TUTOR_REMOVE, verifyTokenCtrl.verifyToken, tutorCtrl.deleteByID);
tutorRoutes.post(routes.TUTOR_UPDATE, verifyTokenCtrl.verifyToken, tutorCtrl.updateByID);

module.exports = tutorRoutes;