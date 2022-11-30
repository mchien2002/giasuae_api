const tutorRoutes = require('express').Router();
const routes = require('../api_constant');
const tutorCtrl = require('../controllers/tutor_controller');

tutorRoutes.get(routes.LIST_TUTOR, tutorCtrl.find);
tutorRoutes.get(routes.TUTOR_FILTER, tutorCtrl.filter);
tutorRoutes.post(routes.LIST_TUTOR, tutorCtrl.create);
tutorRoutes.post(routes.TUTOR_REMOVE, tutorCtrl.deleteByID);
tutorRoutes.post(routes.TUTOR_UPDATE, tutorCtrl.updateByID);

module.exports = tutorRoutes;