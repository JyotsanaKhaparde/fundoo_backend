let jwt = require('jsonwebtoken');
//authentication for login
exports.loginAuthentication = (req, res, next) => {
    try {
        //if request body is null
        if (req.body === null) {
            res.send({
                status: false,
                message: 'request body is empty'
            })
        } else {
            if (req.body.email === " ") {
                res.send({
                    status: false,
                    message: 'empty email'
                })
            }
            else
                if (!/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$/.test(req.body.email)) {
                    res.send({
                        status: false,
                        message: 'invalid email'
                    })
                }
                else
                    if (req.body.password.length < 8) {
                        res.send({
                            status: false,
                            message: 'Password must be of atleast 8 characters long'
                        })
                    }
                    else {
                        next();
                    }
        }
    } catch (error) {
        next(error);
    }
}

exports.checkToken = (req, res, next) => {
    console.log('43--req body in middleware--', req.body);
    console.log('44--req headers in middleware--', req.headers['token']);
    var token1 = req.headers['token'];
    console.log('46--in middleware--token to decode--', token1);
    // decode token
    if (token1) {
        // verifies secret and checks exp
        jwt.verify(token1, 'secretkey', (err, decoded) => {
            console.log('54--inside verify function');
            if (err) {
                return res.send({
                    success: false,
                    message: 'Token is not valid'
                });
            }
            else {
                console.log('61--inside verify function in else');
                req.decoded = decoded;
                console.log('63--email of user who click the link---', req.decoded);
                next();
            }
        });
    }
    else {
        // if there is no token return an error
        return res.send({
            success: false,
            message: 'No token provided.'
        });
    }
}