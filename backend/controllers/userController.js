const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const Ground = require('../models/groundModel');

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
});

/*
Desc : Delete User Account
Route : DELETE /api/user/delete
access : Private
*/
const deleteUser = asyncHandler( async(req, res) => {
    if (req.user.objId !== req.params.id) {
        const error = new Error("You can only delete your own account!");
        error.statusCode = 401;
        throw error;
    }

    try{
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie("jwt");
        return res.status(200).json({
            message : 'Account deleted successfully!',
        });
    }catch(err){
        const error = new Error("error while deleting", err);
        error.statusCode = 401;
        throw error;
    }
});

/*
Desc : Get all user grounds
Route : GET /api/user/userGround
access : Private
*/
const getUserGorunds = asyncHandler( async(req, res) => {
    if(req.user.objId !== req.params.id){
        const error = new Error("You can only Veiw your own Grounds.");
        error.statusCode = 401;
        throw error;
    } else {
        try{
            const grounds = await Ground.find({userRef : req.params.id});
            return res.status(200).json(grounds);
        }catch(err){
            const error = new Error("error while getting ground", err);
            error.statusCode = 401;
            throw error;
        }
    }
})



module.exports = {
    updateUser,
    deleteUser,
    getUserGorunds,
}