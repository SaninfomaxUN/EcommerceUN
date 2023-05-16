# Card Component
---

## **Aclaración:** 
*En esta documentación solo se hace mención del componente `Card.jsx` de manera nativa, unicamente teniendo en cuenta las cards, en el código del archivo `card.js` hay secciones del código que se encuentran comenntadas, esto es debido a una implementación experimental de una vista "popup" que resultó en incompatibilidades con los estilos hover de la clase card.*

---

El componente `Card.jsx` es utilizado para renderizar una tarjeta de producto en la interfaz de la aplicación.

## Propiedades

- `nombre` (string): El nombre del producto.
- `precio` (number): El precio del producto.
- `foto` (string): La URL/ruta de la imagen del producto.
- `descripcion` (string): La descripción del producto. *Para la implementación de las cards no es utilizada actualmente, está como parametro para la aplicación de la lógica de los "popup" (Que son experimentales*).

## Ejemplo de Uso

```jsx
import './card.css';

function Card({ nombre, precio, foto, descripcion }) {


  return (
    <div className="card" >
      <div className='product-image'> 
        <img src={foto} alt={nombre} />
      </div>
      <div className='product-info'>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
      </div>
    </div>
  );
}

export default Card;
```