import React, {useEffect, useState} from 'react';
import { Buffer } from 'buffer';
import Footer from '../../Components/Commons/Footer/Footer'
import CardProduct from './Components/CardProduct';
import './Styles/ProductPage.css';
import { useParams } from 'react-router';
import axios from "axios";
import {CircularProgress} from "@mui/material";
import {useNavigate} from "react-router-dom";


const getProduct = (idProducto,setProduct, setLoaded, navigate) => {
    let product
    axios.post('http://localhost:5000/api/getProduct', {idProducto: idProducto})
        .then(res => {
            setLoaded(true)
            setProduct(res.data[0])
        })
        .catch(err => {
            navigate("/*")
        });
    return product
};

const ProductPage = () => {
    const [product, setProduct] = useState({
        id_producto:'',
        N_PRODUCTO:'',
        DESCRIPCION:'',
        PRECIOFINAL:'',
        IMAGEN:''

    })
    const [loaded, setLoaded] = useState(false);
    const {id} = useParams();
    let [nombre, idProducto] = id.split("$$")

    const navigate = useNavigate()

    useEffect(() => {
        getProduct(idProducto,setProduct, setLoaded, navigate)
    },[idProducto]);

    return (
        loaded && <CircularProgress color="success" />,
        loaded &&
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
                    id={product.id_producto}
                    nombre={product.N_PRODUCTO}
                    precio={product.PRECIOFINAL}
                    foto={`data:;base64,${convertImage(product.IMAGEN)}`}
                    descripcion={product.DESCRIPCION}
                />
            </div>
            <Footer/>
        </div>
    )
}

function convertImage(image){
    return Buffer.from(image).toString('base64')
}

export default ProductPage;
