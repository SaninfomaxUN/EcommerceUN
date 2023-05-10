const express = require('express');
const Router = express.Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const serviceAuth = require("../Services/Auth/serviceAuth.cjs")
const service2FA = require("../Services/2FA/service2FA.cjs")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.cjs")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.cjs")



Router.post('/login', serviceAuth.login)

Router.post('/isAuth', serviceAuth.isAuth)

Router.post('/logout', serviceAuth.logout)

Router.post('/serviceSignUpShopper', serviceSignUpShopper.signUpNewShopper)


Router.post('/serviceSignUpSeller', serviceSignUpSeller.signUpNewSeller)


Router.post("/sendTwoFA", service2FA.s2FA)


module.exports = Router;





























