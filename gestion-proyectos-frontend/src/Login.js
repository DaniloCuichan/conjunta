import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Definir la mutación para autenticar al usuario
const AUTENTICAR_USUARIO = gql`
  mutation AutenticarUsuario($nombreUsuario: String!, $clave: String!) {
    autenticarUsuario(nombreUsuario: $nombreUsuario, clave: $clave)
  }
`;

const Login = ({ onLoginSuccess }) => {
  const [nombreUsuario, setNombreUsuario] = useState('');
  const [clave, setClave] = useState('');
  const [mensaje, setMensaje] = useState('');

  const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO, {
    onCompleted: (data) => {
      if (data.autenticarUsuario === 'Autenticación exitosa') {
        onLoginSuccess(); // Llama a la función cuando el inicio de sesión sea exitoso
      } else {
        setMensaje('Nombre de usuario o contraseña incorrectos');
      }
    },
    onError: (error) => {
      setMensaje(`Error en la autenticación: ${error.message}`);
    }
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    autenticarUsuario({ variables: { nombreUsuario, clave } });
  };

  return (
    <div className="login-container">
      <h1>Inicio de Sesión</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreUsuario">Nombre de Usuario</label>
          <input
            type="text"
            id="nombreUsuario"
            value={nombreUsuario}
            onChange={(e) => setNombreUsuario(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="clave">Contraseña</label>
          <input
            type="password"
            id="clave"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            required
          />
        </div>
        <button type="submit">Iniciar Sesión</button>
      </form>
      {mensaje && <p>{mensaje}</p>}
    </div>
  );
};

export default Login;
