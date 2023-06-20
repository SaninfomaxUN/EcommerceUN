import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import NavbarSeller from "../../../Components/Commons/NavbarSeller/NavbarSeller"
import "./Styles/SellerProduct.css"
import Swal from 'sweetalert2';
import categories from "../Sales/Data/categories.jsx"
import Dialog from '@mui/material/Dialog';
import {useNavigate} from "react-router-dom";
import {showAlertError, showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal.js"
import {Box} from "@mui/material";
import {CircularProgress} from "@mui/material";

const SellerProducts = () => {
  const [open, setOpen] = useState(false);
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [Idproducto, setIdproducto] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const navigate = useNavigate();
  const [originalData, setOriginalData] = useState({});

  useEffect(() => {
  const fetchUserId = async () => {
      try {
        const idVendedor = Cookies.get("id");
        setUserId(idVendedor);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUserId();
  }, []);

  const handleDelete = async (Idproducto) => {
    try {
        const result = await Swal.fire({
          title: '¿Eliminar producto?',
          text: '¿Estás seguro de que deseas eliminar este producto?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Cancelar',
        });
        if (result.isConfirmed) {
          await axios.delete(process.env.REACT_APP_API+"/deleteProduct", {data:{id_vendedor: userId, id_producto: Idproducto } });

          fetchProductos();
        }
      } catch (error) {
        console.error(error);
      }
    };

  useEffect(() => {
    fetchProductos();
  }, [userId, Idproducto]);

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

  const handleClose = () => {
      setOpen(false);
      setIdproducto(null);
    };

  const [formData, setFormData] = useState({
        id_vendedor:userId,
        id_producto:'',
        n_producto: '',
        descripcion: '',
        precioBase: '',
        precioFinal: '',
        imagen: '',
        stock: '',
        marca: '',
        modelo: '',
        categoria: '',
        estado: '',
        fechaPublicacion: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });

  useEffect(() => {
    calcularPrecios();
  }, [formData.precioBase]);

  const calcularPrecios = () => {
    const precioBase = parseFloat(formData.precioBase);
    const porcentajeImpuesto = 0.19; // 19% en decimal
    const porcentajeComision = 0.05; // 5% en decimal

    const impuesto = precioBase * porcentajeImpuesto;
    const precioConImpuesto = precioBase + impuesto;
    const comision = precioConImpuesto * porcentajeComision;
    const precioFinal = Math.round(precioConImpuesto + comision);

    setFormData({ ...formData, precioFinal: precioFinal.toString() });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
      const response = await axios.put(process.env.REACT_APP_API + '/updateProduct', formData);
      handleClose()
      showAlertSuccess("¡El producto ha sido editado correctamente!", () => {
          navigate("/SellerProducts")
      })

  } catch (error) {
      handleClose()
      showAlertError("El producto no ha sido editado correctamente :(")
      console.error(error);
  }
 };

 const handleOpen = (producto) => {
  console.log("el id en handleopen es:",producto)
  setOpen(true);
  setIdproducto(producto);
  setLoaded(true)
  getProductData(producto);
  };

  useEffect(() => {
    getProductData();
  },[]);

  const getProductData = async (idProducto) => {
    console.log("el id en SellerProduct es:", idProducto);
    if (idProducto !== undefined) {
      try {
        const response = await axios.get(process.env.REACT_APP_API + "/getProductData", {
          params: { id_producto: idProducto },
        });
        const productData = response.data;

          console.log("la data del producto es:",productData)
        setOriginalData(productData);
        setFormData(productData);
      } catch (error) {
        console.error(error);
      }
    }
  };



  const handleChange = e =>{
    const{name,value} = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]:value
    }))
  }


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
                <div><h3 className='titulo-completo'>{producto.N_PRODUCTO+"  "+producto.ESTADO}</h3>
                  <p className='precio'>Precio Base:$ {producto.PRECIOBASE}</p>
                  <p className='precio'>Precio:$ {producto.PRECIOFINAL}</p>
                  <p className='precio'>id: {producto.ID_PRODUCTO}</p>
                  </div>
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


{!loaded && <CircularProgress color="success"/>}
  {loaded &&
   <Dialog maxWidth ={"lg"} open={open} onClose={handleClose}>
   <div className="">
<Box>
    <Box display="flex" justifyContent="center" alignItems="center" className="BoxInside">
        <form onSubmit={handleSubmit} action="SignUp/SignUpSeller" typeof='control' className='formSeller'>
        <div className='card container '>
          <label htmlFor="">Ingresa el nombre del producto</label>
          <input
          required
          className='form-control'
          type="text"
          placeholder='nombre'
          name='n_producto'
          value={formData ? formData.n_producto : "" }
          onChange={handleChange}
          />
          <br />
          <label htmlFor="">Agrega una descripción del producto</label>
          <textarea
          required
          name='descripcion'
          className='form-control'
          type="text-area"
          placeholder='Descripción'
          value={formData ? formData.descripcion : "" }
          onChange={handleChange}
          />
        </div>
        <br />
        <div className='card container '>
          <label htmlFor="">Ingresa la categoría del producto</label>
          <select value={formData ? formData.categoria : "" } name="categoria"  onChange={handleChange}>
            <option value="">Selecciona una categoría</option>
            {categories.map((category) => (
              <option key={category.code} value={category.code}>
                {category.name}
              </option>
            ))}
          </select>
          <br />
        </div>
        <br />
        <div className='card container '>
          <label htmlFor="">Coloca información sobre el producto</label>
          <input
          required
         name="modelo"
          className='form-control '
          type="text"
          placeholder='Modelo'
          value={formData ? formData.modelo : "" }
          onChange={handleChange}
          />
          <br />
          <label htmlFor="">Ingresa la marca del producto</label>
          <input
          required
          className='form-control'
          type="text"
          placeholder='Marca'
          name='marca'
          value={formData ? formData.marca : "" }
          onChange={handleChange}
          />
          <br />
        </div>
        <br />
        <div className='card container '>
  <label htmlFor="">Selecciona la condición del producto</label>
  <select
    name='estado'
    className='form-control'
    value={formData ? formData.estado : "" }
    onChange={handleChange}
  >
    <option value="">Selecciona un estado</option>
    <option value="activo">activo</option>
    <option value="suspendido">suspendido</option>
  </select>
</div>
    <br />
    <div className='card container '>
      <h3>Información completa del producto</h3>

    <label htmlFor="">Añade el enlace de una imagen del producto</label>
    <input
    className='form-control'
    type="text"
    name="imagen"
    placeholder='Ingresa el enlace'
    value={formData ? formData.imagen : ""}
    onChange={handleChange}
    required
      />
    <label htmlFor="">Cantidad a vender</label>
    <input
    required
    className='form-control'
    type="text"
    name='stock'
    placeholder='Ingresa la cantidad'
    value={formData ? formData.stock : "" }
    onChange={handleChange}
    />
    <label htmlFor="">Precio del producto</label>
    <input
    required
    name="precioBase"
    className='form-control'
    type="text"
    placeholder='Agrega el precio base del producto'
    value={formData ? formData.precioBase : "" }
    onChange={handleChange}
    />
       <br />
       <button type="submit" open={open} className='btn buttonProduct'>Editar producto</button>
       </div>
       </form>
    </Box>
    </Box>
    </div>
    </Dialog>
    }
    <div>
    </div>
    </div>

  );
};

export default SellerProducts;