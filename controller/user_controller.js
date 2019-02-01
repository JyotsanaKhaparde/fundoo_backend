/***********************************************************************************
 *  Purpose         : user_contriller is for checking that request body of 
 *                    registration and login have error or not and according to it 
 *                    it gives response result.
 *  @file           : user_controller.js
 *  @author         : Jyotsana Khaparde
 *  @version        : 1.0
 *  @since          : 28/01/2019
 **********************************************************************************/

const userService = require('../services/user_services');
const { check, validationResult } = require('express-validator/check');
let jwt = require('jsonwebtoken');
const sending_mail = require('../middleware/sendingEmail')
const utility = require('../Utility/utility');
exports.registration = (req, res) => {
    var responseResult = {};
    check('firstName', 'firstname cannot be empty.....').isEmpty();
    check('firstName', 'firstname must contain only alphabets').isAlpha();
    check('lastName', 'lastname cannot be empty').isEmpty();
    check('lastName', 'lastname must contain only alphabets').isAlpha();
    check('email', 'username cannot be empty').isEmpty();
    check('email', 'username must be an email').isEmail();
    check('password', 'password cannot be empty').isEmpty();
    check('password', 'password must be atleast 8 characters long').isLength({ min: 8 });
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).send({
            status: false,
            message: err,
        });
    }
    userService.registration(req.body, (err, result) => {
        console.log("request body", req.body);

        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            //generate token in registration for emailverification
            const payload = {
                id: responseResult.result._id,
                //email: responseResult.result.email
            }
            const jwtToken = utility.tokenGenerated(payload);
            const url = `http://localhost:3000/verifyEmail/${jwtToken.token}`;
            console.log(url);
            //pass url in sendMailFunction & call middleware
            sending_mail.sendEMailFunction(url);
            res.status(200).send(url);
        }
    })
}
exports.login = (req, res, next) => {
    try {
        var responseResult = {};
        console.log('48 ---in user ctrl');
        check('email', 'username cannot be empty').isEmpty();
        check('email', 'username must be an email').isEmail();
        check('password', 'password cannot be empty').isEmpty();
        check('password', 'password must be atleast 8 characters long').isLength({ min: 8 });
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).send({
                status: false,
                message: err,
            });
        }
        //var tokenResponse = {};
        userService.login(req.body, (err, result) => {
            if (err) {
                responseResult.success = false;
                responseResult.error = err;
                res.status(500).send(responseResult)
            }
            else {
                responseResult.success = true;
                responseResult.result = result;
                //generate token for login
                const payload = {
                    id: responseResult.result._id,
                    email: responseResult.result.email
                }
                const jwtToken = jwt.sign({ payload }, 'secretkey', { expiresIn: '24h' });
                console.log("username : ", payload.email);
                console.log("id: ", payload.id);
                const obj = {
                    success: true,
                    message: 'Authentication successful!',
                    token: jwtToken
                }
                console.log('generated token :', jwtToken);
                console.log('object is: ', obj);
                res.status(200).send(obj);
            }
        })
    }
    catch (error) {
        next(error);
    }
}
exports.forgetpassword = (req, res) => {
    responseResult = {},
        console.log('78---in user ctrl');
    userService.forgetpassword(req.body, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            const payload = {
                email: responseResult.result.email
            }
            const jwtTokenOfForgetPassword = utility.tokenGenerated(payload);
            const url = `http://localhost:3000/verifyForgetPass/${jwtTokenOfForgetPassword.token}`;
            console.log(url);
            //pass url in sendMailFunction & call middleware

            sending_mail.sendEMailFunction(url);
            res.status(200).send(url);
            // res.status(200).send(responseResult);
        }
    })
}
exports.getAllUser = (req, res) => {
    var responseResult = {};
    userService.getAllUser((err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
exports.sendResponse = (req, res) => {
    var responseResult = {};
    console.log('107---in user ctrl send token is verified response');
    userService.redirect(req.decoded, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log('116---in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}
exports.sendResponseForForgetPass = (req, res) => {
    var responseResult = {};
    console.log('107---in user ctrl send token is verified response');
    userService.redirectForForgetPass(req.decoded, (err, result) => {
        if (err) {
            responseResult.success = false;
            responseResult.error = err;
            res.status(500).send(responseResult)
        }
        else {
            console.log('116---in user ctrl token is verified giving response');
            responseResult.success = true;
            responseResult.result = result;
            res.status(200).send(responseResult);
        }
    })
}


