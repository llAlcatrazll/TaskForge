import express from "express";
import cors from "cors";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

const app = express();

app.use(cors());
app.use(express.json());

import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    hello: String
  }
`;

const resolvers = {
    Query: {
        hello: () => "Hello from TaskForge 🚀",
    },
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
});

await server.start();

app.use("/graphql", expressMiddleware(server));

app.listen(5000, () => {
    console.log("🚀 Server ready at http://localhost:5000/graphql");
});
