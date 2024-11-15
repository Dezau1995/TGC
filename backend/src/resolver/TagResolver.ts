import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Tags } from "../entities/Tags";

@InputType()
class TagInput {
    @Field()
    name!: string;
}

@Resolver(Tags)
export class TagResolver {
    @Query(() => [Tags])
    async getTags() {
        const tags = await Tags.find();
        return tags;
    }

    @Query(() => Tags)
    async getTagById(@Arg("tagId") id: string) {
        const tag = await Tags.findOneByOrFail({ id })
        return tag;
    }

    @Mutation(() => Tags)
    async createTag(
        @Arg("data") { name }: TagInput
    ) {
       const tag = new Tags();
       tag.name = name; 

       await tag.save();
       return tag;
    }
}