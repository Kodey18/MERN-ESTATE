const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required:[true,'Username is required'],
        unique: true
    },
    email : {
        type:String,
        required:[true,"Email id is required"],
        unique: [true , "This Email Id already exists"],
    },
    password:{
        type:String,
        required : true
    },
},
{
    timestamps : true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;