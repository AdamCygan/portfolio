import { NextFunction, Request, Response } from "express";
import { authentication, random } from "../helpers";
import { createUser, getUserByEmail } from "../db/users";
import { CustomError } from "../errors/custom-error";

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new CustomError("Missing email or password", 400);
    }

    const user = await getUserByEmail(email);

    if (!user || !user.authentication) {
      throw new CustomError("Invalid credentials", 401);
    }

    const { salt, password: hashedPassword } = user.authentication;

    if (!salt || !hashedPassword) {
      throw new CustomError("Invalid credentials", 401);
    }

    const expectedHash = authentication(salt, password);

    if (hashedPassword !== expectedHash) {
      throw new CustomError("Invalid credentials", 401);
    }

    const newSalt = random();
    const sessionToken = authentication(newSalt, user._id.toString());
    user.authentication.sessionToken = sessionToken;

    await user.save();

    res.cookie("BACKEND-AUTH", sessionToken, {
      domain: "localhost",
      path: "/",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    next(new CustomError("Login process failed", 400));
  }
};

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      throw new CustomError("Missing required fields", 400);
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      throw new CustomError("User already exists", 409);
    }

    const salt = random();
    const hashedPassword = authentication(salt, password);
    const newUser = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: hashedPassword,
      },
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    next(new CustomError("Registration process failed", 400));
  }
};
