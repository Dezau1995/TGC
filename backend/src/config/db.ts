import { DataSource } from "typeorm";
import { Product } from "../entities/Products";
import { Category } from "../entities/Category";
import { Tags } from "../entities/Tags";
import { User } from "../entities/Users";
import { config } from "dotenv";

config();

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env;

export const dataSource = new DataSource({
  type: "postgres",
  host: DB_HOST,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: 5432,

  entities: [Product, Category, Tags, User],
  synchronize: true,
});
