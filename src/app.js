import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import { router } from "./routes/index.js";
import { statusCodes } from "./utils/index.js";

const app = express();
config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use("/api/v1", router);

app.use((req, res, next) => {
  return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
    massage: "Route not found",
  });
});

app.use((err, req, res, next) => {
  console.log(err)
  res.status(statusCodes.INTERNAL_SERVER_ERROR).send("++Something broke!");
});

export default app;