import React, { useEffect, useState } from 'react'
import Cookies from 'js-cookie';
import axios from 'axios';
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller.jsx"
import {CircularProgress} from "@mui/material";
import Stack from '@mui/material/Stack';
import "./Styles/Payments.css"



const Payments = () => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);  
  const imagenUso = "https://pm1.aminoapps.com/6337/8df71229ab2e947c0ab6ddff9513944e1834503b_00.jpg"

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
        const response = await axios.post(process.env.REACT_APP_API+"/getAllSells", { idVendedor: userId });
        setVentas(response.data);
        setLoading(false);
        //console.log(response.data);
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
                <div className = "sells-cards">

                  <Stack className='subtitle-stack' direction="row">
                    <h1 className='sub-titles-product-sell'>Nombre Producto</h1>
                    <h1 className='sub-titles-image-sell'>Imagen</h1>
                    <h1 className='sub-titles-quantity-sell'>Cantidad<br />Vendida</h1>
                    <h1 className='sub-titles-total-sell'>Total<br />Venta</h1>
                    <h1 className='sub-titles-profit'> Profit</h1>
                  </Stack>

                  <table className='sells-table'>
                    <tbody>
                      <tr>
                        <td><h1 className='product-name-seller'>MOUSE GAMER XTZ abcdefghijk lmnñopqrs tuv wxy zzz</h1></td>
                        <td><img className='image-p-seller' src={imagenUso} alt="Producto"/></td>
                        <td><h1 className='quantity-seller'>2</h1></td>
                        <td><h1 className='total-sell-seller'>$150.900</h1></td>
                        <td><h1 className='profit-seller'>$60.000</h1></td>
                      </tr>
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