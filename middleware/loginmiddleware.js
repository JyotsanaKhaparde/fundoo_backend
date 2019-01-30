
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
