import React, {useState} from 'react'
import NavbarShopper from "../../../Components/Commons/NavbarShopper/NavbarShopper.jsx"
import {Modal, ModalHeader, ModalFooter, ModalBody, FormGroup} from 'reactstrap';
import './Styles/Tabla.css';
import './Styles/Button.css';
import './Styles/ModalStyles.css';
import './Styles/Header.css';



const PaymentMethods = () => {


  //tabla de ejemplo para la vista
  const Tarjetas = [
    {ID_METODOPAGO:1, ID_COMPRADOR: 1,TIPOMETODO:"Credito",FRANQUICIA: "Visa",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927},
    {ID_METODOPAGO:2, ID_COMPRADOR: 2, TIPOMETODO:"Credito" ,FRANQUICIA: "Visa",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927 },
    {ID_METODOPAGO:3, ID_COMPRADOR: 3, TIPOMETODO:"Credito" ,FRANQUICIA: "Visa",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927},
    {ID_METODOPAGO:4, ID_COMPRADOR: 4, TIPOMETODO:"Credito" ,FRANQUICIA: "Visa",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927},
    {ID_METODOPAGO:5, ID_COMPRADOR: 5,TIPOMETODO:"Debito",FRANQUICIA: "MasterCard",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927},
    {ID_METODOPAGO:6, ID_COMPRADOR: 6,TIPOMETODO:"Debito", FRANQUICIA: "MasterCard",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678", FECHAVENCIMIENTO: "07/23", CCV:927},
    {ID_METODOPAGO:7, ID_COMPRADOR: 7,TIPOMETODO:"Debito",FRANQUICIA: "MasterCard",NOMBRETITULAR:"Esteban Gutierrez",NUMEROTARJETA:"5252 7656 5678",  FECHAVENCIMIENTO: "07/23", CCV:927},

  ];

  //en está constante se guarda el array 
  const [data, setData]= useState(Tarjetas);
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
    var dataNueva=data;
    dataNueva.map(tarjeta=>{
      if(tarjeta.ID_METODOPAGO === tarjetaSeleccionada.ID_METODOPAGO){
        tarjeta.NUMEROTARJETA= tarjetaSeleccionada.NUMEROTARJETA;
        tarjeta.CCV =tarjetaSeleccionada.CCV;
        tarjeta.TIPOMETODO = tarjetaSeleccionada.TIPOMETODO;
        tarjeta.FRANQUICIA = tarjetaSeleccionada.FRANQUICIA;
        tarjeta.NOMBRETITULAR = tarjetaSeleccionada.NOMBRETITULAR;
        tarjeta.FECHAVENCIMIENTO = tarjetaSeleccionada.FECHAVENCIMIENTO;
      }
    });
    setData(dataNueva);
    setModalEditar(false)     
  }

  //esta funcion elimina el modal
  const eliminar =()=>{
    setData(data.filter(tarjeta=>tarjeta.ID_METODOPAGO!==tarjetaSeleccionada.ID_METODOPAGO));
    setModalEliminar(false);
  }

  //esta funcion abre el modal
  const abrirModalInsertar=()=>{
    setTarjetaSeleccionada(null);
    setModalInsertar(true);
  }

  //
  const insertar =()=>{
    var valorInsertar=tarjetaSeleccionada;
    valorInsertar.ID_METODOPAGO = data[data.length-1].ID_METODOPAGO+1
    var dataNueva = data;
    dataNueva.push(valorInsertar);
    setData(dataNueva);
    setModalInsertar(false);
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
            <tr>
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
                  <input
                    className='from-control'
                    type='text'
                    name='TIPOMETODO'
                    value={tarjetaSeleccionada && tarjetaSeleccionada.TIPOMETODO}
                    onChange={handleChange}
                  />
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
            onClick={()=> setModalEditar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>


      <Modal className='modal-container' isOpen={modalEliminar}>
        <ModalBody>
          Estás Seguro que deseas eliminar esta tarjeta
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
                  <input
                    className='from-control'
                    type='text'
                    name='TIPOMETODO'
                    value={tarjetaSeleccionada ? tarjetaSeleccionada.TIPOMETODO:""}
                    onChange={handleChange}
                  />
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
                    />
                  </td>
                </tr>
              </tbody>
            </table>


 

          </FormGroup>
        </ModalBody>

        

        <ModalFooter>
          <button className='green-button'  onClick={()=>insertar()}>
            Insertar
          </button>

          <button 
            className='red-button'
            onClick={()=> setModalInsertar(false)}
          >
            Cancelar
          </button>
        </ModalFooter>
      </Modal>

    </div>
    
  );

   


}

export default PaymentMethods