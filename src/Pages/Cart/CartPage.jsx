import React, {useEffect, useState} from 'react';
import '../Cart/CarritoPage.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import CardProduct from "../Product/Components/CardProduct";
import Card from "../../Components/Commons/Card/Card"
import {showAlertInfo, showAlertSuccess} from "../../Components/Commons/Alerts/AlertsModal";
import {CircularProgress} from "@mui/material";

const removeProductToCart = async (idProducto, idComprador) => {
    console.log(idComprador, idProducto)
    await axios.post(process.env.REACT_APP_API + '/removeCart', {idComprador: idComprador, idProducto: idProducto})
        .then(res => {
            console.log(res)

        })
        .catch(err => {
            console.log(err)
        });

}

function CartPage() {
    const idComprador = Cookies.get("id")
    const [cart, setCart] = useState([]);
    const [dataCart, setDataCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getCart = async (idComprador) => {

        await axios.post(process.env.REACT_APP_API + '/getCart', {idComprador: idComprador})
            .then(res => {
                setDataCart(res.data['Cart'][0])
                setCart(res.data.Products)
                setLoaded(true)
                /*let product = productsCart.find(product => product.ID_PRODUCTO === parseInt(idProducto));
                setQuantity(product.CANTIDAD)
                quantity=product.cantidad*/
            })
            .catch(err => {
                console.log("FFF")
            });

    }

    useEffect(() => {
        getCart(idComprador, setLoaded).then()
    }, []);

    const handleFinalizarCompra = () => {
        // Lógica para finalizar la compra
        console.log("Compra finalizada");
    };

    const handleEliminarDelCarrito = (idProducto) => {
        removeProductToCart(idProducto, idComprador).then(r => {
            showAlertSuccess("Producto eliminado!", () => {
                window.location.reload();
            })

        })

    };

    return (
        <div>
            {!loaded && <CircularProgress color="success"/>}
            {loaded &&
                <div className="carrito-page-container">
                    <nav className="navbar">
                        <Link to="/">Inicio</Link>
                    </nav>
                    <div className="precio-total-container">
                        <p>Precio Total: ${dataCart['COSTOFINAL']}</p>
                        <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
                    </div>
                    <div className="grilla-container">
                        {cart.map((producto) => (
                            <div key={producto.ID_PRODUCTO}>
                                <CardProduct
                                    key={producto.ID_PRODUCTO}
                                    id={producto.ID_PRODUCTO}
                                    nombre={producto.N_PRODUCTO}
                                    precio={producto.PRECIOFINAL}
                                    foto={producto.IMAGEN}
                                    descripcion={producto.DESCRIPCION}
                                    mostrarBotonCompra={false}
                                />
                                <button onClick={() => handleEliminarDelCarrito(producto.ID_PRODUCTO)}>Eliminar del
                                    Carrito
                                </button>
                            </div>
                        ))}
                    </div>
                </div>}
        </div>
    );
}

export default CartPage;
