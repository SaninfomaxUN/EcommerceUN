import React, {useEffect, useState} from 'react'
import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} from 'reactstrap';
import './Styles/Tabla.css';
import './Styles/Button.css';
import './Styles/ModalStyles.css';
import './Styles/Header.css';
import Cookies from 'js-cookie';
import axios from 'axios';
import {showAlertSuccess} from "../../../Components/Commons/Alerts/AlertsModal.js"
import {Alert} from "@mui/material";


const Addresses = () => {

    const idComprador = Cookies.get("id");

    const [validation, setValidation] = useState(false);

    //en está constante se guarda el array
    const [data, setData] = useState([]);
    //Esta constante hace que el modal no se ejecute
    const [modalEditar, setModalEditar] = useState(false);
    const [modalEliminar, setModalEliminar] = useState(false);
    const [modalInsertar, setModalInsertar] = useState(false);


    //objeto tarjeta que se usa pa editar
    const [direccionSeleccionada, setDireccionSeleccionada] = useState({
        ID_DIRECCION: "",
        ID_COMPRADOR: "",
        PAIS: "",
        CIUDAD: "",
        DIRECCION: "",
        CODIGOPOSTAL: "",
        DESCRIPCION: "",
        TELEFONO: "",
    })

    useEffect(() => {
        const getPaymentMethods = () => {
            axios.post(process.env.REACT_APP_API + '/getAllAddresses', {idComprador: idComprador})
                .then(res => {
                    setData(res.data["Addresses"])


                })
                .catch(err => {
                });
        }
        getPaymentMethods();
    }, [])

    const validateForm = () => {
        if (direccionSeleccionada === null) {
            setValidation(true)
            return false

        }
        for (let direccion in direccionSeleccionada) {
            if (direccionSeleccionada[direccion].toString().trim() === "") {
                setValidation(true)
                return false
            }
        }
        setValidation(false);
        return true
    }


    const selecionarDireccion = (elemento, caso) => {
        setDireccionSeleccionada(elemento);
        (caso === 'editar') ? setModalEditar(true) : setModalEliminar(true)
    }

    //esto es pa poder escribir en el modal
    const handleChange = e => {
        const {name, value} = e.target;
        setDireccionSeleccionada((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    //esta funcion cambia los estados en en array
    const editar = () => {
        if (!validateForm()) {
            return
        }
        const updateAddress = () => {
            axios.post(process.env.REACT_APP_API + '/updateAddress', {
                idComprador: idComprador,
                idDireccion: direccionSeleccionada.ID_DIRECCION,
                pais: direccionSeleccionada.PAIS,
                ciudad: direccionSeleccionada.CIUDAD,
                direccion: direccionSeleccionada.DIRECCION,
                codigopostal: direccionSeleccionada.CODIGOPOSTAL,
                descripcion: direccionSeleccionada.DESCRIPCION,
                telefono: direccionSeleccionada.TELEFONO
            })
                .then(res => {
                    showAlertSuccess(
                        "Información actualizada con éxito!",
                        () => {
                            window.location.reload()
                        }
                    )


                })
                .catch(err => {
                });
        }
        updateAddress();
    }


    //esta funcion elimina el modal
    const eliminar = () => {
        const removeAddress = () => {
            axios.post(process.env.REACT_APP_API + '/removeAddress', {
                idComprador: idComprador,
                idDireccion: direccionSeleccionada.ID_DIRECCION
            })
                .then(res => {
                    showAlertSuccess(
                        "Dirección eliminada con éxito!",
                        () => {
                            window.location.reload()
                        }
                    )


                })
                .catch(err => {
                });
        }
        removeAddress();
    }

    //esta funcion abre el modal
    const abrirModalInsertar = () => {
        setDireccionSeleccionada(null);
        setModalInsertar(true);
    }

    //
    const insertar = () => {
        if (!validateForm()) {
            return
        }
        const insertAddress = () => {
            axios.post(process.env.REACT_APP_API + '/insertAddress', {
                idComprador: idComprador,
                pais: direccionSeleccionada.PAIS,
                ciudad: direccionSeleccionada.CIUDAD,
                direccion: direccionSeleccionada.DIRECCION,
                codigopostal: direccionSeleccionada.CODIGOPOSTAL,
                descripcion: direccionSeleccionada.DESCRIPCION,
                telefono: direccionSeleccionada.TELEFONO
            })
                .then(res => {
                    showAlertSuccess(
                        "Dirección agregada con éxito!",
                        () => {
                            window.location.reload()
                        }
                    )


                })
                .catch(err => {
                });
        }
        insertAddress();
    }


    return (


        <div className="App">

            <div>
                <NavbarShopper/>
            </div>


            <header>
                <h1 className="header-title">Mis Direcciones</h1>
            </header>


            <table className='my-table'>
                <thead>
                <tr>
                    <th>PAÍS</th>
                    <th>CIUDAD</th>
                    <th>DIRECCIÓN</th>
                    <th>CÓDIGO POSTAL</th>
                    <th>ETIQUETA</th>
                    <th>TELÉFONO</th>
                    <th>
                        <button className="green-button" onClick={() => abrirModalInsertar()}>AGREGAR DIRECCIÓN</button>
                    </th>
                </tr>
                </thead>
                <tbody>
                {data.map(elemento => (
                    <tr key={elemento["ID_DIRECCION"]}>
                        <td>{elemento.PAIS}</td>
                        <td>{elemento.CIUDAD}</td>
                        <td>{elemento.DIRECCION}</td>
                        <td>{elemento.CODIGOPOSTAL}</td>
                        <td>{elemento.DESCRIPCION}</td>
                        <td>{elemento.TELEFONO}</td>
                        <td>
                            <button className='blue-button'
                                    onClick={() => selecionarDireccion(elemento, 'editar')}>Editar Dirección
                            </button>
                            {" "}
                            <button className='red-button'
                                    onClick={() => selecionarDireccion(elemento, 'eliminar')}>Eliminar Dirección
                            </button>
                        </td>
                    </tr>
                ))
                }
                </tbody>
            </table>


            <Modal className='custom-modal' isOpen={modalEditar}>
                <ModalHeader>
                    <div>
                        <h3>
                            Editar Dirección
                        </h3>
                    </div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <table className='modal-table'>
                            <tbody>
                            <tr>
                                <td>País</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='PAIS'
                                        value={direccionSeleccionada && direccionSeleccionada.PAIS}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Ciudad</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='CIUDAD'
                                        value={direccionSeleccionada && direccionSeleccionada.CIUDAD}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Dirección</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='DIRECCION'
                                        value={direccionSeleccionada && direccionSeleccionada.DIRECCION}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Código Postal</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='CODIGOPOSTAL'
                                        value={direccionSeleccionada && direccionSeleccionada.CODIGOPOSTAL}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Etiqueta</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='DESCRIPCION'
                                        value={direccionSeleccionada && direccionSeleccionada.DESCRIPCION}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Teléfono</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='TELEFONO'
                                        value={direccionSeleccionada && direccionSeleccionada.TELEFONO}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <button className='blue-button' onClick={() => editar()}>
                        Actualizar
                    </button>

                    <button
                        className='red-button'
                        onClick={() => {
                            setModalEditar(false);
                            setValidation(false)
                        }}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
                {validation && <Alert severity="error">Por favor completa todos los campos!!</Alert>}
            </Modal>


            <Modal className='modal-container' isOpen={modalEliminar}>
                <ModalBody>
                    ¿Estás seguro que deseas eliminar esta Dirección?
                </ModalBody>
                <ModalFooter>
                    <button className="btn btn-danger" onClick={() => eliminar()}>
                        Sí
                    </button>
                    <button
                        className="btn btn-secondary"
                        onClick={() => setModalEliminar(false)}
                    >
                        No
                    </button>
                </ModalFooter>
            </Modal>


            <Modal className='custom-modal-green' isOpen={modalInsertar}>
                <ModalHeader>
                    <div>
                        <h3>
                            Agregar Dirección
                        </h3>
                    </div>
                </ModalHeader>


                <ModalBody>
                    <FormGroup>
                        <table className='modal-table-green'>
                            <tbody>
                            <tr>
                                <td>País</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='PAIS'
                                        value={direccionSeleccionada ? direccionSeleccionada.PAIS : ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td>Ciudad</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='CIUDAD'
                                        value={direccionSeleccionada ? direccionSeleccionada.CIUDAD : ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Dirección</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='DIRECCION'
                                        value={direccionSeleccionada ? direccionSeleccionada.DIRECCION : ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Código Postal</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='CODIGOPOSTAL'
                                        value={direccionSeleccionada ? direccionSeleccionada.CODIGOPOSTAL : ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Etiqueta</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='DESCRIPCION'
                                        value={direccionSeleccionada ? direccionSeleccionada.DESCRIPCION : ""}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>


                            <tr>
                                <td>Teléfono</td>
                                <td>
                                    <input
                                        className='from-control'
                                        type='text'
                                        name='TELEFONO'
                                        value={direccionSeleccionada ? direccionSeleccionada.TELEFONO : ""}
                                        onChange={handleChange}

                                    />
                                </td>
                            </tr>
                            </tbody>
                        </table>


                    </FormGroup>
                </ModalBody>


                <ModalFooter>

                    <button className='green-button' form='insert' onClick={() => {
                        insertar()
                    }}>
                        Insertar
                    </button>

                    <button
                        className='red-button'
                        onClick={() => {
                            setModalInsertar(false);
                            setValidation(false)
                        }}
                    >
                        Cancelar
                    </button>
                </ModalFooter>
                {validation && <Alert severity="error">Por favor completa todos los campos!!</Alert>}

            </Modal>


        </div>

    );


}

export default Addresses