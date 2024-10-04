import { DataSource } from "typeorm";
import { Product } from "../entities/Products";
import { Category } from "../entities/Category";
import { Tags } from "../entities/Tags";
import { User } from "../entities/Users";

export const dataSource = new DataSource({
  type: "sqlite",
  database: "./db.sqlite",
  entities: [Product, Category, Tags, User],
  synchronize: true,
});
