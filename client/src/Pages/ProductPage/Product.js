import React from "react";

export default function Product(props) {
  return (
    <div className="card cardDeslice">
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p>
        <button className="buttonProduct">Añadir al carrito</button>
      </p>
    </div>
  );
}