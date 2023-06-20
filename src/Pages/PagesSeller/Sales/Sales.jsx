import React from 'react';
import { useState,useEffect } from 'react';
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller"
import "./Styles/Sales.css"
import FileUploader from './Components/FileUploader.jsx'
import axios from 'axios';
import categories from "../Sales/Data/categories.jsx"
import {showAlertError, showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal.js"
import Cookies from 'js-cookie';
import {useNavigate} from "react-router-dom";

const userId = Cookies.get("id")

const Sales = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    id_vendedor:userId,
    n_producto: '',
    descripcion: '',
    precioBase: '',
    precioFinal: '',
    imagen: '',
    stock: '',
    marca: '',
    modelo: '',
    categoria: '',
    estado: '',
    fechaPublicacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
  });




  useEffect(() => {
    calcularPrecios(); // Calcular el precio Base cuando el valor de precio Final cambie
  }, [formData.precioFinal]);

  // Función para calcular los campos precioFinal y porcentajeFinalImpuesto
  const porcentajeImpuesto = 0.19; // 19% en decimal
  const porcentajeComision = 0.05; // 5% en decimal
  const calcularPrecios = () => {
    const precioFinal = parseFloat(formData.precioFinal);

    const precioConImpuestoDebitado = precioFinal*(1-porcentajeImpuesto);

    const precioConComisionDebitado = precioConImpuestoDebitado*(1-porcentajeComision);

    const precioBase = Math.round(precioConComisionDebitado);

    setFormData({ ...formData, precioBase: precioBase.toString() });
  };

  // Función para manejar el cambio en el campo "precioBase"
  const handlePrecioBaseChange = (e) => {
    const input = e.target.value;
    if (!isNaN(input)) {
      setFormData({ ...formData, precioFinal: input});
      calcularPrecios(); // Calcular los campos precioBase y porcentajeBaseImpuesto
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(process.env.REACT_APP_API+'/insertProduct', formData);
      showAlertSuccess("¡El producto ha sido registrado correctamente!", () => {
        navigate("/SellerProducts")
      })
    } catch (error) {
      showAlertError("El producto no ha sido registrado correctamente :(")
      console.error(error);
    }
  };
  // Función para calcular los campos precioFinal y porcentajeFinalImpuesto

  return (
    <div className='background'>
      <NavbarSeller />
      <br />
      <br />
      <h2>Identificación del producto</h2>
      <form onSubmit={handleSubmit} action="SignUp/SignUpSeller" typeof='control' className='formSeller'>
        <div className='card container DivNombre'>
          <label htmlFor="">Ingresa el nombre del producto</label>
          <input
          required
          className='inputEntry'
          type="text"
          placeholder='Nombre'
          value={formData.n_producto}
          onChange={(e) => setFormData({ ...formData, n_producto: e.target.value })}
          />
          <br />
          <label htmlFor="">Agrega una descripción del producto</label>
          <textarea
          required
          className=''
          type="text-area"
          placeholder='Descripción'
          value={formData.descripcion}
          onChange={(e) => setFormData({ ...formData, descripcion: e.target.value })}
          />
        </div>
        <br />
        <div className='card container DivCategoria'>
          <label htmlFor="">Ingresa la categoría del producto</label>
          <select value={formData.categoria} onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
          <br />
        </div>
        <br />
        <div className='card container DivInformacion'>
          <label htmlFor="">Coloca información sobre el producto</label>
          <input
          required
          className='inputEntry'
          type="text"
          placeholder='Modelo'
          value={formData.modelo}
          onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
          />
          <br />
          <label htmlFor="">Ingresa la marca del producto</label>
          <input
          required
          className='inputEntry'
          type="text"
          placeholder='Marca'
          value={formData.marca}
          onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
          />
          <br />
        </div>
        <br />
        <div className='card container DivCondicion'>
  <label htmlFor="">Selecciona la condición del producto</label>
  <select
    className='inputEntry'
    value={formData.estado}
    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
  >
    <option value="">Selecciona un estado</option>
    <option value="activo">ACTIVO</option>
    <option value="suspendido">INACTIVO</option>
  </select>
</div>
        <br />
        <div className='card container DivImg'>
          <h3>Información completa del producto</h3>
          {/*<FileUploader /> */}

          <label htmlFor="">Añade el enlace de una imagen del producto</label>
          <input
          className='inputEntry'
          type="text"
          placeholder='Ingresa el enlace'
          value={formData.imagen}
          onChange={(e) => setFormData({ ...formData, imagen: e.target.value })}
          required
          />
    <label htmlFor="">Cantidad a vender</label>
    <input
      required
      className='inputEntry'
      type="text"
      placeholder='Ingresa la cantidad'
      value={formData.stock}
      onChange={(e) => {
        const input = e.target.value;
        if (!isNaN(input)) {
          setFormData({ ...formData, stock: input });
        }
      }}
    />
    <label htmlFor="">Precio del producto</label>
    <input
    required
      className='inputEntry'
      type="text"
      placeholder='Agrega el precio final del producto'
      value={formData.precioFinal}
      onChange={(e) => {
        const input = e.target.value;
        if (!isNaN(input)) {
          setFormData({ ...formData, precioFinal: input });
        }
      }}
    />
       <br />
       <button type="submit" className='btn buttonProduct'>Añadir producto</button>
       </div>
       </form>
      </div>
  
  )
}
export default Sales