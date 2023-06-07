import React from 'react';
import '../Styles/InvBox.css';

function InvBox(props){
  return(
    <div className='contenedor-producto'>
      <img
        className='imagen-producto'
        src={require(`../Assets/image_${props.imagen}.jpg`)}
        //src={foto} - For when actual link-based images are implemented
        alt='Foto de Producto'/>        
      <div className='caja-producto'>
        <p className='nombre-producto'>{props.producto}</p>
        <p className='unid-disp'>Unidades Disponibles: {props.unidades}</p>
      </div>
      <div className='botones'>
        <p className='boton-editar'>Editar Listado</p>
        <p className='boton-eliminar'>Eliminar Listado</p>
      </div>
      <hr className='h_line'/>
    </div>
  );
}

export default InvBox;