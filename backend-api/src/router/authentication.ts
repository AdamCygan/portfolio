import express from "express";
import { login, register } from "../controllers/authentication";
import { apiRateLimiter } from "../middlewares";

export default (router: express.Router) => {
  router.post("/auth/login", apiRateLimiter, login);
  router.post("/auth/register", apiRateLimiter, register);
};
