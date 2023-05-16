// import React, { useState } from 'react';
// import ProductPopup from './productpopup';
import './Styles/Card.css';
import { useLocation,useNavigate } from 'react-router';

function Card({ nombre, precio, foto, descripcion }) {
  // const [isPopupOpen, setIsPopupOpen] = useState(false);

  // const handleCardClick = () => {
  //   setIsPopupOpen(true);
  // };

  // const handlePopupClose = () => {
  //   setIsPopupOpen(false);
  // };
  const navigate = useNavigate();
  const toOpen = ()=>{
    navigate("/Product"/*,{state:{toString:search}}*/)
  }

  return (
    <div className="CardProduct" onClick={toOpen} >
      <div className='product-image'> {/* onClick={handleCardClick}*/} 
        <img src={foto} alt={nombre} />
      </div>
      <div className='product-info'>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>
      {/* {isPopupOpen && (
        <ProductPopup
          nombre={nombre}
          precio={precio}
          foto={foto}
          descripcion={descripcion}
          onClose={handlePopupClose}
        />
      )} */}
    </div>
  );
}

export default Card;
