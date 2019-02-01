let jwt = require('jsonwebtoken');
//const express = require('express');
let checkToken1 = (req, res, next) => {
    console.log('41--req body in middleware--', req.body);
    console.log('42--req headers in middleware--', req.headers['token']);
    // Express headers are auto converted to lowercase
    let getToken = req.headers.token || req.query.token || req.headers['x-access-token'];
    if (getToken) {
        jwt.verify(getToken, 'secretkey', (err, decoded) => {
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                console.log("re.decoded",decoded);
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'Auth token is not supplied',
        });
    }
};
// let checkTokenForLogin = (req,res,next) => {

// }
module.exports = {
    checkToken1,
    // checkTokenForLogin
}


