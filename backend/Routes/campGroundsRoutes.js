const Router = require('express').Router();
const campGroundController = require('../controllers/campGroundController');
const verifyToekn = require('../utils/verifyToken');

Router.post('/create', verifyToekn, campGroundController.createGrounds);

module.exports = Router;