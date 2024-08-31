const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const cors = require('cors');
const { sequelize } = require('./db');
const schema = require('./schema');
const root = require('./resolvers');

const app = express();
const port = 4000;

// Configuración de CORS
app.use(cors());

// Middleware para manejar JSON
app.use(express.json());

// Configuración del middleware GraphQL
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

// Manejador de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Sincroniza la base de datos e inicia el servidor
sequelize.sync({ force: false }) // Cambia `force` a `true` solo si necesitas reiniciar la base de datos
  .then(() => {
    console.log('Base de datos sincronizada');
    app.listen(port, () => {
      console.log(`Servidor GraphQL corriendo en http://localhost:${port}/graphql`);
    });
  })
  .catch(error => {
    console.error('Error al sincronizar la base de datos:', error);
  });
