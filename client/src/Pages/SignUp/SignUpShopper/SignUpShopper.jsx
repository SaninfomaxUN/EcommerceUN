import countries from "../Data/countries";
import "./Styles/SignUpShopper.css"
import React from "react";


function SignUpShopper(props) {
    return (
        <div className='container-fluid containerRegi'>
            <div className='card divCard'>
                <div className='row g-0'>
                    <div className='card-header '> Registrate</div>
                    <div className='contInput1'>
                        <form onSubmit={props.handleSubmit} action="" typeof='control' className='formUser'>

                            <br/>
                            <label className=''>Nombre</label>
                            <input placeholder='Nombre' className='form-control input1'
                                   required
                                   type="text" name="nombre" value={props.data.nombre} onChange={props.handleChange}
                            />

                            <label className=''>Apellido</label>
                            <input
                                type="text"
                                placeholder='acá va tú apellido'
                                className='form-control input1'
                                name="apellido" value={props.data.apellido} onChange={props.handleChange}
                            />

                            <label htmlFor="" className=''>email</label>
                            <input
                                type="email"
                                placeholder='acá va tú correo'
                                className='form-control input1'
                                required
                                name="email" value={props.data.email} onChange={props.handleChange}
                            />


                            <label htmlFor="" className=''>Número de celular</label>
                            <input
                                placeholder='Ingresa tú número de celular'
                                className='form-control input1'
                                required
                                type="tel" name="telefono" value={props.data.telefono} onChange={props.handleChange}
                            />
                            <label htmlFor="#" className=''>Selecciona tu país: </label>
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
                                <label htmlFor="passwordInput" className=''>Contraseña</label>
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
                                        <i className="fas fa-eye"><span className="material-symbols-outlined ojito">
      visibility_off
      </span></i>
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
                                <label htmlFor="" className=''>Confirmar contraseña</label>
                                <a
                                    type="button"
                                    className="btn btn-outline-secondary password-toggle btnOjito "
                                    onClick={() => props.setShowConfirmPassword(!props.showConfirmPassword)}
                                    aria-label={props.showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                                >
                                    {props.showConfirmPassword ? (
                                        <i className="fas fa-eye-slash ojito "><span
                                            className="material-symbols-outlined ojito">
      visibility
      </span></i>
                                    ) : (
                                        <i className="fas fa-eye ojito"><span
                                            className="material-symbols-outlined  ojito">
      visibility_off
      </span></i>
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