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



const PaymentMethods = () => {

  const idComprador = Cookies.get("id");

  const [validation, setValidation] = useState(false);

  //en está constante se guarda el array 
  const [data, setData]= useState([]);
  //Esta constante hace que el modal no se ejecute
  const[modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);



  //objeto tarjeta que se usa pa editar
  const[tarjetaSeleccionada, setTarjetaSeleccionada]= useState({
    ID_METODOPAGO:"",
    ID_COMPRADOR:"",
    TIPOMETODO:"",
    FRANQUICIA:"",
    NOMBRETITULAR : "" ,
    NUMEROTARJETA:"",
    FECHAVENCIMIENTO: "",
    CCV : "",
  })
  
  useEffect(()=>{
    const getPaymentMethods = ()=>{
      axios.post(process.env.REACT_APP_API +'/getAllPaymentMethods', {idComprador: idComprador})
        .then(res => {
          setData(res.data["PaymentMethods"])


        })
        .catch(err => {
        });
    }
    getPaymentMethods();
  },[])

  const validateForm = ()=>{
    if (tarjetaSeleccionada === null){
      setValidation(true)
      return false

    }
    console.log(tarjetaSeleccionada);
    for (let campo in tarjetaSeleccionada ){
      if (tarjetaSeleccionada[campo].toString().trim() === ""){
        setValidation(true)
        return false
      }
    }
    setValidation(false);
    return true 
  }


  const selecionarTarjeta = (elemento,caso)=>{
    setTarjetaSeleccionada(elemento);
    (caso=== 'editar')?setModalEditar(true) : setModalEliminar(true)
  }

  //esto es pa poder escribir en el modal
  const handleChange=e=>{
    const{name,value}=e.target;
    setTarjetaSeleccionada((prevState)=>({
      ...prevState,
      [name]:value
    }))
  }

  //esta funcion cambia los estados en en array
  const editar=()=>{
    if (!validateForm()){
      return  
    }
    const updatePaymentMethod = ()=>{
      axios.post(process.env.REACT_APP_API +'/updatePaymentMethod', {idComprador: idComprador,idMetodoPago:tarjetaSeleccionada.ID_METODOPAGO, tipoMetodo: tarjetaSeleccionada.TIPOMETODO, franquicia: tarjetaSeleccionada.FRANQUICIA, nombreTitular: tarjetaSeleccionada.NOMBRETITULAR, numeroTarjeta: tarjetaSeleccionada.NUMEROTARJETA, fechaVencimiento: tarjetaSeleccionada.FECHAVENCIMIENTO, ccv: tarjetaSeleccionada.CCV })
        .then(res => {
          showAlertSuccess(
            "Información actualizada con exito!",
            ()=>{window.location.reload()}
          )


        })
        .catch(err => {
        });
    }
    updatePaymentMethod();
  }




  
  //esta funcion elimina el modal
  const eliminar =()=>{
    const removePaymentMethod = ()=>{
      axios.post(process.env.REACT_APP_API +'/removePaymentMethod', {idComprador: idComprador,idMetodoPago:tarjetaSeleccionada.ID_METODOPAGO})
        .then(res => {
          showAlertSuccess(
            "Método de pago eliminado con exito!",
            ()=>{window.location.reload()}
          )


        })
        .catch(err => {
        });
    }
    removePaymentMethod();
  }

  //esta funcion abre el modal
  const abrirModalInsertar=()=>{
    setTarjetaSeleccionada(null);
    setModalInsertar(true);
  }

  //
  const insertar =()=>{
    if (!validateForm()){
      return  
    }
    const insertPaymentMethod = ()=>{
      axios.post(process.env.REACT_APP_API +'/insertPaymentMethod', {idComprador: idComprador, tipoMetodo: tarjetaSeleccionada.TIPOMETODO, franquicia: tarjetaSeleccionada.FRANQUICIA, nombreTitular: tarjetaSeleccionada.NOMBRETITULAR, numeroTarjeta: tarjetaSeleccionada.NUMEROTARJETA, fechaVencimiento: tarjetaSeleccionada.FECHAVENCIMIENTO, ccv: tarjetaSeleccionada.CCV })
        .then(res => {
          showAlertSuccess(
            "Método de pago insertado con exito!",
            ()=>{window.location.reload()}
          )


        })
        .catch(err => {
        });
    }
    insertPaymentMethod();
  }

  


  return (

    



    <div className="App">

      <div>
        <NavbarShopper/>
      </div>


      <header>
        <h1 className="header-title">Mis Tarjetas</h1>
      </header>
      
      
      <table className='my-table'>
        <thead>
          <tr>
            <th>Tipo Metodo de Pago</th>
            <th>FRANQUICIA</th>
            <th>Nombre del Titular</th>
            <th>Numero de Tarjeta</th>
            <th>Fecha de Expiración</th>
            <th>CCV</th>
            <th><button className="green-button" onClick={()=>abrirModalInsertar()}>INSERTAR TARJETA</button></th>
          </tr>
        </thead>
        <tbody>
          {data.map(elemento=>(
            <tr key={elemento["ID_METODOPAGO"]} > 
              <td>{elemento.TIPOMETODO}</td>
              <td>{elemento.FRANQUICIA}</td>
              <td>{elemento.NOMBRETITULAR}</td>
              <td>{"**** **** **** " + elemento.NUMEROTARJETA.slice(-4) }</td>
              <td>{elemento.FECHAVENCIMIENTO}</td>
              <td>{elemento.CCV}</td>
              <td> <button className='blue-button' onClick={()=>selecionarTarjeta(elemento,'editar')}>Editar Tarjeta</button>{" "}
              <button className='red-button' onClick={()=>selecionarTarjeta(elemento,'eliminar')}>Eliminar Tarjeta</button></td>
            </tr>
          )) 
          }
        </tbody>
      </table>




      

      <Modal className='custom-modal' isOpen={modalEditar}>
        <ModalHeader>
          <h3>
            Editar Tarjeta
          </h3>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <table stripped className='modal-table' >
              <tbody>
                <tr>
                  <td>Tipo Metodo de Pago</td>
                  <td>
                  <select id="TIPOMETODO" name='TIPOMETODO' value={tarjetaSeleccionada && tarjetaSeleccionada.TIPOMETODO} onChange={handleChange} required>
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                  </select>
                  </td>
                </tr>

                <tr>
                <td>Franquicia</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='FRANQUICIA'
                      value={tarjetaSeleccionada && tarjetaSeleccionada.FRANQUICIA}
                      onChange={handleChange}
                    />
                  </td>
                </tr>


                <tr>
                <td>Numero de Tarjeta</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='NUMEROTARJETA'
                      value={tarjetaSeleccionada && tarjetaSeleccionada.NUMEROTARJETA}
                      onChange={handleChange}
                    />
                  </td>
                </tr>


                <tr>
                <td>Fecha de Expiración</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='FECHAVENCIMIENTO'
                      value={tarjetaSeleccionada && tarjetaSeleccionada.FECHAVENCIMIENTO}
                      onChange={handleChange}
                    />
                  </td>
                </tr>


                <tr>
                <td>CCV</td>
                  <td>
                    <input
                      className='from-control'
                      type='number'
                      name='CCV'
                      value={tarjetaSeleccionada && tarjetaSeleccionada.CCV}
                      onChange={handleChange}
                    />
                  </td>
                </tr>
              </tbody>
            </table>


 

          </FormGroup>
        </ModalBody>

        <ModalFooter>
          <button className='blue-button'  onClick={()=>editar()}>
            Actualizar
          </button>

          <button 
            className='red-button'
            onClick={()=> {setModalEditar(false); setValidation(false)}}
          >
            Cancelar
          </button>
        </ModalFooter>
        {validation && <Alert severity="error">Por favor completa todos los campos!!</Alert>}
      </Modal>


      <Modal className='modal-container' isOpen={modalEliminar}>
        <ModalBody>
          ¿Estás Seguro que deseas eliminar esta tarjeta?
        </ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={()=>eliminar()}>
            Sí
          </button>
          <button
            className="btn btn-secondary"
            onClick={()=>setModalEliminar(false)}
          >
            No
          </button>
        </ModalFooter>
      </Modal>



      <Modal className='custom-modal-green' isOpen={modalInsertar}>
        <ModalHeader>
          <h3>
            Insertar Tarjeta
          </h3>

        </ModalHeader>
          

        <ModalBody>
          <FormGroup>
            <table stripped className='modal-table-green' >
              <tbody>
                <tr>
                  <td>Tipo Metodo de Pago</td>
                  <td>
                  <select id="TIPOMETODO" name='TIPOMETODO' value={tarjetaSeleccionada ? tarjetaSeleccionada.TIPOMETODO:""} onChange={handleChange} required>
                    <option value="">Seleccione...</option>
                    <option value="Crédito">Crédito</option>
                    <option value="Débito">Débito</option>
                  </select>
                  </td>
                </tr>

                <tr>
                <td>Franquicia</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='FRANQUICIA'
                      value={tarjetaSeleccionada ? tarjetaSeleccionada.FRANQUICIA : ""}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>


                <tr>
                <td>Nombre del Titular</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='NOMBRETITULAR'
                      value={tarjetaSeleccionada ? tarjetaSeleccionada.NOMBRETITULAR : ""}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>


                <tr>
                <td>Numero de Tarjeta</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='NUMEROTARJETA'
                      value={tarjetaSeleccionada ? tarjetaSeleccionada.NUMEROTARJETA : ""}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>


                <tr>
                <td>Fecha de Expiración</td>
                  <td>
                    <input
                      className='from-control'
                      type='text'
                      name='FECHAVENCIMIENTO'
                      value={tarjetaSeleccionada ? tarjetaSeleccionada.FECHAVENCIMIENTO : ""}
                      onChange={handleChange}
                      required
                    />
                  </td>
                </tr>


                <tr>
                <td>CCV</td>
                  <td>
                    <input
                      className='from-control'
                      type='number'
                      name='CCV'
                      value={tarjetaSeleccionada ? tarjetaSeleccionada.CCV : ""}
                      onChange={handleChange}
                      required
                    
                    />
                  </td>
                </tr>
              </tbody>
            </table>


 

          </FormGroup>
        </ModalBody>

        

        <ModalFooter>
          
          <button className='green-button' form='insert' onClick={()=>{insertar()}}>
            Insertar
          </button>

          <button 
            className='red-button'
            onClick={()=> {setModalInsertar(false); setValidation(false)}}
          >
            Cancelar
          </button>
        </ModalFooter>
        {validation && <Alert severity="error">Por favor completa todos los campos!!</Alert>}
        
      </Modal>
      

    </div>
    
  );

   


}

export default PaymentMethods