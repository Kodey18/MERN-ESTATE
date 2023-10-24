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
    avatar : {
        type: String,
        default : "https://static.vecteezy.com/system/resources/thumbnails/020/765/399/small/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg",
    }
},
{
    timestamps : true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;