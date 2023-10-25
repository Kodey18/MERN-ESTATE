const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const generateToekn = require('../utils/generateJwt');

/*
@Desc : Sign up(register) user 
@route : POST /signup
@access : public
*/

const signedUp = asyncHandler( async(req, res, next) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        // return res.status(400).json({
        //     message : `All credntials are required.`,
        // });
        const error = new Error(`All credntials are required.`);
        error.statusCode = 400;
        throw error;
    }

    const exist = await User.findOne({email});

    if(exist){
        // return res.status(400).json({
        //     message : `Email already exist.`,
        // });
        const error = new Error(`Email already exist.`);
        error.statusCode = 400;
        throw error;
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
            });
        }
    }catch(err){
        throw new Error(`error creating a user, ${err}`);
    }
});

/*
@Desc : Authenticate a user
@route : POST /signin
@access : public
*/

const signedIn = asyncHandler( async(req, res) => {
    const {email, password} = req.body;

    if(!email || !password){
        const error = new Error(`please enter email and password to sign in.`);
        error.statusCode = 400;
        throw error;
    }

    const validUser = await User.findOne({email}).exec();

    if(validUser){
        const validPass = bcrypt.compareSync(password, validUser.password);
        if(!validPass){
            const error = new Error(`Invalid Email or password.`);
            error.statusCode = 400;
            throw error;
        }

        generateToekn(res, validUser._id);
        const { password : pass, ...rest } = validUser._doc;
        return res.status(200).json({
            "message" : `User Authenticated sucessfully`,
            "user" : rest,
        });
    }else{
        const error = new Error(`Email is not registered`);
        error.statusCode = 400;
        throw error;
    }
});

/*
@Desc : Authenticate a user using google
@route : POST /google
@access : public
*/
const authenticateGoogle = asyncHandler( async(req, res) => {
    try{
        const user = await User.findOne({email : req.body.email});
        if(user){
            generateToekn(res, user._id);
            const { password : pass, ...rest } = user._doc;
            return res.status(200).json({
            "user" : rest,
            });

        }else{
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hashSync(generatedPassword, 10);
            const newUser = new User({
                username : req.body.username.split(" ").join("").toLowerCase() + Math.random().toString(36).slice(-4),
                email : req.body.email,
                password : hashedPassword,
                avatar: req.body.photo,
            });
            await newUser.save();
            generateToekn(res, newUser._id);
            const { password : pass, ...rest } = newUser._doc;
            return res.status(200).json({
            "user" : rest,
            });
        }
    }catch(err){
        const error = new Error(`Error in google auth.`);
        error.statusCode = 400;
        throw error;
    }
})

/*
Desc : Sign Out User Account
Route : GET /api/auth/signout
access : Private
*/
const signOut = asyncHandler( async(req, res) => {
    try{
        res.clearCookie("jwt");
        return res.status(200).json({
            message: "Logged out!"
        });
    } catch(err){
        const error = new Error("error while logging out", err);
        error.statusCode = 401;
        throw error;
    }
})



module.exports = {
    signedUp,
    signedIn,
    authenticateGoogle,
    signOut,
}