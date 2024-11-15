import {
    BaseEntity,
    Column,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Product } from "./Products";
import { Field, ObjectType } from "type-graphql";

  @Entity()
  @ObjectType()
  export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: string;

    @Field()
    @Column()
    firstname!: string;

    @Field()
    @Column()
    lastname!: string;

    @Field()
    @Column()
    email!: string;

    @Field()
    @Column()
    password!: string;

    @Field()
    @Column()
    picture!: string;

    @ManyToMany(() => Product)
    @JoinTable()
    product!: Product;
  }