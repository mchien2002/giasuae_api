const postRoutes = require('express').Router();
const routes = require('../api_constant');
const verifyTokenCtrl = require('../controllers/middleware/verify_controller');
const postCtr = require('../controllers/post_controller');

postRoutes.get(routes.LIST_POST, postCtr.find);
postRoutes.get(routes.POST_FILTER, postCtr.filter);
postRoutes.post(routes.LIST_POST, verifyTokenCtrl.verifyToken, postCtr.create);
postRoutes.post(routes.POST_UPDATE, verifyTokenCtrl.verifyToken, postCtr.updateByID);
postRoutes.post(routes.POST_REMOVE, verifyTokenCtrl.verifyToken, postCtr.deleteByID);

module.exports = postRoutes;