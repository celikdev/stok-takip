import express from "express";
import connectDB from "./utils/db.js";
import MainRouter from "./route/index.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World");
});

connectDB();

app.use("/api", MainRouter);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
