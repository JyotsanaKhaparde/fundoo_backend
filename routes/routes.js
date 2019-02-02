/***********************************************************************************
 *  Purpose         : given routes using router.
 *  @file           : router.js
 *  @author         : Jyotsana Khaparde
 *  @version        : 1.0
 *  @since          : 28/01/2019
 **********************************************************************************/
const express = require('express');
const router = express.Router();
const loginAuth = require('../middleware/loginmiddleware')
//Setting controller path into controller variables
const userController = require('../controller/user_controller');
router.post('/login', loginAuth.loginAuthentication, userController.login);
router.post('/registration', userController.registration);
router.post('/forgetpassword', userController.forgetpassword);
router.get('/getAllUser', userController.getAllUser);
router.post('/verifyEmail/:token', loginAuth.checkToken, userController.sendResponse);
router.post('/resetPassword/:token', loginAuth.checkToken, userController.sendResponseForForgetPass)
module.exports = router;