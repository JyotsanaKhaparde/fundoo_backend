/***********************************************************************************
 *  Purpose         : It is use for making schema for registration and login.
 *  @file           : user.js
 *  @author         : Jyotsana Khaparde
 *  @version        : 1.0
 *  @since          : 28/01/2019
 **********************************************************************************/
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
let saltRounds = 10;
//Creating user schema using moongose
const UserSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    is_confirmed: {
        type: Boolean,
        default: false
    },
    forget_password_token: {
        type: Boolean,
        default: false
    },
    //timestamps: true
    createdOn: {
        type: Date,
        default: Date.now()
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    }
    
    
});
var user = mongoose.model('User', UserSchema);
function userModel() {

}
//Saving data into database using the user schema
userModel.prototype.registration = (data, callback) => {
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null) {
                callback("user already exits with this username");
                console.log("result", result);
            }
            else {
                data.password = bcrypt.hashSync(data.password, saltRounds);
                var newData = new user(data);
                newData.save((err, result) => {
                    if (err) {
                        callback(err);
                    }
                    else {
                        callback(null, result);
                    }
                })
            }
        }
    });
}
//Finding user into database using the findOne()
userModel.prototype.login = (data, callback) => {
    console.log('72 ---in user model');
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                if (result !== null || data.password === result.password) {
                    callback(null, result);
                }
                else {
                    callback("incorrect password");
                }
            }
            else {
                callback("incorect mail")
            }
        }
    });
}
userModel.prototype.forgetpassword = (data, callback) => {
    console.log('95--inuser model');
    console.log('96--data in user model :', data.email);
    user.findOne({ "email": data.email }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            if (result !== null && data.email == result.email) {
                callback(null, result);
            }
            else {
                callback("incorect mail")
            }
        }
    });
}
userModel.prototype.getAllUser = (callback) => {
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
userModel.prototype.updateUser = (data, callback) => {
    console.log('119--in user model--data--', data.body);
    user.updateOne({ _id: data.payload.id }, { is_confirmed: true }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
userModel.prototype.updateUserForForgetPass = (req, callback) => {
    console.log('126--inside user model data---', req.body);
    console.log('127--inside user model decoded---', req.decoded);
    let newPassword = bcrypt.hashSync(req.body.password, saltRounds);
    console.log('136---user model----new password : ', newPassword);
    user.updateOne({ _id: req.decoded.payload.user_id }, { password: newPassword }, { forget_password_token: true }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    }); 
}
module.exports = new userModel();