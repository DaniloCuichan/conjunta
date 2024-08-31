const { buildSchema } = require('graphql');

const schema = buildSchema(`
  type Proyecto {
    id: ID!
    nombre: String!
  }

  type Empleado {
    id: ID!
    nombre: String!
    clave: String! # Este campo puede ser sensible y no es ideal exponerlo directamente
  }

  type Tarea {
    id: ID!
    titulo: String!
    descripcion: String
    proyecto: Proyecto
    empleados: [Empleado]
  }

  type Query {
    obtenerProyectos: [Proyecto]
    obtenerEmpleados: [Empleado]
    obtenerTareas: [Tarea]
  }

  type Mutation {
    crearProyecto(nombre: String!): Proyecto
    crearEmpleado(nombre: String!, clave: String!): Empleado
    crearTarea(titulo: String!, descripcion: String, proyectoId: ID!): Tarea
    asignarEmpleadoATarea(tareaId: ID!, empleadoId: ID!): Tarea
    autenticarUsuario(nombreUsuario: String!, clave: String!): AuthPayload
  }

  type AuthPayload {
    token: String
    mensaje: String
  }
`);

module.exports = schema;
