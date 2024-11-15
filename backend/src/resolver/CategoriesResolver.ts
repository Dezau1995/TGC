import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Category } from "../entities/Category";

@InputType()
class CategoryInput {
    @Field()
    name!: string;
}

@Resolver(Category)
export class CategoryResolver {
    @Query(() => [Category])
    async getCategories() {
        const categories = await Category.find();
        return categories;
    }

    @Query(() => Category)
    async getCategoryById(@Arg("categoryId") id: string) {
        const category = await Category.findOneByOrFail({ id });
        return category;
    }

    @Mutation(() => Category)
    async createCategory(
        @Arg("data") { name }: CategoryInput
    ) {
        const category = new Category();
        category.name = name;

        await category.save();
        return category;
    }

    @Mutation(() => Category)
    async deleteCategory(@Arg("categoryId") id: string) {
        await Category.delete({ id })
        return "Category successfully deleted";
    }
}