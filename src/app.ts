import express, { Application } from "express";
import cors from "cors";

const app: Application = express();

app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json("Welcome to the Gardening Website server side!!");
  });

export default app;