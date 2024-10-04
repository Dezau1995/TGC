import { 
    BaseEntity, 
    Column, Entity, 
    JoinTable, 
    ManyToMany, 
    ManyToOne, 
    PrimaryGeneratedColumn 
  } from "typeorm";
  import { Length } from "class-validator";
import { Category } from "./Category";
import { Tags } from "./Tags";
import { User } from "./Users";

  @Entity()
  export class Product extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;
  
    @Column({ length: 100 })
    @Length(1, 100, {
      message: "Entre 10 et 100 caractères"
    })
    title!: string;
  
    @Column()
    description?: string;
  
    @Column()
    owner!: string;
  
    @Column()
    price!: number;

    @Column()
    picture!: string;
  
    @Column()
    location!: string;

    @Column()
    createdAt!: Date;

    @ManyToOne(() => Category, category => category.products)
    category!: Category;

    @ManyToMany(() => Tags)
    @JoinTable()
    tag!: Tags[]; 

    @ManyToMany(() => User, (user) => user.product)
    users!: User[];
  }