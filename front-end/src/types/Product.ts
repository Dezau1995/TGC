import { Category } from "./Category"
import { Tag } from "./Tag"

export type Product = {
    id: number,
    title: string,
    description: string,
    owner: string,
    price: number,
    picture: string,
    location: string,
    createdAt: string,
    category: Category[]
    tag: Tag[]
}