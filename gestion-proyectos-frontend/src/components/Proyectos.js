import React from 'react';
import { useQuery, gql } from '@apollo/client';

// Consulta GraphQL para obtener proyectos
const OBTENER_PROYECTOS = gql`
  query {
    obtenerProyectos {
      id
      nombre
    }
  }
`;

const Proyectos = () => {
  const { loading, error, data } = useQuery(OBTENER_PROYECTOS);

  if (loading) return <p>Cargando proyectos...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h2>Proyectos</h2>
      <ul>
        {data.obtenerProyectos.map(proyecto => (
          <li key={proyecto.id}>{proyecto.nombre}</li>
        ))}
      </ul>
    </div>
  );
};

export default Proyectos;
