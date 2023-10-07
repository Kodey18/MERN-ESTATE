require('dotenv').config();

const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const catchError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || `Internal Server error.`;

    if(err.name === 'CastError' && err.kind === 'ObjectId'){
        statusCode = 404;
        message = `Resource not found.`;
    }

    return res.status(statusCode).json({
        success : false,
        statusCode,
        stack: process.env.NODE_ENV === "production" ? message : err.stack,
    });
}

module.exports = {
    catchError,
    notFound,
};