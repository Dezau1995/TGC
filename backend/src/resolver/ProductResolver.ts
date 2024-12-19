import {
  Arg,
  Field,
  ID,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";
import { Product } from "../entities/Products";
import { Category } from "../entities/Category";
import { Tags } from "../entities/Tags";
import { In, Like } from "typeorm";

@InputType()
class ProductInput {
  @Field()
  title!: string;

  @Field()
  description?: string;

  @Field()
  owner!: string;

  @Field()
  price!: string;

  @Field()
  picture!: string;

  @Field()
  location!: string;

  @Field(() => ID)
  categoryId?: string;

  @Field(() => [ID])
  tagsId?: string[];
}

@InputType()
class UpdateProductInput {
  @Field({ nullable: true })
  title?: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  owner?: string;

  @Field({ nullable: true })
  price?: string;

  @Field({ nullable: true })
  picture?: string;

  @Field({ nullable: true })
  location?: string;

  @Field({ nullable: true })
  categoryId?: string;

  @Field({ nullable: true })
  tagsId?: string;
}

@Resolver(Product)
export class ProductResolver {
  @Query(() => [Product])
  async getProducts(@Arg("input", { nullable: true }) input?: string) {
    const whereClause = input ? { title: Like(`%${input}%`) } : {};
    const products = await Product.find({
      where: whereClause,
      relations: ["category", "tag"],
    });
    return products;
  }

  @Query(() => Product)
  async getProductById(@Arg("productId") id: string) {
    const product = await Product.findOneOrFail({
      where: { id },
      relations: ["category", "tag"],
    });
    return product;
  }

  @Query(() => [Product])
  async getProductsByCategory(
    @Arg("categoryId") categoryId: string
  ): Promise<Product[]> {
    const products = await Product.find({
      where: { category: { id: categoryId } },
      relations: ["category", "tag"],
    });
    return products;
  }

  @Mutation(() => Product)
  async createProduct(
    @Arg("data")
    {
      title,
      description,
      owner,
      picture,
      price,
      location,
      categoryId,
      tagsId,
    }: ProductInput
  ) {
    const product = new Product();

    const category = await Category.findOneBy({ id: categoryId });
    if (!category) return "Category not found";

    const tag = tagsId ? await Tags.find({ where: { id: In(tagsId) } }) : [];
    if (!tag) return "Tags not found";

    product.title = title;
    product.description = description;
    product.owner = owner;
    product.picture = picture;
    product.price = Number(price);
    product.location = location;
    product.category = category;
    product.tag = tag;

    await product.save();
    return product;
  }

  @Mutation(() => Product)
  async updateProduct(
    @Arg("productId") id: string,
    @Arg("data")
    {
      title,
      description,
      owner,
      picture,
      price,
      location,
      categoryId,
      tagsId,
    }: ProductInput
  ) {
    const product = await Product.findOneOrFail({
      where: { id },
      relations: ["category", "tag"],
    });

    const category = await Category.findOneBy({ id: categoryId });
    if (!category) return "Category not found";

    const tag = tagsId ? await Tags.find({ where: { id: In(tagsId) } }) : [];
    if (!tag) return "Tags not found";

    if (product !== null) {
      product.title = title;
      product.description = description;
      product.owner = owner;
      product.price = Number(price);
      product.picture = picture;
      product.location = location;
      product.category = category;
      product.tag = tag;
    }

    await product.save();
    return product;
  }

  @Mutation(() => Product)
  async updateDetailsProduct(
    @Arg("productId") id: string,
    @Arg("data") data: UpdateProductInput
  ) {
    const tags = JSON.parse(data.tagsId as string);
    const tagsId = await Tags.findBy({ id: In(tags) });

    let category = null;
    if (data.categoryId) {
      category = await Category.findOneBy({ id: data.categoryId });
      if (!category) throw new Error("Category not found");
    }

    const product = await Product.findOneOrFail({
      where: { id },
      relations: ["category", "tag"],
    });
    if (!product) {
      throw new Error("Product not found");
    }
    Object.assign(product, data);

    if (category) {
      product.category = category;
    }
    product.tag = tagsId;

    await product.save();
    return product;
  }

  @Mutation(() => Boolean)
  async deleteProduct(@Arg("productId") id: string) {
    return (await Product.delete({ id })).affected;
  }
}
