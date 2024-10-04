import { Router } from "express";
import { Tags } from "../../entities/Tags";
import { validate } from "class-validator";

const tagsRouter = Router();

tagsRouter.get("/", async (req, res) => {
    try {
        const tags = await Tags.find();
        res.status(200).send(tags);
    } catch (error) {
        return res.status(500).send(error)
    }
});

tagsRouter.get("/tags/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const tags = await Tags.find({
      where: {id: id},
    });
    res.status(200).send(tags)
  } catch (error) {
    res.status(500).send(error)
  }
})

tagsRouter.post("/", async (req, res) => {
    const { name } = req.body;
    try {
        const tag = await new Tags();
        tag.name = name;

        const errors = await validate(tag)
      if (errors.length > 0) {
        res.json(errors[0].constraints)
      } else {
        await tag.save()
        return res.status(201).send(tag);
      }
    } catch (error) {
        res.status(500).send(error);
    }
});

export default tagsRouter;