const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');

/*
@Desc : Register user controller
@route : POST /register
@access : public
*/


/*
@Desc : Sign up(register) user controller
@route : POST /signup
@access : public
*/

const signedUp = asyncHandler( async(req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        return res.status(400).json({
            message : `All credntials are required.`,
        });
    }

    const exist = await User.findOne({email});

    if(exist){
        // return res.status(400).json({
        //     message : `Email already exist.`,
        // });
        throw new Error(`Email already exist.`);
    }

    try{

        const hashedPass = bcrypt.hashSync(password, 10);

        let newUser =  await User.create({
            username,
            email,
            password : hashedPass,
        });

        if(newUser){
            return res.status(200).json({
                message : `User created successfully.`,
                newUser,
            });
        }
    }catch(err){
        throw new Error(`error creating a user, ${err}`);
    }
});


module.exports = {
    signedUp,
}