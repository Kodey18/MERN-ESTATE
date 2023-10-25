const verifyToekn = require('../utils/verifyToken');
const userController = require('../controllers/userController');

const Router = require('express').Router();

Router.get('/profile', (req, res)=>{
    res.status(200).json({
        message : `User profile here`,
    });
});

Router.post('/update/:id', verifyToekn, userController.updateUser);

Router.delete('/delete/:id', verifyToekn, userController.deleteUser);

module.exports = Router;