import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

// Definir las mutaciones GraphQL
const CREAR_PROYECTO = gql`
  mutation CrearProyecto($nombre: String!) {
    crearProyecto(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_EMPLEADO = gql`
  mutation CrearEmpleado($nombre: String!) {
    crearEmpleado(nombre: $nombre) {
      id
      nombre
    }
  }
`;

const CREAR_TAREA = gql`
  mutation CrearTarea($titulo: String!, $descripcion: String, $proyectoId: ID!) {
    crearTarea(titulo: $titulo, descripcion: $descripcion, proyectoId: $proyectoId) {
      id
      titulo
      descripcion
      proyecto {
        id
        nombre
      }
    }
  }
`;

const Crear = () => {
  const [nombreProyecto, setNombreProyecto] = useState('');
  const [nombreEmpleado, setNombreEmpleado] = useState('');
  const [tituloTarea, setTituloTarea] = useState('');
  const [descripcionTarea, setDescripcionTarea] = useState('');
  const [proyectoId, setProyectoId] = useState('');

  const [crearProyecto] = useMutation(CREAR_PROYECTO);
  const [crearEmpleado] = useMutation(CREAR_EMPLEADO);
  const [crearTarea] = useMutation(CREAR_TAREA);

  const handleCrearProyecto = async (e) => {
    e.preventDefault();
    try {
      await crearProyecto({ variables: { nombre: nombreProyecto } });
      setNombreProyecto('');
    } catch (err) {
      console.error('Error al crear proyecto', err);
    }
  };

  const handleCrearEmpleado = async (e) => {
    e.preventDefault();
    try {
      await crearEmpleado({ variables: { nombre: nombreEmpleado } });
      setNombreEmpleado('');
    } catch (err) {
      console.error('Error al crear empleado', err);
    }
  };

  const handleCrearTarea = async (e) => {
    e.preventDefault();
    try {
      await crearTarea({ variables: { titulo: tituloTarea, descripcion: descripcionTarea, proyectoId } });
      setTituloTarea('');
      setDescripcionTarea('');
      setProyectoId('');
    } catch (err) {
      console.error('Error al crear tarea', err);
    }
  };

  return (
    <div className="crear-section">
      <h2>Crear Nuevos Elementos</h2>
      <div className="crear-element">
        <h3>Nuevo Proyecto</h3>
        <form onSubmit={handleCrearProyecto}>
          <label>Nombre del proyecto</label>
          <input
            type="text"
            placeholder="Nombre del proyecto"
            value={nombreProyecto}
            onChange={(e) => setNombreProyecto(e.target.value)}
          />
          <button type="submit">Crear Proyecto</button>
        </form>
      </div>
      <div className="crear-element">
        <h3>Nuevo Empleado</h3>
        <form onSubmit={handleCrearEmpleado}>
          <label>Nombre del empleado</label>
          <input
            type="text"
            placeholder="Nombre del empleado"
            value={nombreEmpleado}
            onChange={(e) => setNombreEmpleado(e.target.value)}
          />
          <button type="submit">Crear Empleado</button>
        </form>
      </div>
      <div className="crear-element">
        <h3>Crear Tarea</h3>
        <form onSubmit={handleCrearTarea}>
          <label>Título de la tarea</label>
          <input
            type="text"
            placeholder="Título de la tarea"
            value={tituloTarea}
            onChange={(e) => setTituloTarea(e.target.value)}
          />
          <label>Descripción de la tarea</label>
          <textarea
            placeholder="Descripción de la tarea"
            value={descripcionTarea}
            onChange={(e) => setDescripcionTarea(e.target.value)}
          ></textarea>
          <label>ID del proyecto</label>
          <input
            type="text"
            placeholder="ID del proyecto"
            value={proyectoId}
            onChange={(e) => setProyectoId(e.target.value)}
          />
          <button type="submit">Crear Tarea</button>
        </form>
      </div>
    </div>
  );
};

export default Crear;
