import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarAdmin from "../../../Components/Commons/NavbarAdmin/NavbarAdmin"
import "../ShoppersAdmin/Styles/ShoppersAdmin.css"
import Swal from 'sweetalert2'
const ShoppersAdmin = () => {
  const [shoppers, setShoppers] = useState([])
  const [searchedShopper, setSearchedShopper] = useState(null)



  useEffect(() => {
    fetchShoppers();
  }, []);

  const fetchShoppers = async () => {
      try {
        const response = await axios.get(process.env.REACT_APP_API+'/getallShoppers') 
        setShoppers(response.data)
      } catch (error) {
        console.error(error)
      }
    }
  
  const suspendShopper = async (compradorId) => {
    try {
      const result = await Swal.fire({
        title: '¿suspender comprador?',
        text: '¿Estás seguro de que deseas suspender a este comprador?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
      console.log("El id del vendedor en suspend es", compradorId);
      await axios.put(process.env.REACT_APP_API + '/suspendShopper',{ id_comprador: compradorId });
      const updatedShopper = { ...searchedShopper, ESTADO: 'suspendido' };
      setSearchedShopper(updatedShopper);
      fetchShoppers();
      
    }
    } catch (error) {
      console.error(error);
    }
  };

  const activateShopper = async (compradorId) => {
    try {
      const result = await Swal.fire({
        title: '¿activar comprador?',
        text: '¿Estás seguro de que deseas activar a este comprador?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
 
      console.log("El id del compradorId en active es", compradorId);
      await axios.put(process.env.REACT_APP_API + '/activateShopper',{ id_comprador: compradorId });
      const updatedShopper = { ...searchedShopper, ESTADO: 'activo' };
      setSearchedShopper(updatedShopper);
      fetchShoppers();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteShopper = async (compradorId) => {
    try {
    const result = await Swal.fire({
      title: '¿Eliminar comprador?',
      text: '¿Estás seguro de que deseas eliminar a este comprador?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
    }); if (result && result.isConfirmed) {
      console.log("El id del producto es", compradorId);
      await axios.delete(process.env.REACT_APP_API + "/deleteShopper", {data:{id_comprador: compradorId }});

      // Filtrar la lista de productos para quitar el producto eliminado
      const updatedShoppers = shoppers.filter((shopper) => shopper.id_comprador !== compradorId);
      setShoppers(updatedShoppers);
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
  results = shoppers;
} else {
  results = shoppers.filter((dato) =>
    dato.ID_COMPRADOR.toString().toLowerCase().includes(search.toLowerCase())
  );
}



  return (
    <div>
      <NavbarAdmin/>
      <h1>Compradores</h1>
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
                <th>ID Comprador</th>
                <th>Nombre y Apellido</th>
                <th>Email</th>
                <th>Teléfono</th>
                <th>Estado de cuenta</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
            {results.map(shopper => (
            <tr key={shopper.ID_COMPRADOR}>
              <td>{shopper.ID_COMPRADOR}</td>
              <td>{shopper.NOMBRE+" "+shopper.APELLIDO}</td>
              <td>{shopper.EMAIL}</td>
              <td>{shopper.TELEFONO}</td>
              <td>{shopper.ESTADO}</td>
              <td>
                  {shopper.ESTADO === 'activo' ? (
                    <button className='btn suspend' onClick={() => suspendShopper(shopper.ID_COMPRADOR)}>Suspender</button>
                  ) : (
                    <button className='btn btnActive' onClick={() => activateShopper(shopper.ID_COMPRADOR)}>Activar</button>
                  )}
                  <br />
                  <br />
                  <button className='btn delete' onClick={() => deleteShopper(shopper.ID_COMPRADOR)}>Eliminar</button>
                </td>
            </tr>
          ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ShoppersAdmin
