import express from "express";

import { deleteUser, getAllUsers, updateUser } from "../controllers/users";
import { isAuthenticated, isOwner, apiRateLimiter } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete(
    "/users/:id",
    isAuthenticated,
    isOwner,
    apiRateLimiter,
    deleteUser
  );
  router.patch(
    "/users/:id",
    isAuthenticated,
    isOwner,
    apiRateLimiter,
    updateUser
  );
};
