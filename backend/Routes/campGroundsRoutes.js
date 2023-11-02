const Router = require('express').Router();
const campGroundController = require('../controllers/campGroundController');
const verifyToekn = require('../utils/verifyToken');

Router.get('/grounds/:id', campGroundController.getGround);

Router.post('/create', verifyToekn, campGroundController.createGrounds);

Router.delete('/delete/:id', verifyToekn, campGroundController.deleteGround);

Router.post('/update/:id', verifyToekn, campGroundController.updateCamp);

Router.get('/grounds', campGroundController.getGrounds);

Router.get('/groundInfo', campGroundController.getGroundInfo);

module.exports = Router;