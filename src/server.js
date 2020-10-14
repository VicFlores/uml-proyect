import { ApolloServer } from 'apollo-server';
import glue from 'schemaglue';
import jwt from 'jsonwebtoken';

const { schema, resolver } = glue('src/graphql');

// DB connection
require('./bd');

require('dotenv').config({ path: 'variables.env' });

const server = new ApolloServer({
  typeDefs: schema,
  resolvers: resolver,
  context: ({ req }) => {
    const token = req.headers.authorization || '';

    if (token) {
      try {
        const employee = jwt.verify(token.replace('Bearer ', ''), process.env.SECRET);
        return { employee };
      } catch (error) {
        return new Error('Token incorrect');
      }
    }
  },
});

server.listen({ port: process.env.PORT || 4000 })
  .then(({ url }) => {
    console.log(`Server running on ${url}`);
  })
  .catch((error) => {
    console.error(`Error connection ${error}`);
  });
