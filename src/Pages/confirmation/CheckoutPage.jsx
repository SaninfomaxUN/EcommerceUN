import './CarritoPage.css';
import React, { useState } from 'react';
import Footer from '../../Components/Commons/Footer/Footer'
import '../../Components/Commons/Footer/Styles/Footer.css'


const CheckoutPage = () => {
  const json = {
    Cart: [
      {
        ID_COMPRADOR: '1000112233',
        LISTAPRODUCTOS: '3##1;;5##3;;6##3;;8##3',
        DESCUENTO: 0,
        COSTOPARCIAL: 13726967,
        COSTOFINAL: 13726967,
        CANTIDADTOTAL: 10,
      },
    ],
    Products: [
      {
        ID_PRODUCTO: 3,
        ID_VENDEDOR: '3242342321',
        N_PRODUCTO: 'Mouse gamer Logitech g203',
        DESCRIPCION:
          'El mouse gamer Logitech g203 es perfecto para aquellos que buscan precisión y velocidad en sus juegos. Con una velocidad de seguimiento de hasta 8,000 DPI y una tasa de informe de 1,000 Hz, este mouse te permitirá llevar tu juego al siguiente nivel.',
        PRECIOBASE: 121900,
        PRECIOFINAL: 149900,
        IMAGEN:
          'https://http2.mlstatic.com/D_NQ_NP_998265-MCO42038100864_062020-O.webp',
        STOCK: 45,
        MARCA: ' Logitech',
        MODELO: 'G203',
        CATEGORIA: 'Tecnologia',
        ESTADO: 'ACTIVO',
        FECHAPUBLICACION: '2023-05-22T05:00:00.000Z',
        CANTIDAD: '1',
        COSTOPACIAL: 149900,
      },
      {
        ID_PRODUCTO: 5,
        ID_VENDEDOR: '3242342321',
        N_PRODUCTO: 'RX 6700 XT',
        DESCRIPCION:
          'Gigabyte Tarjeta gráfica Radeon RX 6700 XT Eagle 12G, sistema de refrigeración WINDFORCE 3X, 12GB 192-bit GDDR6, tarjeta de video GV-R67XTEAGLE-12GD',
        PRECIOBASE: 1472000,
        PRECIOFINAL: 1839264,
        IMAGEN:
          'https://m.media-amazon.com/images/I/71jT1iWDXvL._AC_SL1500_.jpg',
        STOCK: 47,
        MARCA: 'Gigabyte',
        MODELO: 'RX 6700 XT',
        CATEGORIA: 'TEC',
        ESTADO: 'ACTIVO',
        FECHAPUBLICACION: '2023-06-06T05:00:00.000Z',
        CANTIDAD: '3',
        COSTOPACIAL: 5517792,
      },
      {
        ID_PRODUCTO: 6,
        ID_VENDEDOR: '3242342321',
        N_PRODUCTO: '7900X',
        DESCRIPCION:
          'AMD Ryzen™ 9 7900X 12 núcleos, procesador de escritorio desbloqueado de 24 hilos',
        PRECIOBASE: 1570000,
        PRECIOFINAL: 1961715,
        IMAGEN:
          'https://m.media-amazon.com/images/I/51xkaPM+p9L._AC_SX679_.jpg',
        STOCK: 40,
        MARCA: 'AMD',
        MODELO: '7900X',
        CATEGORIA: 'TEC',
        ESTADO: 'ACTIVO',
        FECHAPUBLICACION: '2023-06-06T05:00:00.000Z',
        CANTIDAD: '3',
        COSTOPACIAL: 5885145,
      },
      {
        ID_PRODUCTO: 8,
        ID_VENDEDOR: '3242342321',
        N_PRODUCTO: 'ViewSonic Omni VX2418C Monitor',
        DESCRIPCION:
          'ViewSonic Omni VX2418C Monitor curvado para juegos de 24 pulgadas 1080p 1ms 165Hz con AMD FreeSync Premium, cuidado de los ojos, HDMI y DisplayPort',
        PRECIOBASE: 580000,
        PRECIOFINAL: 724710,
        IMAGEN:
          'https://m.media-amazon.com/images/I/615ToWzuLHL._AC_SL1500_.jpg',
        STOCK: 14,
        MARCA: 'ViewSonic',
        MODELO: 'VX2418C',
        CATEGORIA: 'TEC',
        ESTADO: 'ACTIVO',
        FECHAPUBLICACION: '2023-06-06T05:00:00.000Z',
        CANTIDAD: '3',
        COSTOPACIAL: 2174130,
      },
    ],
    CreditCards: [
      {
        ID_TARJETA: '1234567890',
        NOMBRE_TARJETA: 'Visa',
        NUMERO_TARJETA: '**** **** **** 1234',
        VENCIMIENTO_TARJETA: '12/25',
      },
      {
        ID_TARJETA: '0987654321',
        NOMBRE_TARJETA: 'Mastercard',
        NUMERO_TARJETA: '**** **** **** 5678',
        VENCIMIENTO_TARJETA: '08/24',
      },
    ],
    Addresses: [
      {
        ID_DIRECCION: '111111',
        NOMBRE_DIRECCION: 'Casa',
        DIRECCION: 'Calle Principal 123',
        CIUDAD: 'Ciudad de Ejemplo',
        PAIS: 'País de Ejemplo',
      },
      {
        ID_DIRECCION: '222222',
        NOMBRE_DIRECCION: 'Trabajo',
        DIRECCION: 'Avenida Secundaria 456',
        CIUDAD: 'Ciudad de Ejemplo',
        PAIS: 'País de Ejemplo',
      },
    ],
  };
  const [selectedCreditCard, setSelectedCreditCard] = useState('');
  const [selectedAddress, setSelectedAddress] = useState('');

  const cartItem = json.Cart[0];

  const handleCreditCardChange = (event) => {
    setSelectedCreditCard(event.target.value);
  };

  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  return (
    <div className="checkout-page">
      <header>
        <nav className='navbar'>
          <div className='navbar-links'>
            <a href='/'>Inicio</a>
            <a href='/'>Seguir buscando</a>
            <a href='/Cart'>Mi Carrito</a>
          </div>
        </nav>
      </header>
      <div className="container">
        <div className="checkout-content">
          <div className="selectors-column">
            <div className="credit-card-selection">
              <h3>Seleccionar medio de pago.</h3>
              <select className="select-box" value={selectedCreditCard} onChange={handleCreditCardChange}>
                <option value="">Seleccionar tarjeta</option>
                {json.CreditCards.map((creditCard) => (
                  <option key={creditCard.ID_TARJETA} value={creditCard.ID_TARJETA}>
                    {creditCard.NOMBRE_TARJETA} - {creditCard.NUMERO_TARJETA}
                  </option>
                ))}
              </select>
            </div>
            <div className="address-selection">
              <h3>Seleccionar dirección de entrega</h3>
              <select className="select-box" value={selectedAddress} onChange={handleAddressChange}>
                <option value="">Seleccionar dirección</option>
                {json.Addresses.map((address) => (
                  <option key={address.ID_DIRECCION} value={address.ID_DIRECCION}>
                    {address.NOMBRE_DIRECCION} - {address.DIRECCION}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="product-list">
            <h3>Productos en el carrito</h3>
            {json.Products.map((product) => (
              <div key={product.ID_PRODUCTO} className="product-item">
                <h3>{product.N_PRODUCTO}</h3>
                <p>Precio: {product.PRECIOFINAL}</p>
              </div>
            ))}
          </div>
          <div className="summary-column">
            <div className="cart-summary">
              <h3>Resumen del Carrito</h3>
              <p>Cantidad total: {cartItem.CANTIDADTOTAL}</p>
              <p>Costo parcial: {cartItem.COSTOPARCIAL}</p>
              <p>Costo final: {cartItem.COSTOFINAL}</p>
              <button className="confirm-button">Finalizar compra</button>
            </div>
          </div>
        </div>
      </div>
      <Footer className="checkout-footer" />  
    </div>
  );
};

export default CheckoutPage;
