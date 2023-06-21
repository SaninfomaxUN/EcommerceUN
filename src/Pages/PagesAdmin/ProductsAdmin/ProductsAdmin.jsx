import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import "../ProductsAdmin/Styles/ProuctsAdmin.css"
import NavbarAdmin from "../../../Components/Commons/NavbarAdmin/NavbarAdmin"




const ProductsAdmin = () => {
  const [products, setProducts] = useState([])
  const [searchedProduct, setSearchedProduct] = useState(null);
  
  const fetchProducts = async () => {
    try {
      const response = await axios.get(process.env.REACT_APP_API+'/getAllProducts') 
      setProducts(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchProducts()
  })

  const suspendProduct = async (productoId) => {
    try {
      const result = await Swal.fire({
        title: '¿suspender producto?',
        text: '¿Estás seguro de que deseas suspender a este producto?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
      console.log("El id del producto en suspend es", productoId);
      await axios.put(process.env.REACT_APP_API + '/suspendProduct',{ id_producto: productoId });
      const updatedProduct = { ...searchedProduct, ESTADO: 'INACTIVO' };
      setSearchedProduct(updatedProduct);
      fetchProducts();
      
    }
    } catch (error) {
      console.error(error);
    }
  };

  const activateProduct = async (productoId) => {
    try {
      const result = await Swal.fire({
        title: '¿activar producto?',
        text: '¿Estás seguro de que deseas activar a este producto?',
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
      if (result.isConfirmed) {
 
      console.log("El id del producto en active es", productoId);
      await axios.put(process.env.REACT_APP_API + '/activateProduct',{ id_producto: productoId });
      const updatedProduct = { ...searchedProduct, ESTADO: 'ACTIVO' };
      setSearchedProduct(updatedProduct);
      fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      // Realizar la petición DELETE para eliminar un producto
      const result = await Swal.fire({
        title: '¿Eliminar producto?',
        text: '¿Estás seguro de que deseas eliminar este producto?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
      });
  
      if (result && result.isConfirmed) {
        console.log("El id del producto es", productId);
        await axios.delete(process.env.REACT_APP_API + "/deleteProduct2", {data:{id_producto: productId }});
  
        // Filtrar la lista de productos para quitar el producto eliminado
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
      }
    } catch (error) {
      console.error(error);
    }
  };

const [search, setSearch] = useState("");
const searcher =(e)=>{
  setSearch(e.target.value)
  console.log(e.target.value)
}

//método de filtrado
let results = [];
if (!search) {
  results = products;
} else {
  results = products.filter((dato) =>
    dato.ID_PRODUCTO.toString().toLowerCase().includes(search.toLowerCase())
  );
}

return (
<>
<NavbarAdmin/>
      <h1>Productos</h1>
<div>
        <input
        className='form-control'
        type="text"
        placeholder="Buscar por ID"
        value={search}
        onChange={searcher}
        />
</div>


      <table className='table'>
        <thead>
          <tr>
            <th>ID Producto</th>
            <th>Nombre Producto</th>
            <th>Precio Base</th>
            <th>Categoría</th>
            <th>Estado del producto</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {results.map((product) => (
            <tr key={product.ID_PRODUCTO}>
              <td>{product.ID_PRODUCTO}</td>
              <td>{product.N_PRODUCTO}</td>
              <td>{product.PRECIOBASE}</td>
              <td>{product.CATEGORIA}</td>
              <td>{product.ESTADO}</td>
              <td>
                  {product.ESTADO === 'ACTIVO' ? (
                    <button className='btn suspend' onClick={() => suspendProduct(product.ID_PRODUCTO)}>Suspender</button>
                  ) : (
                    <button className='btn btnActive' onClick={() => activateProduct(product.ID_PRODUCTO)}>Activar</button>
                  )}
                  <br />
                  <br />
                  <button className='btn delete' onClick={() => deleteProduct(product.ID_PRODUCTO)}>Eliminar</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}

export default ProductsAdmin
