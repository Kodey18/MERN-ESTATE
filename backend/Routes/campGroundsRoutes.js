const Router = require('express').Router();
const campGroundController = require('../controllers/campGroundController');
const verifyToekn = require('../utils/verifyToken');

Router.post('/create', verifyToekn, campGroundController.createGrounds);

Router.delete('/delete/:id', verifyToekn, campGroundController.deleteGround);

Router.post('/update/:id', verifyToekn, campGroundController.updateGround);

module.exports = Router;