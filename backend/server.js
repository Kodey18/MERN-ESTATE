const express = require('express');
const connectDb = require('./config/mongodb');
const errorHandler = require('./middlewares/errorHandler');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser');

require('dotenv').config();

connectDb();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());

app.use('/api/user', require('./Routes/userRoutes'));
app.use('/api/auth', require('./Routes/authRoutes'));
app.use('/api/ground', require('./Routes/campGroundsRoutes'));


app.use(errorHandler.notFound);
app.use(errorHandler.catchError);


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