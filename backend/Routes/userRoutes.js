const Router = require('express').Router();

Router.get('/profile', (req, res)=>{
    res.status(200).json({
        message : `User profile here`,
    });
});

module.exports = Router;