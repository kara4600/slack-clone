import express from 'express';
import sequelize from './models';
import { createHandler } from 'graphql-http/lib/use/express';
import { buildSchema } from 'graphql';
import { ruruHTML } from 'ruru/server';

var schema = buildSchema(`
type Team {
    owner: User!
    members: [User!]!
    channels: [Channel!]!
}

type Channel {
    id: Int!
    name: String!
    public: Boolean!
    messages: [Message!]!
    users: [User!]!
}

type Message {
    id: Int!
    text: String!
    user: User!
    channel: Channel!
}

type User {
    id: Int!
    username: String!
    email: String!
    teams: [Team!]!
}
type Channel {
    teamId: String
}

  type Query {
    hello: String
  }
`);

var root = {
  hello() {
    return 'Hello world!';
  },
};

const app = express();

app.all(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
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
