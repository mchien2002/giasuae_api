const postRoutes = require('express').Router();
const routes = require('../api_constant');
const postCtr = require('../controllers/post_controller');

postRoutes.get(routes.LIST_POST, postCtr.find);
postRoutes.get(routes.POST_BY_ID, postCtr.filter);
postRoutes.post(routes.LIST_NEWCLASS, postCtr.create);
postRoutes.post(routes.NEWCLASS_UPDATE, postCtr.updateByID);
postRoutes.post(routes.POST_REMOVE, postCtr.updateByID);

module.exports = postRoutes;