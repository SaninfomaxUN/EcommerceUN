import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarAdmin from "../../../Components/Commons/NavbarAdmin/NavbarAdmin";
import Swal from 'sweetalert2';
import "../SellersAdmin/Styles/SellersAdmin.css"

const SellersAdmin = () => {
  const [sellers, setSellers] = useState([]);
  const [searchedSeller, setSearchedSeller] = useState(null);
   


  useEffect(() => {
    fetchSellers();
  }, []);

  const fetchSellers = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API + '/getallsellers');
      setSellers(response.data);
    } catch (error) {
      console.error(error);
    }
  };


  const suspendSeller = async (vendedorId) => {
    try {
      const result = await Swal.fire({
        title: '¿suspender vendedor?',
        text: '¿Estás seguro de que deseas suspender a este vendedor?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
      console.log("El id del vendedor en suspend es", vendedorId);
      await axios.put(process.env.REACT_APP_API + '/suspendSeller',{ id_vendedor: vendedorId });
      const updatedSeller = { ...searchedSeller, ESTADO: 'suspendido' };
      setSearchedSeller(updatedSeller);
      fetchSellers();
      
    }
    } catch (error) {
      console.error(error);
    }
  };

  const activateSeller = async (vendedorId) => {
    try {
      const result = await Swal.fire({
        title: '¿activar vendedor?',
        text: '¿Estás seguro de que deseas activar a este vendedor?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
 
      console.log("El id del vendedor en active es", vendedorId);
      await axios.put(process.env.REACT_APP_API + '/activateSeller',{ id_vendedor: vendedorId });
      const updatedSeller = { ...searchedSeller, ESTADO: 'activo' };
      setSearchedSeller(updatedSeller);
      fetchSellers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteSeller = async (vendedorId) => {
    try {
      const result = await Swal.fire({
        title: '¿Eliminar vendedor?',
        text: '¿Estás seguro de que deseas eliminar a este vendedor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
        console.log("El id del vendedor en delete es", vendedorId);
        await axios.delete(process.env.REACT_APP_API + "/deleteSeller", { data: { id_vendedor: vendedorId } });

        const updatedSellers = sellers.filter((seller) => seller.ID_VENDEDOR !== vendedorId);
        setSellers(updatedSellers);
      }
    } catch (error) {
      console.error(error);
    }
  };



 
//método de filtrado
const [search, setSearch] = useState("");
const searcher =(e)=>{

  setSearch(e.target.value)
  console.log(e.target.value)
}

let results = [];
if (!search) {
  results = sellers;
} else {
  results = sellers.filter((dato) =>
    dato.ID_VENDEDOR.toString().toLowerCase().includes(search.toLowerCase())
  );
}

  return (
    <div>
      <NavbarAdmin />
      <h1>Vendedores</h1>
      <div>
        <input
          className='form-control'
          type="text"
          placeholder="Buscar por ID"
          value={search}
          onChange={searcher}
        />
     
      </div>
      <div>
        <table className='table'>
          <thead>
            <tr>
              <th>ID vendedor</th>
              <th>Nombre y Apellido</th>
              <th>Email</th>
              <th>Teléfono</th>
              <th>Estado de cuenta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {results.map((seller) => (
              <tr key={seller.ID_VENDEDOR}>
                <td>{seller.ID_VENDEDOR}</td>
                <td>{seller.NOMBRE + " " + seller.APELLIDO}</td>
                <td>{seller.EMAIL}</td>
                <td>{seller.TELEFONO}</td>
                <td>{seller.ESTADO}</td>
                <td>
                  {seller.ESTADO === 'activo' ? (
                    <button className='btn suspend' onClick={() => suspendSeller(seller.ID_VENDEDOR)}>Suspender</button>
                  ) : (
                    <button className='btn btnActive' onClick={() => activateSeller(seller.ID_VENDEDOR)}>Activar</button>
                  )}
                  <br />
                  <br />
                  <button className='btn delete' onClick={() => deleteSeller(seller.ID_VENDEDOR)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SellersAdmin;
