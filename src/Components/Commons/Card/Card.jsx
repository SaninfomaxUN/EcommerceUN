// import React, { useState } from 'react';
// import ProductPopup from './productpopup';
import './Styles/Card.css';
import { useLocation,useNavigate } from 'react-router';

function Card({ id,nombre, precio, foto, descripcion }) {

  const navigate = useNavigate();
  const toOpen = ()=>{
    navigate(`/Product/${nombre+"$$"+id}`/*,{state:{toString:search}}*/)
  }

  return (
    <div className="CardProduct" onClick={toOpen} >
      <div className='product-image'> 
        <img src={foto} alt={nombre} />
      </div>
      <div className='product-info'>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>

    </div>
  );
}

export default Card;
