import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import "./Styles/Mypurchases.css"
import {CircularProgress} from "@mui/material";
import Stack from '@mui/material/Stack';


const MyPurchases = () => {
  const [compras, setCompras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [id_product, setIdProduct] = useState(null);

  useEffect(() => {
    // Lógica para obtener el ID del usuario autenticado y establecerlo en el estado
    const fetchUserId = async () => {
      try {
        // Aquí puedes realizar la solicitud o acción necesaria para obtener el ID del usuario autenticado
        const idComprador = Cookies.get("id");
        setUserId(idComprador);
        console.log(idComprador);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    fetchCompras();
  }, [userId, id_product]); 

  const fetchCompras = async () => {
    if (userId) {
      try {
        const response = await axios.post(process.env.REACT_APP_API+"/getAllOrders", { idComprador: userId });
        setCompras(response.data);
        setLoading(false);
        //console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const columns = [
  <h2 className='sub-titles-quantity'>Cantidad</h2>,
  <h2 className='sub-titles-image'>Imagen</h2>,
  <h2 className='sub-titles-product'>Producto</h2>,
  <h2 className='sub-titles-basePrice'>Precio Base</h2>,
  <h2 className='sub-titles-Final'>Precio Final</h2>
  ]

  return (
    <div>
    <br/>
    <NavbarShopper />

      {loading ? (
        <CircularProgress color="success"/>
      ) : (
        
      <div>
          <h2>Tus compras</h2>
          {compras.length === 0 ? (
            <p>No has realizado compras. ¡Aprovecha las ofertas!</p>
          ) : (
            <div className="purchase-cards">
              {compras["Orders"].map((pedido) => (
                <div key={pedido["ID_PEDIDO"]} className="purchase-card">
                  <div>
                    <Stack className='stack-1' direction="row">
                      <h1 className='ID-purchase'>Pedido #{pedido["ID_PEDIDO"]}</h1>
                      <h1 className='date-time'>Fecha: {pedido["FECHAPEDIDO"].substring(0,10)}</h1>
                      <h1 className='total-value'>Total: ${pedido["TOTAL"].toLocaleString()}</h1>
                    </Stack>
                  </div>
                  <Stack className='stack-2' direction='row'>
                      <h2 className='sub-titles-quantity'>Cantidad</h2>
                      <h2 className='sub-titles-image'>Imagen</h2>
                      <h2 className='sub-titles-product'>Producto</h2>
                      <h2 className='sub-titles-basePrice'>Precio Base</h2>
                      <h2 className='sub-titles-Final'>Precio Final</h2>
                    </Stack>
                  <table className='product-table' >
                    <tbody>
                      {pedido["ListadoProductos"].map((producto) => (
                        <tr key={producto["ID_LISTPEDIDO"]} className="product-show">
                          <td className='quantity'>{producto["CANTIDAD"]}</td>
                          <td><img className='image' src={producto["Producto"]["IMAGEN"]} alt="Producto" /></td>
                          <td className='product-name'>{producto["Producto"]["N_PRODUCTO"].substring(0,30)}</td>
                          <td className='base-price'>${producto["Producto"]["PRECIOBASE"].toLocaleString()}</td>
                          <td className='final-price'>${producto["Producto"]["PRECIOFINAL"].toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                                      
                </div>
              ))}
            </div>
           )}
      </div>
     )}
    </div>
  );
}

export default MyPurchases