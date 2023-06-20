const express = require('express');
const Router = express.Router();
const serviceAuth = require("../Services/Auth/serviceAuth.js")
const serviceRecoverPassword = require("../Services/RecoverPassword/serviceRecoverPassword.js")
const service2FA = require("../Services/2FA/service2FA.js")
const serviceSignUpSeller = require("../Services/SignUp/SignUpSeller/serviceSignUpSeller.js")
const serviceSignUpShopper = require("../Services/SignUp/SignUpShopper/serviceSignUpShopper.js")
const serviceProduct = require("../Services/Product/serviceProduct")
const serviceSearch = require("../Services/Search/serviceSearch");
const serviceCart = require("../Services/Cart/serviceCart");
const serviceAdmin = require("../Services/Admin/serviceAdmin.js")

const cors = require('cors');
cors({ origin: true });
const cookieParser = require("cookie-parser")


// rutas de Autenticación
Router.post('/loginSeller', serviceAuth.serviceLoginSeller)
Router.post('/loginShopper', serviceAuth.serviceLoginShopper)
Router.post('/loginAdmin', serviceAuth.serviceLoginAdmin)

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
Router.post('/getSellerProducts', serviceProduct.getSellerProducts)
Router.post('/insertProduct', serviceProduct.insertProduct)
Router.put('/updateProduct',serviceProduct.updateProduct)
Router.delete('/deleteProduct', serviceProduct.deleteProduct)

//Carrito
Router.post('/getCart', serviceCart.getCart)
Router.post('/updateCart', serviceCart.updateProductCart)
Router.post('/removeCart', serviceCart.removeProductCart)
Router.post('/cleanCart', serviceCart.cleanCart)

//Rutas admin
Router.get('/getProductData', serviceProduct.getProductData)
Router.get('/getAllProducts', serviceProduct.getAllProducts)
Router.get('/getAllSellers', serviceAdmin.getAllSellers)
Router.get('/getAllShoppers', serviceAdmin.getAllShoppers)

Router.delete('/deleteProduct2', serviceAdmin.deleteProduct2)
Router.delete('/deleteShopper', serviceAdmin.deleteShopper)
Router.delete('/deleteSeller', serviceAdmin.deleteSeller)

Router.put('/activateSeller',serviceAdmin.activateSeller)
Router.put('/activateShopper',serviceAdmin.activateShopper)
Router.put('/activateProduct',serviceAdmin.activateProduct)

Router.put('/suspendProduct',serviceAdmin.suspendProduct)
Router.put('/suspendSeller',serviceAdmin.suspendSeller)
Router.put('/suspendShopper',serviceAdmin.suspendShopper)
// Router.put('/suspendProduct',serviceAdmin.suspendProduct)
module.exports = Router;

