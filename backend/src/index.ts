// import express from "express";
// import cors from "cors";
// import sqlite3 from "sqlite3";
import "reflect-metadata";
import { dataSource } from "./config/db";
import { buildSchema } from "type-graphql";
import { ProductResolver } from "./resolver/ProductResolver";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { CategoryResolver } from "./resolver/CategoriesResolver";
import { TagResolver } from "./resolver/TagResolver";
// import productsRouter from "./router/products/router";
// import categoryRouter from "./router/category/router";
// import tagsRouter from "./router/tags/router";
// import usersRouter from "./router/users/router";

// const db = new sqlite3.Database("./db.sqlite");

// const app = express();
// app.use(express.json());
// app.use(cors())

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

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.use("/users", usersRouter);
// app.use("/products", productsRouter);
// app.use("/categories", categoryRouter);
// app.use("/tags", tagsRouter)

// app.listen(port, async () => {
//   await dataSource.initialize();
//   console.log(`Example app listening on port ${port}`);
// });
