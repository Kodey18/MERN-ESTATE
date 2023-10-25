const jwt = require('jsonwebtoken');

const verifyToekn = (req, res, next) => {
    const token = req.cookies.jwt;

    if(!token){
        const error = new Error('Unauthorized User');
        error.statusCode = 401;
        throw error;
    }

    jwt.verify(token, process.env.JWT_SEC, (err, user)=> {
        if(err){
            const error = new Error("Forbidden");
            error.statusCode = 403;
            throw error;
        }

        req.user = user;
        next();
    });
}

module.exports = verifyToekn;