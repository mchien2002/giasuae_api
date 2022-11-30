const postRoutes = require('express').Router();
const routes = require('../api_constant');
const postCtr = require('../controllers/post_controller');

postRoutes.get(routes.LIST_POST, postCtr.find);
postRoutes.get(routes.POST_FILTER, postCtr.filter);
postRoutes.post(routes.LIST_POST, postCtr.create);
postRoutes.post(routes.POST_UPDATE, postCtr.updateByID);
postRoutes.post(routes.POST_REMOVE, postCtr.deleteByID);

module.exports = postRoutes;