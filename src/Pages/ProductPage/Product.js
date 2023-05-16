import React from "react";
import { Link, NavLink  } from "react-router-dom";

export default function Product(props) {
  return (
    <div className="card cardDeslice">
      <img className="product--image" src={props.url} alt="product image" />
      <h2>{props.name}</h2>
      <p className="price">{props.price}</p>
      <p>{props.description}</p>
      <p> 
        <NavLink to='/SeeProduct'>
          <button className="buttonProduct">Ver producto</button>
        </NavLink>
      </p>
    </div>
  );
}