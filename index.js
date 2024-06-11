import express from 'express';
import sequelize from './models';
import path from 'path';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { createHandler } from 'graphql-http/lib/use/express';
import { ruruHTML } from 'ruru/server';
import models from './models';

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, './schema')));
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, './resolvers'))
);

const schema = makeExecutableSchema({ typeDefs, resolvers });

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: resolvers,
    context: { models },
  })
);

app.get('/', (_req, res) => {
  res.type('html');
  res.end(ruruHTML({ endpoint: '/graphql' }));
});

sequelize.sync({ force: true }).then(() => {
  app.listen(8080);
  console.log('Running a GraphQL API server at http://localhost:8080/graphql');
});
