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
    email_varification_token: {
        type: String,
        default: ''
    },
    forget_password_token: {
        type: String,
        default: ''
    },
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
    user.find({}, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
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
    user.updateOne({ _id: data.payload.id }, { is_confirmed: true }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}

userModel.prototype.updateUserForForgetPass = (data, callback) => {
    user.updateOne({ _id: data.payload.id }, { password: data.password }, (err, result) => {
        if (err) {
            callback(err);
        }
        else {
            callback(null, result);
        }
    });
}
module.exports = new userModel();