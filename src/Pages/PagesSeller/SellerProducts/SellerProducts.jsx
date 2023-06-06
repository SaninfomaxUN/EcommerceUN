import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller"
import "./Styles/SellerProduct.css"
import Swal from 'sweetalert2';
import Edit from './Modal/Edit';
import {showAlertError, showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal.js"
import categories from "../Sales/Data/categories.jsx"
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Dialog from '@mui/material/Dialog';

const SellerProducts = () => {
  const [open, setOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [id_product, setIdProduct] = useState(null);

  useEffect(() => {
    // Lógica para obtener el ID del usuario autenticado y establecerlo en el estado
    const fetchUserId = async () => {
      try {
        // Aquí puedes realizar la solicitud o acción necesaria para obtener el ID del usuario autenticado
        const idVendedor = Cookies.get("id");
        setUserId(idVendedor);
        console.log(idVendedor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchProductos();
  }, [userId, id_product]); // Agrega id_product como dependencia
  
   
    const handleDelete = async (productId) => {
      try {
        // Mostrar la alerta de confirmación
        const result = await Swal.fire({
          title: '¿Eliminar producto?',
          text: '¿Estás seguro de que deseas eliminar este producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
          console.log("El id del vendedor es", userId)
          console.log("El id del producto es", productId)
          await axios.delete(process.env.REACT_APP_API+"/deleteProduct", { data: { id_vendedor: userId, id_producto: productId } });
  
          fetchProductos();
        }
      } catch (error) {
        console.error(error);
      }
    };

const fetchProductos = async () => {
      if (userId) {
        try {
          const response = await axios.post(process.env.REACT_APP_API+"/getSellerProducts", { id_vendedor: userId });
          setProductos(response.data);
          setLoading(false);
        } catch (error) {
          console.error(error);
        }
      }
    };

    const handleOpen = (id_product) => {
      setOpen(true);
      setIdProduct(id_product);
    };
    
    const handleClose = () => {
      setOpen(false);
      setIdProduct(null); // Restablece el valor de id_product a null para que el efecto se dispare nuevamente cuando se edite otro producto
    };
  return (
    <div>
    <br/>
    <NavbarSeller />
      {loading ? (
        <p>Cargando productos...</p>
      ) : (
        <div>
          <h2>Tus productos a la venta</h2>

          {productos.length === 0 ? (
            <p>No tienes productos registrados</p>
          ) : (
            <div className="product-cards">
              {productos.map((producto) => (
                <div key={producto.ID_PRODUCTO} className="product-card">
                  <div><img className='image' src={producto.IMAGEN} alt={producto.N_PRODUCTO} /></div>
                  <div>  <h3 className='titulo-completo'>{producto.N_PRODUCTO+"  "+producto.ESTADO}</h3>
                  <p className='precio'>Precio Base:$ {producto.PRECIOBASE}</p>
                  {/* <p>Descripción: {producto.DESCRIPCION}</p> */}
                  <p className='precio'>Precio:$ {producto.PRECIOFINAL}</p></div>
                <div>
                   <button className=" btn edit" onClick={() => handleOpen(producto.ID_PRODUCTO)}>Editar</button>
                   <br />
                   <br />
                   <button  className='btn delete' onClick={() => handleDelete(producto.ID_PRODUCTO)}>Eliminar</button>
                </div>
                <br />
                 <br />
                   </div>
              ))}
            </div>
          )}
        </div>
      )}
   <Dialog maxWidth ={"lg"} open={open} onClose={handleClose}>
          {id_product && <Edit id_product={id_product} />}
    </Dialog>
      <div>
      
      </div>
    </div>
  );
};

export default SellerProducts;