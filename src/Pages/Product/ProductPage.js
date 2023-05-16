import React from 'react';
// import { Link } from 'react-router-dom';  Cannot destructure property 'basename' of 'react__WEBPACK_IMPORTED_MODULE_0__.useContext(...)' as it is null.
import Footer from '../../Components/Commons/Footer/Footer'
import data from './data/data';
import CardProduct from './Components/CardProduct';
import './Styles/ProductPage.css';

function ProductPage() {
    const primerProducto = data[0];
    return (
        <div className='container-body'>
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
                    id={primerProducto.id}
                    nombre={primerProducto.nombre}
                    precio={primerProducto.precio}
                    foto={primerProducto.foto}
                    descripcion={primerProducto.descripcion}
                />
            </div>
            <Footer />
        </div>
    )
}

export default ProductPage;
