import { ApolloServer, gql } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import schema from './schema'
const app = express();

app.use(cors());
app.use(express.json());

app.get('/_ping', (req, res) => {
  res.send('pong');
});

async function startApolloServer() {

  const server = new ApolloServer({ schema });

  await server.start();

  server.applyMiddleware({
    app,
    path: "/graphql"
  });
}

startApolloServer();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on port: ${port}.`);
});
