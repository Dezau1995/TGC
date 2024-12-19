import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolver/ProductResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CategoryResolver } from "./resolver/CategoriesResolver";
import { TagResolver } from "./resolver/TagResolver";

const port = 3000;

const start = async () => {
  await dataSource.initialize();

  const schema = await buildSchema({
    resolvers: [ProductResolver, CategoryResolver, TagResolver],
  });

  const apiServer = new ApolloServer({ schema });

  const { url } = await startStandaloneServer(apiServer, {
    listen: { port: port },
  });

  console.log(`🚀  Server ready at: ${url}`);
};
start();
