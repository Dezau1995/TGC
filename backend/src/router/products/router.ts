import { Router } from "express";
import { Product } from "../../entities/Products";
import { Category } from "../../entities/Category";
import { validate } from "class-validator";
import { Tags } from "../../entities/Tags";
import { User } from "../../entities/Users";
import { In, Like } from "typeorm";

const productsRouter = Router();

productsRouter.get("/", async (req, res) => {
  try {
    const products = await Product.find({
      relations: {
        category: true,
        tag: true,
      },
    });
    res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

productsRouter.get("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findOne({
      relations: {
        category: true,
        tag: true,
      },
      where: {
        id,
      },
    });
    return res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

productsRouter.get("/search/:input", async (req, res) => {
  try {
    const products = await Product.find({
      relations: {
        category: true,
        tag: true,
      },
      where: { title: Like(`%${req.params.input}%`) },
    });
    res.status(200).send(products);
  } catch (error) {
    return res.status(500).send(error);
  }
});

productsRouter.get("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const products = await Product.find({
      relations: {
        tag: true,
      },
      where: {
        tag: {
          id: id,
        },
      },
    });
    res.status(200).send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

productsRouter.post("/", async (req, res) => {
  const {
    title,
    description,
    owner,
    price,
    createdAt,
    picture,
    location,
    categoryId,
    tagsId,
  } = req.body;
  console.log(req.body);
  try {
    const product = new Product();
    const [category] = await Category.find({ where: { id: categoryId } });
    if (category) product.category = category;

    const tags = JSON.parse(tagsId);
    const tag = await Tags.find({
      where: {
        id: In(tags),
      },
    });
    if (tag) product.tag = tag;

    product.title = title;
    product.description = description;
    product.owner = owner;
    product.price = price;
    product.picture = picture;
    product.location = location;
    product.createdAt = createdAt;

    console.log("le produit", product);

    const errors = await validate(product);
    if (errors.length > 0) {
      res.json(errors[0].constraints);
    } else {
      await product.save();
      return res.status(201).send(product);
    }
  } catch (error) {
    console.log("l'erreur", error);
    return res.status(500).send(error);
  }
});

productsRouter.delete("/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    await Product.delete({ id });
    res.status(204).send("OK");
  } catch (error) {
    return res.status(500).send(error);
  }
});

// productsRouter.delete("/:id", async (req, res) => {
//   try {
//     const id = parseInt(req.params.id);
//     const ad = await Ad.findOneBy({ id });
//     if (ad !== null) {
//       ad.remove();
//     }
//     res.status(204).send("OK");
//   } catch (error) {
//     return res.status(500).send(error);
//   }
// });

productsRouter.put("/:id", async (req, res) => {
  const {
    title,
    description,
    owner,
    price,
    createdAt,
    picture,
    location,
    categoryId,
    tagsId,
  } = req.body;
  try {
    const id = parseInt(req.params.id);
    const product = await Product.findOne({
      relations: {
        category: true,
        tag: true,
      },
      where: {
        id: id,
      },
    });
    if (product !== null) {
      product.title = title;
      product.description = description;
      product.owner = owner;
      product.price = price;
      product.picture = picture;
      product.location = location;
      product.createdAt = createdAt;

      if (categoryId) {
        const [category] = await Category.find({ where: { id: categoryId } });
        if (category) product.category = category;
      }

      if (tagsId) {
        const tags = JSON.parse(tagsId);
        const tag = await Tags.find({
          where: {
            id: In(tags),
          },
        });
        if (tag) product.tag = tag;
      }

      await product.save();
    }
    res.status(200).send(product);
  } catch (error) {
    return res.status(500).send(error);
  }
});

export default productsRouter;
