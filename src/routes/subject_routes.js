const subjectRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const subjectCrt = require('../controllers/subject_controller');

subjectRoutes.get(routes.LIST_SUBJECT, subjectCrt.find);
subjectRoutes.get(routes.LIST_SUBJECT, subjectCrt.find);
subjectRoutes.post(routes.LIST_SUBJECT, verifyTokenCtrl.verifyToken, subjectCrt.create);
subjectRoutes.post(routes.SUBJECT_REMOVE, verifyTokenCtrl.verifyToken, subjectCrt.deleteByID);
subjectRoutes.post(routes.SUBJECT_UPDATE, verifyTokenCtrl.verifyToken, subjectCrt.updateByID);

module.exports = subjectRoutes;