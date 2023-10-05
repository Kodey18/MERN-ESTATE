const Router = require('express').Router();
const authController = require('../controllers/authController');

Router.post('/signup', authController.signedUp);

module.exports = Router;