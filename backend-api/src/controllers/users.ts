import { NextFunction, Request, Response } from "express";

import { deleteUserById, getUserById, getUsers } from "../db/users";
import { CustomError } from "../errors/custom-error";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    next(new CustomError("Failed to Fetch users", 400));
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;

    const deletedUser = await deleteUserById(id);
    if (!deletedUser) {
      throw new CustomError("User not found", 404);
    }

    res.status(200).json({
      message: "User deleted successfully",
      user: deletedUser.username,
    });
  } catch (error) {
    next(new CustomError("Failed to Fetch users", 400));
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    const { username } = req.body;

    if (!username) {
      throw new CustomError("Username is required", 400);
    }

    const user = await getUserById(id);
    if (!user) {
      throw new CustomError("User not found", 404);
    }

    user.username = username;
    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    next(new CustomError("Failed to update user", 400));
  }
};
