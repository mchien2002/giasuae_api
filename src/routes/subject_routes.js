const subjectRoutes = require('express').Router();
const routes = require('../api_constant');
const subjectCrt = require('../controllers/subject_controller');

subjectRoutes.get(routes.LIST_SUBJECT, subjectCrt.find);
subjectRoutes.post(routes.LIST_SUBJECT, subjectCrt.create);
// subjectRoutes.post(routes.CATEGORY_REMOVE, subjectCrt.deleteByID);
subjectRoutes.post(routes.SUBJECT_UPDATE, subjectCrt.updateByID);

module.exports = subjectRoutes;