import React from 'react';
import Producto from '../Product/Components/CardProduct';
import '../Cart/CarritoPage.css';
import { Link } from 'react-router-dom';

function CartPage({ carrito, eliminarDelCarrito }) {
  const calcularPrecioTotal = () => {
    let total = 0;
    carrito.forEach((producto) => {
      total += producto.precio;
    });
    return total;
  };

  const handleFinalizarCompra = () => {
    // Lógica para finalizar la compra
    console.log("Compra finalizada");
  };

  const handleEliminarDelCarrito = (producto) => {
    eliminarDelCarrito(producto);
  };

  return (
    <div className="carrito-page-container">
      <nav className="navbar">
        <Link to="/">Inicio</Link>
      </nav>
      <div className="precio-total-container">
        <p>Precio Total: ${calcularPrecioTotal()}</p>
        <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
      </div>
      <div className="grilla-container">
        {carrito.map((producto) => (
          <div key={producto.id}>
            <Producto
              nombre={producto.nombre}
              precio={producto.precio}
              foto={producto.foto}
              descripcion={producto.descripcion}
              mostrarBotonCompra={false} // No mostrar el botón de compra en la vista del carrito
            />
            <button onClick={() => handleEliminarDelCarrito(producto)}>Eliminar del Carrito</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CartPage;
