import React from 'react';
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import NotFoundPage from '../Pages/NotfoundPage/NotFoundPage'
import HomePage from '../Pages/Home/HomePage'
import SignUpPage from '../Pages/SignUp/SignUpPage'
import SignUpShopperPage from '../Pages/SignUp/SignUpShopper/SignUpShopperPage'
import SignUpSellerPage from '../Pages/SignUp/SignUpSeller/SignUpSellerPage'
import LoginPage from '../Pages/Login/LoginPage'
import PageCategories from '../Pages/PagesCategories/PageCategories'
import RecoverPasswordPage from '../Pages/Login/RecoverPassword/RecoverPasswordPage';
import ProfilePage from '../Pages/PagesShopper/Profile/ProfilePage';
import ProfileSellerPage from '../Pages/PagesSeller/ProfileSeller/ProfileSellerPage';
import SalesPage from '../Pages/PagesSeller/Sales/SalesPage';
import PaymentMethodsPage from '../Pages/PagesShopper/PaymentMethods/PaymentMethodsPage';
import PaymentsPage from '../Pages/PagesSeller/Payments/PaymentsPage';
import MyPurchasesPage from '../Pages/PagesShopper/MyPurchases/MyPurchasesPage';
import NotificationPage from '../Components/Commons/Notification/NotificationPage';
import WishListPage from '../Pages/PagesShopper/WishList/WishListPage';
import ResultsPage from '../Pages/Results/ResultsPage';
import ProductPage from '../Pages/Product/ProductPage';
import PrivateRoutesShopper from '../Components/Security/PrivateRoutesShopper'
import PrivateRoutesSeller from '../Components/Security/PrivateRoutesSeller'
import PrivateRoutesAdmin from '../Components/Security/PrivateRoutesAdmin'
import CartPage from '../Pages/Cart/CartPage';
import SellerProductsPage from '../Pages/PagesSeller/SellerProducts/SellerProductsPage';
import CheckoutPage from "../Pages/Checkout/CheckoutPage";
import AddressesPage from "../Pages/PagesShopper/Addresses/AddressesPage";
//Admin imports
import SellersAdminPage from '../Pages/PagesAdmin/SellersAdmin/SellersAdminPage';
import ShoppersAdminPage from '../Pages/PagesAdmin/ShoppersAdmin/ShoppersAdminPage';
import ProductsAdminPage from '../Pages/PagesAdmin/ProductsAdmin/ProductsAdminPage';
import LoginAdminPage from '../Pages/LoginAdmin/LoginAdminPage';


export default function App(){


return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element ={<HomePage/>} />
            <Route path="/Home" element ={<HomePage/>} />
            <Route path="/Login" element ={<LoginPage/>} />
            <Route path="/Admin" element ={<LoginAdminPage/>} />
            <Route path="/SignUp" element ={<SignUpPage/>} />
            <Route path="/SignUpShopper" element ={<SignUpShopperPage/>} />
            <Route path="/SignUpSeller" element ={<SignUpSellerPage/>} />
            <Route path="/RecoverPassword" element ={<RecoverPasswordPage/>} />
            <Route path="/*" element ={<NotFoundPage/>} />
            {/* Rutas de CategoriasPages */}
            <Route path="/PageCategories" element ={<PageCategories/>} />

            <Route path='/Results' element = {<ResultsPage/>}/>
            <Route path='/Product/:id' element = {<ProductPage/>}/>

            {/* rutas a proteger comprador*/}
            <Route element={<PrivateRoutesShopper/>}>
                    {/*<Route path="/DashShopper" element ={<DashboardShopper/>} /> */}
                    <Route path="/Profile" element ={<ProfilePage/>} />
                    <Route path="/WishList" element ={<WishListPage/>} />
                    <Route path="/MyPurchases" element ={<MyPurchasesPage/>} />
                    <Route path="/PaymentMethods" element ={<PaymentMethodsPage/>} />
                    <Route path="/Addresses" element ={<AddressesPage/>} />
                    <Route path="/Notification" element ={<NotificationPage/>} />
                    <Route path="/Cart" element ={<CartPage/>} />
                    <Route path="/Checkout" element ={<CheckoutPage/>} />
            </Route>
    
            {/* rutas a proteger vendedor */}
            <Route element={<PrivateRoutesSeller/>}>
                      {/*<Route path="/DashSeller" element ={<DashBoardSeller/>} />*/}
                      <Route path="/ProfileSeller" element ={<ProfileSellerPage/>} />
                      <Route path="/SellerProducts" element ={<SellerProductsPage/>} />
                      <Route path="/Sales" element ={<SalesPage/>} />
                      <Route path="/Payments" element ={<PaymentsPage/>} />
             </Route>


             {/* rutas a proteger Admin */}
             <Route element={<PrivateRoutesAdmin/>}>
             <Route path="/SellerAdmin" element ={<SellersAdminPage/>} />
             <Route path="/ShopperAdmin" element ={<ShoppersAdminPage/>} />
             <Route path="/ProductsAdmin" element ={<ProductsAdminPage/>} />
             </Route>
        </Routes>
    </BrowserRouter>

    )
}
