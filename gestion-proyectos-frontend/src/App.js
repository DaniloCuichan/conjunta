import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Proyectos from './components/Proyectos';
import Empleados from './components/Empleados';
import Tareas from './components/Tareas';
import Crear from './components/Crear';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      <div>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login onLoginSuccess={handleLoginSuccess} />}
          />
          <Route
            path="/"
            element={isAuthenticated ? (
              <div>
                <h1>Gestión de Proyectos</h1>
                <Crear />
                <Proyectos />
                <Empleados />
                <Tareas />
              </div>
            ) : (
              <Navigate to="/login" />
            )}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
