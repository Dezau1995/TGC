import { validate } from "class-validator";
import { Category } from "../../entities/Category";
import { Router } from "express";
import { Product } from "../../entities/Products";

const categoryRouter = Router();

categoryRouter.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).send(categories);
  } catch (error) {
    return res.status(500).send(error);
  }
});

categoryRouter.get("/:categoryId/products", async (req, res) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const products = await Product.find({
      relations: {
        category: true,
        tag: true,
      },
      where: { category: { id: categoryId } },
    });
    res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

categoryRouter.post("/", async (req, res) => {
  const { name } = req.body;
  try {
    const category = await new Category();
    category.name = name;

    const errors = await validate(category);
    if (errors.length > 0) {
      res.json(errors[0].constraints);
    } else {
      await category.save();
      return res.status(201).send(category);
    }
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default categoryRouter;
