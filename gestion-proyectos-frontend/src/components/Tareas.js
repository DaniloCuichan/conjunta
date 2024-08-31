import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener tareas
const OBTENER_TAREAS = gql`
  query {
    obtenerTareas {
      id
      titulo
      descripcion
      proyecto {
        id
        nombre
      }
      empleados {
        id
        nombre
      }
    }
  }
`;

const Tareas = () => {
  const { loading, error, data } = useQuery(OBTENER_TAREAS);

  if (loading) return <p>Cargando tareas...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Tareas</h2>
      <ul>
        {data.obtenerTareas.length === 0 ? (
          <li>No hay tareas disponibles.</li>
        ) : (
          data.obtenerTareas.map(tarea => (
            <li key={tarea.id}>
              <strong>{tarea.titulo}</strong> - {tarea.descripcion || 'Descripción no disponible'}
              <br />
              Proyecto: {tarea.proyecto ? tarea.proyecto.nombre : 'Nombre del proyecto no disponible'}
              <br />
              Empleados: {tarea.empleados && tarea.empleados.length > 0 ? tarea.empleados.map(emp => emp.nombre).join(', ') : 'No asignado'}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Tareas;
