import axios from 'axios';
import './Styles/CardProduct.css';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {showAlertSuccess, showAlertError} from '../../../Components/Commons/Alerts/AlertsModal'
import ValidationAlertStatic from "../../../Components/Commons/Validations/ValidationAlertStatic";


const addProductToCart = (idComprador, idProducto, newQuantity) => {
    console.log(idComprador + "SIMBOLO")
    axios.post(process.env.REACT_APP_API + '/updateCart', {
        idProducto: idProducto,
        idComprador: idComprador,
        newQuantity: newQuantity
    })
        .then(() => {
            showAlertSuccess("Producto agregado correctamente.")
        })
        .catch(() => {
            showAlertError("Producto no agregado.")
        });
}


function CardProduct({id, nombre, precio, foto, descripcion, estado, mostrarBotonCompra, idComprador}) {
    const [agregadoCarrito, setAgregadoCarrito] = useState(false);
    const [openValidation] = React.useState(estado !== "ACTIVO");
    const navigate = useNavigate();

    const handleClick = () => {
        if (agregadoCarrito) {
            navigate('/Cart'); // Redirige a la página del carrito
        } else {
            setAgregadoCarrito(true);
            addProductToCart(idComprador, id, 1) //api

        }

    };


    return (
        <div>
            <div className="product-container">

                <div className='product-image'>
                    <img src={foto} alt={nombre}/>
                </div>
                <div className='product-info'>
                    <h3 className='product-name'>{nombre}</h3>
                    <p className='product-price'>Precio: ${precio}</p>
                    <p className='product-description'>{descripcion}</p>


                    {!openValidation && mostrarBotonCompra && <button onClick={handleClick}>
                        {agregadoCarrito ? 'En el carrito' : 'Comprar'}
                    </button>}
                    <div>
                        {openValidation &&
                            <ValidationAlertStatic openValidation={openValidation}
                                                   messageValidation={"El producto ya NO se encuentra disponible :("}
                                                   severity={"warning"}/>}
                    </div>
                </div>

            </div>

        </div>
    );
}

export default CardProduct;
