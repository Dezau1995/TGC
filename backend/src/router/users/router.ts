import { Router } from "express";
import { User } from "../../entities/Users";
import { validate } from "class-validator";
import { Product } from "../../entities/Products";

const usersRouter = Router();

usersRouter.get("/", async (req, res) => {
    try {
        const users = await User.find({
            relations: {
                product: true,
            }
        });
        res.status(200).send(users)
    } catch (error) {
        res.status(500).send(error);
    }
});

usersRouter.post("/", async (req, res) => {
    const { firstname, lastname, email, password, picture } = req.body;
    try {
        const user = await new User();
        user.firstname = firstname;
        user.lastname = lastname;
        user.email = email;
        user.password = password;
        user.picture = picture;
        const product = await Product.findOneBy({ id: 1 });
        if(product) user.product = product;
        const errors = await validate(user);
        if (errors.length > 0) {
          res.json(errors[0].constraints);
        } else {
          await user.save();
          return res.status(201).send(user);
        }
    } catch (error) {
        res.status(500).send(error)
    }
});

export default usersRouter;