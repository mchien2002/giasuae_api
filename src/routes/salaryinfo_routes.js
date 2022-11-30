const salRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const postCtr = require('../controllers/post_controller');

salRoutes.get(routes.LIST_SALARYINFO, postCtr.find);
salRoutes.get(routes.SALARY_FILTER, postCtr.filter);
salRoutes.post(routes.LIST_SALARYINFO, verifyTokenCtrl.verifyToken, postCtr.create);
salRoutes.post(routes.SALARYINFO_UPDATE, verifyTokenCtrl.verifyToken, postCtr.updateByID);
salRoutes.post(routes.SALARYINFO_REMOVE, verifyTokenCtrl.verifyToken, postCtr.deleteByID);

module.exports = salRoutes;