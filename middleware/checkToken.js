let jwt = require('jsonwebtoken');
//const express = require('express');


let checkToken = (req, res, next) => {
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
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.send({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

// let checkTokenForLogin = (req,res,next) => {

// }
module.exports = {
    checkToken,
    // checkTokenForLogin
}


