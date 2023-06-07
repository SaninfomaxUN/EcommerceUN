import '../Styles/Inventario.css';
import InvBox from './InvBox.js';
import React, { useState } from 'react';

// const getInventario = (idProducto, setProduct, setLoaded, navigate) => {
//   let product
//   axios.post(process.env.REACT_APP_API +'/getProduct', {idProducto: idProducto})
//       .then(res => {
//           setLoaded(true)
//           setProduct(res.data[0])
//       })
//       .catch(err => {
//           navigate("/*")
//       });
//   return product
// };

function Inventario(id,nombre, foto, unidades) {
  return (
    <div className='Inventario'>
      <div className='contenedor-principal'>
        <h1>Mis Productos</h1>
        <hr className='head_line'/>
        <InvBox
          producto='Bandeja de Novedad de Cubitos de Hielo'
          unidades='10'
          imagen='icecube'/>
        <InvBox
          producto='Herramienta de Cocina - Sacacorchos Abrebotellas'
          unidades='20'
          imagen='cork'/>
        <InvBox 
          producto='Juguete de Peluche - Peluche de Llama'
          unidades='5'
          imagen='llama'/>
        {/* <InvBox
          producto={product.nombre}
          unidades={product.unidades}
          imagen={product.foto}/> */}        
      </div>
    </div>
  );
}

export default Inventario;
