import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Product } from "./Products";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Tags extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column()
  name!: string;

  @Field(() => [Product])
  @ManyToMany(() => Product, (product) => product.tag)
  products!: Product[];
}
