import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

import mongoose from "mongoose";
import router from "./router";
import { errorHandler } from "./errors/error-handler";
import { connectToDatabase } from "./db/config";
import { apiRateLimiter } from "./middlewares";

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(apiRateLimiter);

const server = http.createServer(app);

server.listen(8080, () => {
  console.log("Server running on http://localhost:8080/");
  console.log(
    `Database Mode: ${
      process.env.USE_MEMORY_DB === "true"
        ? "In-Memory MongoDB"
        : "MongoDB Atlas"
    }`
  );
});

connectToDatabase();

mongoose.connection.on("error", (error: Error) => console.log(error));

app.use("/", router());

app.use(errorHandler);

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection:", reason);
});
