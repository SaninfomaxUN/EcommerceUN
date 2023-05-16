import React from 'react';
import "./Styles/RecoverPassword.css"
import img31 from "./Assets/Passforget.jpg"
import {FormControlLabel, Switch} from '@mui/material';

const RecoverPassword=(props)=>{

    return (


        <div className=' allContainer'>
            <br/>
            <br/>
            <div className='card container cardPassforget'>

                <div className='card-header'> Recupera tú contraseña</div>
                <br/>
                <form onSubmit={props.handleSubmit}>
                    <img src={img31} alt="" width={300} height={300}/>
                    <br/>
                    <br/>
                    <label className='labelPassforget'>
                        Ingresa tú correo para restablecer tú contraseña
                    </label>
                    <br/>
                    <div className='form_group'>
                        <input className='inputPassforgetRec' placeholder="Email" type="email" name="email" value={props.data.email}
                               onChange={props.handleChange}/>
                        <span className='form_line'></span>
                    </div>
                    <div className='form_group'>
                    <FormControlLabel
                        control={<Switch checked={props.checked} onChange={props.switchHandler} />}
                        label="Soy Vendedor"
                    />
                    </div>
                    <button type="submit" className='buttonForget'>Enviar</button>
                </form>
                {/*{props.messageStr && <p>{props.messageStr}</p>}*/}
                <br/>

            </div>
            <br/>
            <br/>

        </div>
    );
}

export default RecoverPassword;