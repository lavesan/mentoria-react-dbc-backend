import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggerUI from "swagger-ui-express";
import cors from "cors";

import { router } from "./routes";
import swaggerFile from "./swagger.json";

import { createConnection } from "../ormconfig";

import "./shared/container";
import { AppError } from "./errors/AppError";

const port = process.env.PORT || 3333;

const app = express();

createConnection();

app.use(cors());
app.use(express.json());
app.use(router);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFile));

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error - ${err.message}`,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));
