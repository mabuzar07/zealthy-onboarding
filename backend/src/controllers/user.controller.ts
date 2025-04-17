import { Request, Response } from "express";
import * as userService from "../services/user.service";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    try {
      const newUser = await userService.createUser(email, password);

      return res.status(201).json({
        id: newUser.id,
        email: newUser.email,
        currentStep: newUser.currentStep,
      });
    } catch (error: any) {
      if (error.message === "User already exists") {
        return res.status(400).json({ message: "User already exists" });
      }
      throw error;
    }
  } catch (error) {
    console.error("Error creating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const userData = req.body;
    if (userData.birthdate && typeof userData.birthdate === "string") {
      userData.birthdate = new Date(userData.birthdate);
    }
    const updatedUser = await userService.updateUser(id, userData);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      id: updatedUser.id,
      email: updatedUser.email,
      currentStep: updatedUser.currentStep,
    });
  } catch (error) {
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id);
    const user = await userService.getUserById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
