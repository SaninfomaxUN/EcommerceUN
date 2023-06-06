import countries from "../Data/countries";
import "./Styles/SignUpShopper.css"
import React from "react";


function SignUpShopper(props) {
    return (
        <div className='container-fluid containerRegi fullWidthBackground'>
            <div className='card divCard'>
                <div className='row g-0'>
                    <div className='card-header '> Registrate</div>
                    <div className='contInput1'>
                        <form onSubmit={props.handleSubmit} action="SignUp/SignUpShopper" typeof='control' className='formUser'>

                            <br/>
                            <label className='labelCampos'>Nombres</label>
                            <input placeholder='Nombre' className='form-control input1'
                                   required
                                   type="text" name="nombre" value={props.data.nombre} onChange={props.handleChange}
                            />

                            <label className='labelCampos'>Apellidos</label>
                            <input
                                type="text"
                                placeholder='acá va tú apellido'
                                className='form-control input1'
                                name="apellido" value={props.data.apellido} onChange={props.handleChange}
                            />
                            <label htmlFor="" className='labelCampos'>Cédula</label>
                            <input
                              type="text"
                              placeholder='Ingresa tu número de identificación.'
                              className='form-control input1'
                              required
                              name="idComprador"
                              value={props.data.idComprador}
                              onChange={e => {
                                const input = e.target.value;
                                if (!isNaN(input)) {
                                  props.handleChange(e);
                                }
                              }}
                            />

                            <label htmlFor="" className='labelCampos'>Email</label>
                            <input
                                type="email"
                                placeholder='acá va tú correo'
                                className='form-control input1'
                                required
                                name="email" value={props.data.email} onChange={props.handleChange}
                            />

                            <label htmlFor="" className='labelCampos'>Número de celular</label>
                            <input
                              placeholder='Ingresa tu número de celular'
                              className='form-control input1'
                              required
                              type="text"
                              name="telefono"
                              value={props.data.telefono}
                              onChange={e => {
                                const input = e.target.value;
                                if (!isNaN(input)) {
                                  props.handleChange(e);
                                }
                              }}
                            />
                            <label htmlFor="#" className='labelCampos'>Selecciona tu país: </label>
                            <br/>
                            <select value={props.selectedCountry} onChange={props.handleCountryChange}>

                                {countries.map((country) => (
                                    <option key={country.code} value={country.code}>
                                        {country.name}
                                    </option>
                                ))}

                            </select>
                            <br/>
                            <br/>


                            <div className="password-input-wrapper">
                                <label htmlFor="passwordInput" className='labelCampos'>Contraseña</label>
                                <a
                                    type="button"
                                    className="btn btn-outline-secondary password-toggle btnOjito"
                                    onClick={() => props.setShowPassword(!props.showPassword)}
                                    aria-label={props.showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {props.showPassword ? (
                                        <i className="fas fa-eye-slash"><span
                                            className="material-symbols-outlined ojito">visibility</span></i>
                                    ) : (
                                        <i className="fas fa-eye"><span className="material-symbols-outlined ojito">visibility_off</span></i>
                                    )}
                                </a>


                                <input
                                    id="passwordInput"
                                    type={props.showPassword ? "text" : "password"}
                                    placeholder='acá va tú contraseña'
                                    className='form-control input1'
                                    required
                                    name="password"
                                    value={props.data.password}
                                    onChange={props.handleChange}
                                />

                            </div>


                            <div className="password-input-wrapper">
                                <label htmlFor="" className='labelCampos'>Confirmar contraseña</label>
                                <a
                                    type="button"
                                    className="btn btn-outline-secondary password-toggle btnOjito "
                                    onClick={() => props.setShowConfirmPassword(!props.showConfirmPassword)}
                                    aria-label={props.showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {props.showConfirmPassword ? (
                                        <i className="fas fa-eye-slash ojito"><span
                                            className="material-symbols-outlined ojito">visibility</span></i>
                                    ) : (
                                        <i className="fas fa-eye ojito"><span
                                            className="material-symbols-outlined ojito">visibility_off</span></i>
                                    )}
                                </a>
                                <input
                                    type={props.showConfirmPassword ? "text" : "password"}
                                    placeholder='Confirma tú contraseña'
                                    className='form-control input1'
                                    required
                                    name="confirmPassword"
                                    value={props.data.confirmPassword}
                                    onChange={props.handleChange}
                                />

                            </div>

                            <br/>
                            <button className="btn submitButton " type="submit">Registrarse</button>
                            <br/>
                            <br/>
                            <br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>)
}

export default SignUpShopper