import rateLimit from "express-rate-limit";
import { NextFunction, Request, Response } from "express";
import { get, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";
import { CustomError } from "../errors/custom-error";

export const apiRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." },
  headers: true,
  standardHeaders: true,
  legacyHeaders: false,
});

export const isOwner = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const currentUserId =
      (get(req, "identity._id") as string | undefined) ?? "";

    if (!currentUserId) {
      return next(new CustomError("Forbidden: User not authenticated", 403));
    }

    if (currentUserId.toString() !== id) {
      return next(new CustomError("Forbidden: Unauthorized access", 403));
    }

    next();
  } catch (error) {
    next(new CustomError("Bad Request", 400));
  }
};

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const sessionToken = req.cookies["BACKEND-AUTH"];

    if (!sessionToken) {
      return next(new CustomError("Forbidden: No authentication token", 403));
    }

    const existingUser = await getUserBySessionToken(sessionToken);

    if (!existingUser) {
      return next(new CustomError("Forbidden: Invalid session token", 403));
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    next(new CustomError("Bad Request: Authentication check failed", 400));
  }
};
