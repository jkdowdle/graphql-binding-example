import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';

import { query, vars } from './default'
// import './binding-scratch'

import { schema } from './schema';

const PORT = 3000;
const server = express();

server.use('/graphql', bodyParser.json(), graphqlExpress(async (request) => {
  return {
    schema: schema,
    tracing: false,
  };
}));

server.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
  query: query,
  variables: vars
}));

server.listen(PORT, () => {
  console.log(`GraphQL Server is now running on http://localhost:${PORT}/graphql`);
  console.log(`View GraphiQL at http://localhost:${PORT}/graphiql`);
});
