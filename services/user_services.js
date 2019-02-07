/***********************************************************************************
 *  Purpose         : It's for taking data and callback function of registration and 
 *                    login according to error or result.
 *  @file           : user_service.js
 *  @author         : Jyotsana Khaparde
 *  @version        : 1.0
 *  @since          : 28/01/2019
 **********************************************************************************/
const userModel = require('../app/models/user');
exports.registration = (data, callback) => {
    userModel.registration(data, (err, result) => {
        if (err) {
            callback(err)
        }
        else {
            callback(null, result);
        }
    })
}
exports.login = (data, callback) => {
   // console.log('21 ---in user services');
    userModel.login(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.forgetpassword = (data, callback) => {
    console.log('31 ---in user services');
    userModel.forgetpassword(data, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.getAllUser = (req, callback) => {
    userModel.getAllUser(req, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.redirect = (decoded, callback) => {
    userModel.updateUser(decoded, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}
exports.redirectForForgetPass = (req, callback) => {
    userModel.updateUserForForgetPass(req, (err, result) => {
        if (err) {
            callback(err);
        } else {
            callback(null, result);
        }
    })
}