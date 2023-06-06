import React, {useEffect, useState} from 'react';
import Footer from '../../Components/Commons/Footer/Footer'
import CardProduct from './Components/CardProduct';
import './Styles/ProductPage.css';
import {useParams} from 'react-router';
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";


const getCart = (idComprador,idProducto, setQuantity,setLoaded)  => {
    let quantity = 0
    axios.post(process.env.REACT_APP_API +'/getCart', {idComprador: idComprador})
        .then(res => {
            let  productsCart = res.data.Products
            let product = productsCart.find(product => product.ID_PRODUCTO === parseInt(idProducto));
            setQuantity(product.CANTIDAD)
            quantity=product.cantidad
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

const ProductPage = ({carrito,setCarrito}) => {
    const [quantity,setQuantity] = useState(0)
    const [product, setProduct] = useState({
        ID_PRODUCTO: '',
        N_PRODUCTO: '',
        DESCRIPCION: '',
        PRECIOFINAL: '',
        IMAGEN: '',
        QUANTITY: 0 
    })
    const agregarAlCarrito = () => {
        setCarrito([...carrito, product]);
    };

    const [loaded, setLoaded] = useState(false);
    const {id} = useParams();
    let [nombre, idProducto] = id.split("$$")

    const navigate = useNavigate()

    useEffect(() => {
        getCart(65465488,idProducto,setQuantity)
        getProduct(idProducto, setProduct, setLoaded, navigate)
    }, [idProducto]);

    return (
        <div>
            {!loaded && <CircularProgress color="success"/>}
            {loaded &&
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
                            id={product.ID_PRODUCTO}
                            nombre={product.N_PRODUCTO}
                            precio={product.PRECIOFINAL}
                            foto={product.IMAGEN}
                            descripcion={product.DESCRIPCION}
                            quantity = {quantity}
                            agregarProducto={agregarAlCarrito}
                        />
                    </div>
                    <Footer/>
                </div>}
        </div>
    )
}


export default ProductPage;
