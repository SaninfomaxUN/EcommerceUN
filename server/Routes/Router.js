const express = require('express');
const Router = express.Router();
const serviceAuth = require("../Services/Auth/serviceAuth.js")
const service2FA = require("../Services/2FA/service2FA.js")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.js")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.js")
const cors = require('cors');
const cookieParser = require("cookie-parser")

Router.use(cors())
Router.use(cors({
    origin:["http://localhost:3000"],
    methods:["Get","POST"],
    credentials:true
}));
// rutas de Autenticación
Router.post('/login', serviceAuth.login)
Router.post('/isUserAuth', serviceAuth.isUserAuth)


// rutas de registro
Router.post('/serviceSignUpShopper', serviceSignUpShopper.signUpNewShopper)
Router.post('/serviceSignUpSeller', serviceSignUpSeller.signUpNewSeller)


Router.post("/sendTwoFA", service2FA.s2FA)


module.exports = Router;

