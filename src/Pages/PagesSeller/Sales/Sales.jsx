import React from 'react'

import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller"
import "./Styles/Sales.css"


import FileUploader from './Components/FileUploader.jsx'


const Sales = () => {


  
  return (
    <div>
       <NavbarSeller/>

      <br />
      <br />
      <h2> Identificación del producto</h2>

      <div className='card container DivNombre'>
              <label htmlFor="" >Ingresa el nombre del producto</label>
              <input className='inputEntry' type="text" placeholder='Nombre' />
        <br />

        <label htmlFor="" >Agrega una descripción del producto</label>
              <input className='inputEntry' type="text" placeholder='Descripción' />
       </div>


       <div className='card container DivCategoria'>
              <label htmlFor="" >Ingresa la categoria del producto</label>
              <input className='inputEntry' type="text" placeholder='Categoria' />
        <br />
       </div>
          <br />
       <div className='card container DivInformacion'>
        <label htmlFor="">Coloca información sobre el producto</label>
        <input className='inputEntry' type="text" placeholder='Modelo' />
          <br /> 
        <input  className='inputEntry' type="text" placeholder='Marca' />
        <br />
       </div>
       <br />
       
       <div className='card container DivCondicion'>
        <label htmlFor="">Selecciona la condición del producto</label>
          <input  className='inputEntry' type="text" />
       </div>
       <br />

<div className='card container DivImg'>
<h3>Información completa del producto</h3>

<FileUploader/>


<div id='preview'></div>


<label htmlFor="">Cántidad a vender</label>
    <input  className='inputEntry' type="text" placeholder='ingresa la cántidad ' />
      
    <label htmlFor="">Precio del producto</label>
    <input  className='inputEntry' type="text" placeholder='agrega el precio base del producto ' />
       
      
       <br />
       </div>
      </div>
  )
}

export default Sales