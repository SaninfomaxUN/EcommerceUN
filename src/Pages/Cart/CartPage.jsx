import React, {useEffect, useState} from 'react';
import '../Cart/CarritoPage.css';
import {Link} from 'react-router-dom';
import axios from "axios";
import Cookies from "js-cookie";
import CardProduct from "../Product/Components/CardProduct";
import {showAlertSuccess} from "../../Components/Commons/Alerts/AlertsModal";
import {CircularProgress} from "@mui/material";
import NavbarShopper from "../../Components/Commons/NavbarShopper/NavbarShopper";
import NavbarSeller from "../../Components/Commons/NavbarSeller/NavbarSeller";
import {useNavigate} from "react-router";

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
    const navigate = useNavigate();
    const idComprador = Cookies.get("id");
    const [cart, setCart] = useState([]);
    const [dataCart, setDataCart] = useState([]);
    const [loaded, setLoaded] = useState(false);

    const getCart = async (idComprador) => {

        await axios.post(process.env.REACT_APP_API + '/getCart', {idComprador: idComprador})
            .then(res => {
                setDataCart(res.data['Cart'][0])
                setCart(res.data.Products)
                setLoaded(true)
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
        navigate("/Checkout")
    };

    const handleEliminarDelCarrito = (idProducto) => {
        removeProductToCart(idProducto, idComprador).then(r => {
            showAlertSuccess("Producto eliminado!", () => {
                window.location.reload();
            }, "")

        })

    };

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
                                <div>
                                    <h4>Cantidad: {producto.CANTIDAD}</h4>
                                </div>
                                <CardProduct
                                    key={producto.ID_PRODUCTO}
                                    id={producto.ID_PRODUCTO}
                                    nombre={producto.N_PRODUCTO}
                                    precio={producto.PRECIOFINAL}
                                    foto={producto.IMAGEN}
                                    descripcion={producto.DESCRIPCION}
                                    estado={producto.ESTADO}
                                    mostrarBotonCompra={false}
                                    idComprador={idComprador}
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
