const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');

/*
Desc : update the user details
Route : POST /api/user/upload
access : Private
*/
const updateUser = asyncHandler( async(req, res) => {
    if(req.user.objId !== req.params.id){
        const error = new Error('You can only update your own account!');
        error.statusCode = 401;
        throw error;
    }

    try{
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password, 10);
        }

        console.log("req data : ",req.body.username);

        const updateUser = await User.findByIdAndUpdate(req.params.id, {
            $set:{
                username : req.body.username,
                email: req.body.email,
                password: req.body.password,
                avatar : req.body.avatar,
            }
        }, {
            new : true
        });
        console.log(updateUser);

        const {password, ...rest} = updateUser._doc;
        return res.status(200).json({
            "user" : rest
        });

    }catch(err){
        const error = new Error('error while uploading',err);
        error.statusCode = 401;
        throw error;
    }
})

module.exports = {
    updateUser,
}