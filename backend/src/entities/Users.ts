import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Product } from "./Products";

  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    firstname!: string;

    @Column()
    lastname!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column()
    picture!: string;

    @ManyToMany(() => Product)
    @JoinTable()
    product!: Product;
  }