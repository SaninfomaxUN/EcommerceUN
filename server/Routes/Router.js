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
const serviceAddress = require("../Services/Address/serviceAddress");
const servicePaymentMethod = require("../Services/PaymentMethod/servicePaymentMethod");
const serviceOrder = require("../Services/Order/serviceOrder");
const serviceProfileShopper = require("../Services/Profile/ProfileShopper/serviceProfileShopper");

const cors = require('cors');
cors({ origin: true });
const cookieParser = require("cookie-parser")
const serviceProfileSeller = require("../Services/Profile/ProfileSeller/serviceProfileSeller");
const serviceSales = require("../Services/Sales/serviceSales");



// rutas de Autenticación
Router.post('/loginSeller', serviceAuth.serviceLoginSeller)
Router.post('/loginShopper', serviceAuth.serviceLoginShopper)


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

//Direcciones
Router.post('/getAddress',serviceAddress.getAddress)
Router.post('/getAllAddresses',serviceAddress.getAddresses)
Router.post('/insertAddress',serviceAddress.insertAddress)
Router.post('/updateAddress',serviceAddress.updateAddress)
Router.post('/removeAddress',serviceAddress.removeAddress)
Router.post('/cleanAddress',serviceAddress.cleanAddresses)

//Métodos de Pago
Router.post('/getPaymentMethod',servicePaymentMethod.getPaymentMethod)
Router.post('/getAllPaymentMethods',servicePaymentMethod.getPaymentMethods)
Router.post('/insertPaymentMethod',servicePaymentMethod.insertPaymentMethod)
Router.post('/updatePaymentMethod',servicePaymentMethod.updatePaymentMethod)
Router.post('/removePaymentMethod',servicePaymentMethod.removePaymentMethod)
Router.post('/cleanPaymentMethods',servicePaymentMethod.cleanPaymentMethods)

//Pedidos - Comprador
Router.post('/getOrder',serviceOrder.getOrder)
Router.post('/getAllOrders',serviceOrder.getOrders)
Router.post('/insertOrder',serviceOrder.insertOrder)
Router.post('/removeOrder',serviceOrder.removeOrder)

//Ventas - Vendedor
Router.post('/getSales',serviceSales.getSales)
Router.post('/getSalesByProduct',serviceSales.getSalesByProduct)

//Compradores
Router.post('/getShopper', serviceProfileShopper.getShopper)
Router.post('/updateShopper', serviceProfileShopper.updateShopper)
Router.post('/deleteShopper', serviceProfileShopper.deleteShopper)

//Vendedores
Router.post('/getSeller', serviceProfileSeller.getSeller)
Router.post('/updateSeller', serviceProfileSeller.updateSeller)
Router.post('/deleteSeller', serviceProfileSeller.deleteSeller)

module.exports = Router;

