const express = require('express');
const Router = express.Router();

const jwt = require('jsonwebtoken');


const serviceAuth = require("../Services/Auth/serviceAuth.js")
const serviceRecoverPassword = require("../Services/RecoverPassword/serviceRecoverPassword.js")
const service2FA = require("../Services/2FA/service2FA.js")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.js")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.js")



Router.post('/login', serviceAuth.login)
Router.post('/resetPasswordShopper', serviceRecoverPassword.doRecoverPasswordShopper)
Router.post('/resetPasswordSeller', serviceRecoverPassword.doRecoverPasswordSeller)
Router.post('/logout', serviceAuth.logout)


Router.post('/signUpShopper', serviceSignUpShopper.signUpNewShopper)
Router.post('/checkExistingShopper', serviceSignUpShopper.checkExistingShopper)


Router.post('/serviceSignUpSeller', serviceSignUpSeller.signUpNewSeller)
Router.post('/checkExistingSeller', serviceSignUpSeller.checkExistingSeller)

Router.post("/send2FA", service2FA.send2FA)

Router.post("/check2FA", service2FA.check2FA)


module.exports = Router;


