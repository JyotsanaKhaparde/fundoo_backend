let jwt = require('jsonwebtoken');

exports.tokenValidate = (req,res,next) => {
    var tokenresult = {};
    var isTokenEmpty = req.headers['access-token'];
    }

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    if (token) {
        jwt.verify(reg.token, 'secretkey', (err, decoded) => {
            if (err) {
                return res.json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

module.exports = {
    checkToken: checkToken
}


// //verify token
// function verifyToken(req, res, next) {
//     //get auth hrader value
//     const bearerHeader = req.headers[''];
// }