import express from "express";
import cors from "cors";
// import sqlite3 from "sqlite3";
import "reflect-metadata";
import { dataSource } from "./config/db";
import productsRouter from "./router/products/router";
import categoryRouter from "./router/category/router";
import tagsRouter from "./router/tags/router";
import usersRouter from "./router/users/router";

// const db = new sqlite3.Database("./db.sqlite");

const app = express();
app.use(express.json());
app.use(cors())

const port = 3000;


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/users", usersRouter);
app.use("/products", productsRouter);
app.use("/categories", categoryRouter);
app.use("/tags", tagsRouter)


app.listen(port, async () => {
  await dataSource.initialize();
  console.log(`Example app listening on port ${port}`);
});



// type Ad = {
//   id: number;
//   title: string;
//   description: string;
//   owner: string;
//   price: number;
//   picture: string;
//   location: string;
//   createdAt: string;
// };

// app.get("/ads", (req, res) => {
//   db.all("SELECT * FROM ad", (err, rows) => {
//     if(err) return res.status(500).send(err);
//     if(!rows.length) return res.status(404).send(err);
//     return res.json(rows);
//   });
// });

// app.get("/ads/:id", (req, res) => {
// 	const id = Number(req.params.id);
// 	db.all("SELECT * FROM ad WHERE id=?", id, (err, rows) => {
// 		if (err) return res.status(500).send(err);
// 		if (!rows.length) return res.status(404).send(err);
// 		return res.json(rows);
// 	});
// });

// app.post("/ads", (req, res) => {
// 	const { title, description, owner, price, createdAt, picture, location } =
// 		req.body;
// 	const newAd: Omit<Ad, "id"> = {
// 		title,
// 		description,
// 		owner,
// 		price,
// 		createdAt,
// 		picture,
// 		location,
// 	};

// 	db.run(
// 		"INSERT INTO ad ('title', 'description', 'owner', 'price', 'createdAt', 'picture', 'location') values (?, ?, ?, ?, ?, ?, ?)",
// 		[title, description, owner, price, createdAt, picture, location],
// 		(err) => {
// 			if (err) return res.status(500).send(err);
// 			return res.status(201).send();
// 		},
// 	);
// });

// app.get("/ads/:id", (req, res) => {
//   const adsById = ads.find((ad) => ad.id.toString() === req.params.id);
//   res.send(adsById);
// });

// app.delete("/ads/:id", (req, res) => {
// 	const id = Number(req.params.id);
// 	db.run("DELETE FROM ad WHERE id=?", id, (err) => {
// 		if (err) return res.status(500).send(err);
// 		return res.status(204).send();
// 	});
// });

// app.put("/ads/:id", (req, res) => {
//   const updateAdsById = ads.filter((ad) => ad.id.toString() === req.params.id);
//   updateAdsById.push(req.body);
//   res.send(req.body);
// });