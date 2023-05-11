const express = require('express');
const Router = express.Router();

const jwt = require('jsonwebtoken');


const serviceAuth = require("../Services/Auth/serviceAuth.js")
const service2FA = require("../Services/2FA/service2FA.js")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.js")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.js")



Router.post('/login', serviceAuth.login)

Router.post('/logout', serviceAuth.logout)


Router.post('/serviceSignUpShopper', serviceSignUpShopper.signUpNewShopper)


Router.post('/serviceSignUpSeller', serviceSignUpSeller.signUpNewSeller)


Router.post("/sendTwoFA", service2FA.s2FA)


module.exports = Router;


