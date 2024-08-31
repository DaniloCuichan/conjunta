// src/ApolloProvider.js
import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider as ApolloProviderClient } from '@apollo/client';

// Configura Apollo Client
const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql', // Cambia esto si tu servidor GraphQL está en otra dirección
  cache: new InMemoryCache()
});

// Proveedor de Apollo para la aplicación
const ApolloProvider = ({ children }) => (
  <ApolloProviderClient client={client}>
    {children}
  </ApolloProviderClient>
);

export { client, ApolloProvider };
