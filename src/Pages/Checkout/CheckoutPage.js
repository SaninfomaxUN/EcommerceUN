import './Styles/CheckoutPage.css';
import React, {useEffect, useState} from 'react';
import Footer from '../../Components/Commons/Footer/Footer'
import '../../Components/Commons/Footer/Styles/Footer.css'
import {CircularProgress} from "@mui/material";
import axios from "axios";
import Cookies from "js-cookie";
import {showAlertInfo, showAlertSuccessImage} from "../../Components/Commons/Alerts/AlertsModal";
import {useNavigate} from "react-router";
const {formatToCurrency} = require("../../../src/Components/Commons/Formatters/Currency");


const getCart = (idComprador,setCartData, setProducts, navigate)  => {
    axios.post(process.env.REACT_APP_API +'/getCart', {idComprador: idComprador})
        .then(res => {
            if(res.data["Cart"][0]["CANTIDADTOTAL"]!== 0){
                setCartData(res.data["Cart"][0])
                setProducts(res.data["Products"])
            }else{
                showAlertInfo("Tu Carrito de Compras se encuentra vacío!!", navigate("/"))
            }

        })
        .catch(err => {
            console.log("No hay productos -- Devolver")
        });
}

const getAddresses = (idComprador,setAddresses,navigate)  => {
    axios.post(process.env.REACT_APP_API +'/getAllAddresses', {idComprador: idComprador})
        .then(res => {
            setAddresses(res.data["Addresses"])
        })
        .catch(err => {
            showAlertInfo("No tienes Direcciones de envío registradas!!", navigate("/"))
            console.log("No hay Direcciones-- Devolver")
        });
}

const getPaymentMehtods = (idComprador,setPaymentMehtods,navigate)  => {
    axios.post(process.env.REACT_APP_API +'/getAllPaymentMethods', {idComprador: idComprador})
        .then(res => {
            setPaymentMehtods(res.data["PaymentMethods"])
        })
        .catch(err => {
            showAlertInfo("No tienes Métodos de Pago registrados!!", navigate("/PaymentMethods"))
            console.log("No hay Metodos de Pago-- Devolver")
        });
}



const CheckoutPage = () => {
    const idComprador = Cookies.get("id")
    const navigate = useNavigate();

    const [loaded, setLoaded] = useState(false);

    const [cartData, setCartData] = useState([]);
    const [products, setProducts] = useState([]);

    const [paymentMethods, setPaymentMethods] = useState([]);
    const [selectedPaymentMehtod, setSelectedPaymentMehtod] = useState('');

    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState('');

    useEffect(() => {
        getCart(idComprador, setCartData, setProducts, navigate)
        getAddresses(idComprador, setAddresses, navigate)
        getPaymentMehtods(idComprador, setPaymentMethods,navigate)

        setLoaded(true)
    },[]);


    const handlePaymentMethodsChange = (event) => {
        setSelectedPaymentMehtod(event.target.value);
        console.log(event.target.value)
    };

    const handleAddressChange = (event) => {
        setSelectedAddress(event.target.value);
        console.log(event.target.value)
    };

    const insertOrder = async () => {
        await axios.post(process.env.REACT_APP_API + '/insertOrder', {idComprador: idComprador, idDireccion: selectedAddress, idMetodoPago: selectedPaymentMehtod})
            .then(res => {
                console.log(res)
                showAlertSuccessImage(res.data["message"], navigate("/"), "Revisa tu Correo Electrónico. Alli enviaremos el Comprobante de Pago!",
                    "https://cdn.pixabay.com/photo/2021/02/11/11/30/computer-6005017_1280.png", 350,200, "")
            })
            .catch(err => {
                console.log(err)
            });

    }

    const handleFinishOrder = () => {
        if(selectedPaymentMehtod===""){
            showAlertInfo("Por favor selecciona un Método de Pago!")
        }else if(selectedAddress===""){
            showAlertInfo("Por favor selecciona una Dirección!")
        }else{
            insertOrder().then(r => {})
        }
    }

    return (
        <div>
            {!loaded && <CircularProgress color="success"/>}
            {loaded &&
            <div className="checkout-page">
                <header>
                    <nav className='navbar'>
                        <div className='navbar-links'>
                            <a href='/'>Inicio</a>
                            <a href='/'>Seguir buscando</a>
                            <a href='/Cart'>Mi Carrito</a>
                        </div>
                    </nav>
                </header>
                <div className="container">
                    <div className="checkout-content">
                        <div className="selectors-column">
                            <div className="credit-card-selection">
                                <h3>Seleccionar medio de pago.</h3>
                                <select className="select-box" value={selectedPaymentMehtod}
                                        onChange={handlePaymentMethodsChange}>
                                    <option value="">Seleccionar tarjeta</option>
                                    {paymentMethods.map((creditCard) => (
                                        <option key={creditCard["ID_METODOPAGO"]} value={creditCard["ID_METODOPAGO"]}>
                                            {creditCard["NOMBRETITULAR"]} - {creditCard["NUMEROTARJETA"].slice(-4)}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="address-selection">
                                <h3>Seleccionar dirección de entrega</h3>
                                <select className="select-box" value={selectedAddress} onChange={handleAddressChange}>
                                    <option value="">Seleccionar dirección</option>
                                    {addresses.map((address) => (
                                        <option key={address["ID_DIRECCION"]} value={address["ID_DIRECCION"]}>
                                            {address["DESCRIPCION"]} - {address["DIRECCION"]}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="product-list">
                            <h3>Productos en el carrito</h3>
                            {products.map((product) => (
                                <div key={product["ID_PRODUCTO"]} className="product-item">
                                    <h3>{product["N_PRODUCTO"]}</h3>
                                    <p>Precio C/U: {formatToCurrency(product["PRECIOFINAL"])}</p>
                                    <p>Cantidad: {product["CANTIDAD"]}</p>
                                </div>
                            ))}
                        </div>
                        <div className="summary-column">
                            <div className="cart-summary">
                                <h3>Resumen de Compra</h3>
                                <br/>
                                <p>Total de Artículos: {cartData["CANTIDADTOTAL"]}</p>
                                <p>SubTotal: {formatToCurrency(cartData["COSTOPARCIAL"])}</p>
                                <p>Descuento: {formatToCurrency(cartData["DESCUENTO"])}</p>
                                <p><strong>Total:</strong> {formatToCurrency(cartData["COSTOFINAL"])}</p>
                                <button className="confirm-button third" onClick={handleFinishOrder} >Finalizar compra</button>
                            </div>
                        </div>
                    </div>
                </div>
                <template id='my-template'>
                    <swal-title>Podddd</swal-title>
                </template>
                <Footer className="checkout-footer"/>
            </div>}
        </div>
    );
};

export default CheckoutPage;
