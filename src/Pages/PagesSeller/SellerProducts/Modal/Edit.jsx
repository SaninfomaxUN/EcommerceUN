import React, {useRef, useState, useEffect} from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import {Box} from "@mui/material";
import Stack from '@mui/material/Stack';
import {TextField} from '@mui/material';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import Cookies from 'js-cookie';
import categories from '../../Sales/Data/categories';
import "./Edit.css"
import {showAlertError, showAlertSuccess} from "../../../../Components/Commons/Alerts/AlertsModal.js"


function Edit({id_product, onClose}) {
    const navigate = useNavigate();
    const userId = Cookies.get("id")
    const [formData, setFormData] = useState({
        id_vendedor: userId,
        id_product: id_product,
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
        calcularPrecios(); // Calcular el precio final cuando el valor de precioBase cambie
    }, [formData.precioBase]);

    const porcentajeImpuesto = 0.19; // 19% en decimal
    const porcentajeComision = 0.05; // 5% en decimal

    // Función para calcular los campos precioFinal y porcentajeFinalImpuesto
    const calcularPrecios = () => {

        const precioFinal = parseFloat(formData.precioFinal);

        const precioConImpuestoDebitado = precioFinal*(1-porcentajeImpuesto);

        const precioConComisionDebitado = precioConImpuestoDebitado*(1-porcentajeComision);

        const precioBase = Math.round(precioConComisionDebitado);

        setFormData({ ...formData, precioBase: precioBase.toString() });
    };
    // Función para manejar el cambio en el campo "precioFinal"
    const handlePrecioBaseChange = (e) => {
        const input = e.target.value;
        if (!isNaN(input)) {
            setFormData({...formData, precioFinal: input});
            calcularPrecios(); // precioBase y porcentajeBaseImpuesto
        }
    };


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
        onClose()
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(process.env.REACT_APP_API + '/updateProduct', formData);
            console.log(response.data);
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

    useEffect(() => {
        calcularPrecios(); // Calcular el precio Base cuando el valor de precio Final cambie
    }, [formData.precioFinal]);

    return (
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
                                placeholder='Nombre'
                                value={formData.n_producto}
                                onChange={(e) => setFormData({...formData, n_producto: e.target.value})}
                            />
                            <br/>
                            <label htmlFor="">Agrega una descripción del producto</label>
                            <textarea
                                required
                                className=''
                                type="text-area"
                                placeholder='Descripción'
                                value={formData.descripcion}
                                onChange={(e) => setFormData({...formData, descripcion: e.target.value})}
                            />
                        </div>
                        <br/>
                        <div className='card container '>
                            <label htmlFor="">Ingresa la categoría del producto</label>
                            <select value={formData.categoria}
                                    onChange={(e) => setFormData({...formData, categoria: e.target.value})}>
                                <option value="">Selecciona una categoría</option>
                                {categories.map((category) => (
                                    <option key={category.code} value={category.code}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <br/>
                        </div>
                        <br/>
                        <div className='card container '>
                            <label htmlFor="">Coloca información sobre el producto</label>
                            <input
                                required

                                className='form-control '
                                type="text"
                                placeholder='Modelo'
                                value={formData.modelo}
                                onChange={(e) => setFormData({...formData, modelo: e.target.value})}
                            />
                            <br/>
                            <label htmlFor="">Ingresa la marca del producto</label>
                            <input
                                required
                                className='form-control'
                                type="text"
                                placeholder='Marca'
                                value={formData.marca}
                                onChange={(e) => setFormData({...formData, marca: e.target.value})}
                            />
                            <br/>
                        </div>
                        <br/>
                        <div className='card container '>
                            <label htmlFor="">Selecciona la condición del producto</label>
                            <select
                                className='form-control'
                                value={formData.estado}
                                onChange={(e) => setFormData({...formData, estado: e.target.value})}
                            >
                                <option value="">Selecciona un estado</option>
                                <option value="nuevo">Nuevo</option>
                                <option value="usado">Usado</option>
                            </select>
                        </div>
                        <br/>
                        <div className='card container '>
                            <h3>Información completa del producto</h3>

                            <label htmlFor="">Añade el enlace de una imagen del producto</label>
                            <input
                                className='form-control'
                                type="text"
                                placeholder='Ingresa el enlace'
                                value={formData.imagen}
                                onChange={(e) => setFormData({...formData, imagen: e.target.value})}
                                required
                            />
                            <label htmlFor="">Cantidad a vender</label>
                            <input
                                required
                                className='form-control'
                                type="text"
                                placeholder='Ingresa la cantidad'
                                value={formData.stock}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (!isNaN(input)) {
                                        setFormData({...formData, stock: input});
                                    }
                                }}
                            />
                            <label htmlFor="">Precio del producto</label>
                            <input
                                required
                                className='form-control'
                                type="text"
                                placeholder='Agrega el precio final del producto'
                                value={formData.precioFinal}
                                onChange={(e) => {
                                    const input = e.target.value;
                                    if (!isNaN(input)) {
                                        setFormData({...formData, precioFinal: input});
                                    }
                                }}
                            />
                            <br/>
                            <button type="submit" open={open} className='btn buttonProduct'>Editar producto</button>
                        </div>
                    </form>
                </Box>
            </Box>
        </div>
    );
}

export default Edit;

