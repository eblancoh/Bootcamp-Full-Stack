import express, { Express, Request, Response, Application } from "express";
import dotenv from "dotenv";
import mongoose, { Schema, ObjectId } from "mongoose";
import { UsersModel, connect } from "./connection/connection";
import bodyParser from "body-parser";
//For env File
dotenv.config();
const app: Application = express();
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.get("/", async (req: Request, res: Response) => {
  res.send("Welcome to the API");
});

app.get("/users", async (req: Request, res: Response) => {
  const { first_name } = req.query;

  if (first_name) {
    const filteredUsers = await UsersModel.find().where({
      first_name: { $regex: first_name, $options: "i" },
    });
    return res.send(filteredUsers);
  }

  const data = await UsersModel.find();
  res.send(data);
});

app.get("/users/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const data = await UsersModel.findById(id);
    if (!data) res.status(404).send();
    res.send(data);
  } catch (error) {}

  res.status(404).send();
});

app.put("/users/:id", async (req: Request, res: Response) => {
  // update user
  try {
    const { id } = req.params;
    // TODO: validate input
    const {
      address,
      card,
      email,
      first_name,
      last_name,
      gender,
      married_status,
    } = req.body ?? {};

    const response = await UsersModel.updateOne(
      { _id: id },
      { address, card, email, first_name, last_name, gender, married_status }
    );
    res.status(200).send(response);
  } catch (error) {
    console.log(error);
    res.status(400).send();
  }
});

app.post("/users", async (req: Request, res: Response) => {
  // create user

  try {
    const { email, first_name, last_name } = req.body ?? {};
    // TODO: validate input
    if (!first_name || !last_name)
      return res.status(400).send("You must send first_name and last_name");

    const id = new mongoose.Types.ObjectId();

    const response = await UsersModel.create({
      _id: id,
      email,
      first_name,
      last_name,
    });
    res.status(201).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  // delete user
  try {
    const { id } = req.params;
    const data = await UsersModel.findById(id);

    if(!data) return res.status(404).send()
        
    await UsersModel.deleteOne({ _id: id });
    res.send();
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
});

app.listen(port, () => {
  connect().then(() => {
    console.log(`Server is Fire at http://localhost:${port}`);
    console.log(`Server connected to mongodb`);
  });
});
