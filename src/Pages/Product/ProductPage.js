import React, {useEffect, useState} from 'react';
import Footer from '../../Components/Commons/Footer/Footer'
import CardProduct from './Components/CardProduct';
import './Styles/ProductPage.css';
import {useParams} from 'react-router';
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import NavbarShopper from "../../Components/Commons/NavbarShopper/NavbarShopper";
import NavbarSeller from "../../Components/Commons/NavbarSeller/NavbarSeller";



const getCart = (idComprador,idProducto)  => {
    let quantity = 0
    axios.post(process.env.REACT_APP_API +'/getCart', {idComprador: idComprador})
        .then(res => {
            let  productsCart = res.data.Products
            let product = productsCart.find(product => product.ID_PRODUCTO === parseInt(idProducto));
            quantity=product["cantidad"]
        })
        .catch(err => {
        });
        return quantity
}
// const getQuantity = (listaproductos) => {

// }
const getProduct = (idProducto, setProduct, setLoaded, navigate) => {
    let product 
    axios.post(process.env.REACT_APP_API +'/getProduct', {idProducto: idProducto})
        .then(res => {
            setLoaded(true)
            product = res.data[0]
            setProduct(product)
        })
        .catch(err => {
            navigate("/*")
        });
    return product
};

const ProductPage = () => {
    const idComprador = Cookies.get("id")
    const [product, setProduct] = useState({
        ID_PRODUCTO: '',
        N_PRODUCTO: '',
        DESCRIPCION: '',
        PRECIOFINAL: '',
        IMAGEN: '',
        ESTADO: ''
    })

    const [loaded, setLoaded] = useState(false);
    const {id} = useParams();
    let [nombre, idProducto] = id.split("$$")

    const navigate = useNavigate()
    
    useEffect(() => {
        getCart(idComprador,idProducto)
        getProduct(idProducto, setProduct, setLoaded, navigate)
    }, [idProducto]);


    const token = Cookies.get('token');
    const role = Cookies.get('role');
    let shopperConnected = false
    let sellerConnected = false
    if (token && role === 'comprador') {
        shopperConnected = true
    } else if (token && role === 'vendedor') {
        sellerConnected = true
    }

    return (
        <div>
            {shopperConnected && <NavbarShopper/>}
            {sellerConnected && <NavbarSeller/>}
            {!loaded && <CircularProgress color="success"/>}
            {loaded &&
                <div className='container-body'>
                    <header>
                        <nav className='navbar'>
                            <div className='navbar-links'>
                                <a href='/'>Inicio</a>
                                <a href='/'>Seguir buscando</a>
                                <a href='/Cart'>Mi Carrito</a>
                            </div>
                        </nav>
                    </header>
                    <div className='main-container'>
                        <CardProduct
                            id={product.ID_PRODUCTO}
                            nombre={product.N_PRODUCTO}
                            precio={product.PRECIOFINAL}
                            foto={product.IMAGEN}
                            descripcion={product.DESCRIPCION}
                            estado={product.ESTADO}
                            mostrarBotonCompra={true}
                            idComprador={idComprador}
                        />
                    </div>
                    <Footer/>
                </div>}
        </div>
    )
}


export default ProductPage;
