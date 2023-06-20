import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller.jsx"
import {CircularProgress} from "@mui/material";
import Stack from '@mui/material/Stack';
import "./Styles/Payments.css"
import data from "./responseSales.json"



const Payments = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

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
    fetchVentas();
  }, [userId]); 

  const fetchVentas = async () => {
    if (userId) {
      try {
        console.log("aaaaaaaaaa");
        const response = await axios.post(process.env.REACT_APP_API+'/getSales', { idVendedor: userId });
        setVentas(response.data);
        console.log(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } 
    }
  };

  return (
    <div>
       <br />
       <br />
       <NavbarSeller/>
        {/*loading ? (
          <CircularProgress color="success"/>
        ) : ( */}
          <div>
            <h2>Tus ventas</h2>
            { /* ventas.length === 0 ? (
              <p>No has realizado ventas. ¡Esperamos que ocurra pronto! ¡Aprovecha</p>
            ) : ( */}
                <div className = "sales-cards">
                  <Stack className='subtitle-stack' direction="row">
                    <h1 className='sub-titles-product-sell'>Nombre Producto</h1>
                    <h1 className='sub-titles-image-sell'>Imagen</h1>
                    <h1 className='sub-titles-quantity-sell'>Cantidad<br />Vendida</h1>
                    <h1 className='sub-titles-total-sell'>Total<br />Venta</h1>
                    <h1 className='sub-titles-profit'> Ganancia</h1>
                  </Stack>
                    <table className='sells-table'>
                      <tbody>
                        {ventas["Sales"]?.map((venta) => ( 
                          <tr key={venta["ID_PRODUCTO"]} className='sales-card'>
                            <td className='product-name-seller'>{venta["N_PRODUCTO"]}</td>
                            <td><img className='image-p-seller' src={venta["IMAGEN"]} alt="Producto"/></td>
                            <td className='quantity-seller'>{venta["TOTAL_VENDIDOS"]}</td>
                            <td className='total-sell-seller'>${venta["TOTAL_VENTAS"].toLocaleString()}</td>
                            <td className='profit-seller'>${venta["GANANCIAS"].toLocaleString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                </div>    
            {/* )} */}
          </div>
        {/* )} */}
    </div>
  );
}

export default Payments