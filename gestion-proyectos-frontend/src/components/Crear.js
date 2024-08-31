import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Mutaciones GraphQL para crear proyectos, empleados y tareas
const CREAR_PROYECTO = gql`
  mutation crearProyecto($nombre: String!) {
    crearProyecto(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_EMPLEADO = gql`
  mutation crearEmpleado($nombre: String!) {
    crearEmpleado(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_TAREA = gql`
  mutation crearTarea($titulo: String!, $descripcion: String, $proyectoId: ID!) {
    crearTarea(titulo: $titulo, descripcion: $descripcion, proyectoId: $proyectoId) {
      id
      titulo
    }
  }
`;

const Crear = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [tituloTarea, setTituloTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [proyectoIdTarea, setProyectoIdTarea] = useState('');

  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [crearEmpleado] = useMutation(CREAR_EMPLEADO);
  const [crearTarea] = useMutation(CREAR_TAREA);

  const handleCrearProyecto = () => {
    crearProyecto({ variables: { nombre: nombreProyecto } });
    setNombreProyecto('');
  };

  const handleCrearEmpleado = () => {
    crearEmpleado({ variables: { nombre: nombreEmpleado } });
    setNombreEmpleado('');
  };

  const handleCrearTarea = () => {
    crearTarea({ variables: { titulo: tituloTarea, descripcion: descripcionTarea, proyectoId: proyectoIdTarea } });
    setTituloTarea('');
    setDescripcionTarea('');
    setProyectoIdTarea('');
  };

  return (
    <div>
      <h2>Crear Nuevos Elementos</h2>
      <div>
        <h3>Nuevo Proyecto</h3>
        <input
          type="text"
          value={nombreProyecto}
          onChange={(e) => setNombreProyecto(e.target.value)}
          placeholder="Nombre del proyecto"
        />
        <button onClick={handleCrearProyecto}>Crear Proyecto</button>
      </div>
      <div>
        <h3>Nuevo Empleado</h3>
        <input
          type="text"
          value={nombreEmpleado}
          onChange={(e) => setNombreEmpleado(e.target.value)}
          placeholder="Nombre del empleado"
        />
        <button onClick={handleCrearEmpleado}>Crear Empleado</button>
      </div>
      <div>
        <h3>Crear Tarea</h3>
        <input
          type="text"
          value={tituloTarea}
          onChange={(e) => setTituloTarea(e.target.value)}
          placeholder="Título de la tarea"
        />
        <textarea
          value={descripcionTarea}
          onChange={(e) => setDescripcionTarea(e.target.value)}
          placeholder="Descripción de la tarea"
        />
        <input
          type="text"
          value={proyectoIdTarea}
          onChange={(e) => setProyectoIdTarea(e.target.value)}
          placeholder="ID del proyecto"
        />
        <button onClick={handleCrearTarea}>Crear Tarea</button>
      </div>
    </div>
  );
};

export default Crear;
