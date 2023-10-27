const verifyToekn = require('../utils/verifyToken');
const userController = require('../controllers/userController');

const Router = require('express').Router();

Router.post('/update/:id', verifyToekn, userController.updateUser);

Router.delete('/delete/:id', verifyToekn, userController.deleteUser);

Router.get(`/userGrounds/:id`, verifyToekn, userController)

module.exports = Router;