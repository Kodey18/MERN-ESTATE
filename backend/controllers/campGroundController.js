const asyncHnadler = require('express-async-handler');
const Ground = require('../models/groundModel');

/*
Desc: Routes to create a camping ground.
Route: POST /api/ground/create
Access: Private (Token)
*/
const createGrounds = asyncHnadler( async(req, res) => {
});

module.exports = {
    createGrounds,
};