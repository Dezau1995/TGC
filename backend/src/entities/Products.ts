import {
  BaseEntity,
  BeforeInsert,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Length } from "class-validator";
import { Category } from "./Category";
import { Tags } from "./Tags";
import { User } from "./Users";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Product extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: string;

  @Field()
  @Column({ length: 100 })
  @Length(1, 100, {
    message: "Entre 10 et 100 caractères",
  })
  title!: string;

  @Field()
  @Column()
  description?: string;

  @Field()
  @Column()
  owner!: string;

  @Field()
  @Column()
  price!: number;

  @Field()
  @Column()
  picture!: string;

  @Field()
  @Column()
  location!: string;

  @Field()
  @Column()
  createdAt!: Date;

  @BeforeInsert()
  updateDates() {
    this.createdAt = new Date();
  }

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, (category) => category.products)
  category!: Category;

  @Field(() => [Tags])
  @ManyToMany(() => Tags)
  @JoinTable()
  tag!: Tags[];

  @ManyToMany(() => User, (user) => user.product)
  users!: User[];
}
