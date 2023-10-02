const express = require('express');
const connectDb = require('./config/mongodb');
const { default: mongoose } = require('mongoose');

require('dotenv').config();

connectDb();

const app = express();


mongoose.connection.once('open', ()=>{
    console.log("Connected to MongoDB");
    const port = process.env.PORT;
    app.listen(port, () => {
        console.log(`Server is running at http://localhost:${port}`);
    });
});

mongoose.connection.on('error', (err) => {
    console.log(`${err} occured`);
});