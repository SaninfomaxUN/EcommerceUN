const express = require('express');
const Router = express.Router();
const serviceAuth = require("../Services/Auth/serviceAuth.js")
const serviceRecoverPassword = require("../Services/RecoverPassword/serviceRecoverPassword.js")
const service2FA = require("../Services/2FA/service2FA.js")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.js")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.js")
const serviceProduct = require("../Services/Product/serviceProduct")
const serviceSearch = require("../Services/Search/serviceSearch");
const cors = require('cors');
const cookieParser = require("cookie-parser")


// rutas de Autenticación
Router.post('/login', serviceAuth.login)
Router.post('/resetPasswordShopper', serviceRecoverPassword.doRecoverPasswordShopper)
Router.post('/resetPasswordSeller', serviceRecoverPassword.doRecoverPasswordSeller)
Router.post('/isUserAuth', serviceAuth.isUserAuth)


// rutas de registro
Router.post('/serviceSignUpShopper', serviceSignUpShopper.signUpNewShopper)
Router.post('/serviceSignUpSeller', serviceSignUpSeller.signUpNewSeller)
Router.post('/checkExistingShopper', serviceSignUpShopper.checkExistingShopper)
Router.post('/checkExistingSeller', serviceSignUpSeller.checkExistingSeller)

Router.post("/send2FA", service2FA.send2FA)
Router.post("/check2FA", service2FA.check2FA)

//Consultar Productos
Router.post('/searchAllProduct', serviceSearch.searchAllProduct)
Router.post('/searchProduct', serviceSearch.searchProduct)
Router.post('/getProduct', serviceProduct.getProduct)

module.exports = Router;

