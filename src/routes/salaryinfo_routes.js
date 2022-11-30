const salRoutes = require('express').Router();
const routes = require('../api_constant');
const postCtr = require('../controllers/post_controller');

salRoutes.get(routes.LIST_SALARYINFO, postCtr.find);
salRoutes.get(routes.SALARY_FILTER, postCtr.filter);
salRoutes.post(routes.LIST_SALARYINFO, postCtr.create);
salRoutes.post(routes.SALARYINFO_UPDATE, postCtr.updateByID);
salRoutes.post(routes.SALARYINFO_REMOVE, postCtr.deleteByID);

module.exports = salRoutes;