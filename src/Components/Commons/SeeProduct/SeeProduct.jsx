import React from 'react';
import { NavLink } from 'react-router-dom'
import "./Styles/SeeProduct.css"
import { productData } from '../../../Pages/Home/Data/Offers/data';

export const SeeProduct = ({ imageurl, name, description, price, score }) => {
  return (
    <div className="card">
      <img src={imageurl} alt={name} className="producto-imagen" />
      <h2 className="producto-nombre">{name}APPLEWATCH NEGRO</h2>
      <p className="producto-descripcion">{description}Reloj inteligente negro de la marca Apple, trae elegancia y frescura a tu muñeca para que lo lleves donde estes.</p>
      <p className="producto-precio">${price}144.000</p>
      <button className="producto-puntaje">{score} O</button>
      <button className="agregar-carrito">Añadir al carrito</button>
    </div>
  );

};

export default SeeProduct;