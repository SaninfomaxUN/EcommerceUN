import axios from 'axios';
import './Styles/CardProduct.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {showAlertSuccess ,showAlertError } from '../../../Components/Commons/Alerts/AlertsModal'


const addProductToCart = (idComprador, idProducto, newQuantity) =>{
  console.log(idComprador + "SIMBOLO")
  axios.post(process.env.REACT_APP_API +'/updateCart', {idProducto: idProducto, idComprador:idComprador,newQuantity:newQuantity})
  .then(res => {
      showAlertSuccess("Producto agregado correctamente.")
  })
  .catch(err => {
    showAlertError("Producto no agregado.")
  });
}


function CardProduct({ id, nombre, precio, foto, descripcion,quantity, agregarProducto, mostrarBotonCompra = true,idComprador }) {
  const [agregadoCarrito, setAgregadoCarrito] = useState(false);
  const navigate = useNavigate();

    const handleClick = () => {
      if (agregadoCarrito) {
        navigate('/Cart'); // Redirige a la página del carrito
      } else {
        setAgregadoCarrito(true);
        addProductToCart(idComprador,id,parseInt(quantity)+1) //api

      }

    };


  return (
    <div className="product-container">
      <div className='product-image'>
        <img src={foto} alt={nombre} />
      </div>
      <div className='product-info'>
        <h3 className='product-name'>{nombre}</h3>
        <p className='product-price'>Precio: ${precio}</p>
        <p className='product-description'>{descripcion}</p>
        <button onClick={handleClick}>
          {agregadoCarrito ? 'En el carrito' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
