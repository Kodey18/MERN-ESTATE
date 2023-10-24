const Router = require('express').Router();
const authController = require('../controllers/authController');

Router.post('/signup', authController.signedUp);

Router.post('/signin', authController.signedIn);

Router.post('/')

module.exports = Router;