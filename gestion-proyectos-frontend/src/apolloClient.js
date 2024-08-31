import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// Configura Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Cambia esto si tu servidor GraphQL está en otra dirección
  cache: new InMemoryCache()
});

// Exporta el cliente y el proveedor de Apollo
export { client, ApolloProvider };
