import React, { useState } from "react";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token1, setToken1] = useState("");
  const [token2, setToken2] = useState("");
  const [showSecondForm, setShowSecondForm] = useState(false);

  function handleLogin(event) {
    event.preventDefault();
    // Enviar solicitud al servidor para verificar la validez de las credenciales
    // Si las credenciales son válidas, el servidor debe devolver un token de autenticación
    const authenticationToken1 = "abc123";
    setToken1(authenticationToken1);
    setShowSecondForm(true);
  }

  function handleVerification(event) {
    event.preventDefault();
    // Enviar solicitud al servidor para verificar la validez del código de verificación
    // Si el código de verificación es válido, el servidor debe devolver un segundo token de autenticación
    const authenticationToken2 = "def456";
    setToken2(authenticationToken2);
    // Guardar los dos tokens de autenticación en el estado de la aplicación
    // y redirigir al usuario a la página de inicio de la aplicación
    // navigate("/dashboard");
  }

  return (
    <div>
      <h2>Iniciar sesión</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">Nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}/>
            </div>

            </form> 
            </div>
)}