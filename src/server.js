import { ApolloServer } from 'apollo-server';
import glue from 'schemaglue';

const { schema, resolver } = glue('src/graphql');

// DB connection
require('./bd');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
});

server.listen({ port: process.env.PORT || 3000 })
  .then(({ url }) => {
    console.log(`Server running on ${url}`);
  })
  .catch((error) => {
    console.error(`Error connection ${error}`);
  });
