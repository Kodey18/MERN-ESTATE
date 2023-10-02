const mongoose = require('mongoose');

require('dotenv').config();

const connectUri = process.env.MONGO_URI;

const connectDb = async() => {
    try{
        await mongoose.connect(connectUri, {
            useNewUrlParser: true,
            useUnifiedTopology:true,
        });
    }catch(err){
        console.log("Error connecting to db", err);
    }
};

module.exports = connectDb;