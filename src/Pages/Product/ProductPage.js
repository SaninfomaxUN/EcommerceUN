import React from 'react';
import Cookies from "js-cookie";
import Footer from '../../Components/Commons/Footer/Footer'
import data from './data/data';
import CardProduct from './Components/CardProduct';
import './Styles/ProductPage.css';
import { useParams } from 'react-router';
import NavbarShopper from "../../Components/Commons/NavbarShopper/NavbarShopper";
import NavbarSeller from "../../Components/Commons/NavbarSeller/NavbarSeller";

function ProductPage() {
    const token = Cookies.get('token');
    const role = Cookies.get('role');
    let shopperConnected = false
    let sellerConnected = false
    if (token && role === 'comprador') {
        shopperConnected=true
    }else if (token && role === 'vendedor') {
        sellerConnected=true
    }
    const {name} = useParams();
    console.log(name);
    const producto = data[3];
    return (
        <div className='container-body'>
            {shopperConnected && <NavbarShopper/>}
            {sellerConnected && <NavbarSeller/>}
            <header>
                <nav className='navbar'>
                    <div className='navbar-links'>
                        <a href='/'>Inicio</a>
                        <a href='/'>Seguir buscando</a>
                        <a href='/'>Mi Carrito</a>
                    </div>
                </nav>
            </header>
            <div className='main-container'>
                <CardProduct
                    id={producto.id}
                    nombre={producto.nombre}
                    precio={producto.precio}
                    foto={producto.foto}
                    descripcion={producto.descripcion}
                />
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage;
