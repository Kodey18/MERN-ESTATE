const jwt = require('jsonwebtoken');

require('dotenv').config();

const generateToekn = (res, objId) => {
    const token = jwt.sign({objId}, process.env.JWT_SEC, {
        expiresIn : '1d',
    });

    res.cookie('jwt', {
        httpOnly : true,
        // if you want to use https only cookies set this value as true
        secure: process.env.NODE_ENV === 'development' ? false : true,
        sameSite:'strict',
        maxAge : 1000*60*60*24,
    });
}

module.exports = generateToekn;