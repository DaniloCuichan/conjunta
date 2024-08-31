import './App.css';
import React from 'react';
import Proyectos from './components/Proyectos';
import Empleados from './components/Empleados';
import Tareas from './components/Tareas';
import Crear from './components/Crear';

const App = () => {
  return (
    <div className="app-container">
      <h1>Gestión de Proyectos</h1>

      <Crear />

      <section className="list-section">
        <h2></h2>
        <Proyectos />
        
        <h2></h2>
        <Empleados />
        
        <h2></h2>
        <Tareas />
      </section>
    </div>
  );
};

export default App;
