import './Styles/CardProduct.css';
import React, { useState } from 'react';

function CardProduct({ id,nombre, precio, foto, descripcion }) {
  const [agregadoCarrito, setAgregadoCarrito] = useState(false);

  const handleClick = () => {
    setAgregadoCarrito(!agregadoCarrito);
  }

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
          {agregadoCarrito ? 'Eliminar del carrito' : 'Comprar'}
        </button>
      </div>
    </div>
  );
}

export default CardProduct;
