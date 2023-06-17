import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import "./Styles/Mypurchases.css"

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
        const response = await axios.post(process.env.REACT_APP_API+"/getOrders", { idComprador: userId });
        setCompras(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
    <br/>
    <NavbarShopper />

      AQUI VA EL LOADING
        
      <div>
          <h2>Tus compras</h2>
          aqui va el sin compras

            <div className="purchase-cards">
              {compras.map((pedido) => (
                <div key={pedido["ID_PEDIDO"]} className="purchase-card">
                  <div><h3 className='Date-time'>{pedido["FECHAPEDIDO"]}</h3></div>
                  {pedido["ListadoProductos"].map((producto) => (
                    <div key={producto["ID_LISTPEDIDO"]} className="product-show">
                      <div>
                        <div><h3 className=''/></div>
                      </div>


                    </div>
                  
                    
                  
                  ))}
                  <div>
                    <h3 className='ID'>id: {pedido["ID_COMPRADOR"]}</h3>
                  </div>

                  <div><img className='image' src={pedido["IMAGEN"]} /></div>
                  
                             
                </div>
              ))}
            </div>
           parentesis corchete sin compras    
      </div>
     AQUI VA PARENTESIS CORCHETE PARA EL LOADING
    </div>
  );
}

export default MyPurchases