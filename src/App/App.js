import React from 'react'
import {BrowserRouter, Routes,Route, Outlet,Redirect} from 'react-router-dom'
import NotFoundPage from '../Pages/NotfoundPage/NotFoundPage'
import HomePage from '../Pages/Home/HomePage'
import SignUpPage from '../Pages/SignUp/SignUpPage'
import SignUpShopperPage from '../Pages/SignUp/SignUpShopper/SignUpShopperPage'
import SignUpSellerPage from '../Pages/SignUp/SignUpSeller/SignUpSellerPage'
import LoginPage from '../Pages/Login/LoginPage'
import PageCategories from '../Pages/PagesCategories/PageCategories'
import DashboardShopper from '../Components/Commons/NavbarShopper/DashboardShopper'
import DashBoardSeller from '../Components/Commons/NavbarSeller/DashBoardSeller';
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



export default function App(){



// const [user, setUser] = useState(null)
// const login=()=>{
//     setUser({
//         id:1,
//         name:"john",
//         rol:['admin']
//     })
// }
// const logout =()=> setUser(null)





return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element ={<HomePage/>} />
            <Route path="/Home" element ={<HomePage/>} />
            <Route path="/Login" element ={<LoginPage/>} />
            <Route path="/SignUp" element ={<SignUpPage/>} />
            <Route path="/SignUpShopper" element ={<SignUpShopperPage/>} />
            <Route path="/SignUpSeller" element ={<SignUpSellerPage/>} />
            <Route path="/RecoverPassword" element ={<RecoverPasswordPage/>} />
            <Route path="/*" element ={<NotFoundPage/>} />

            {/* Rutas de CategoriasPages */}
            <Route path="/PageCategories" element ={<PageCategories/>} />

            {/* Rutas para resultados y vista de producto */}
            <Route path='/Results' element = {<ResultsPage/>}/>
            <Route path='/Product/:id' element = {<ProductPage/>}/>

            {/* rutas a proteger */}

            <Route path="/Notification" element ={<NotificationPage/>} />


            {/* Shopper */}
            <Route path="/DashShopper" element ={<DashboardShopper/>} />
            <Route path="/Profile" element ={<ProfilePage/>} />
            <Route path="/WishList" element ={<WishListPage/>} />
            <Route path="/MyPurchases" element ={<MyPurchasesPage/>} />
            <Route path="/PaymentMethods" element ={<PaymentMethodsPage/>} />

            {/* Seller */}
            <Route path="/DashSeller" element ={<DashBoardSeller/>} />
            <Route path="/ProfileSeller" element ={<ProfileSellerPage/>} />
            <Route path="/Sales" element ={<SalesPage/>} />
            <Route path="/Payments" element ={<PaymentsPage/>} />

            {/*
            <ProtectedRoute isAllowed={!!user && user.roles.includes('admin')}>
            <Admin/>
            </ProtectedRoute> */}

            



        </Routes>
    </BrowserRouter>

    )
}
