import { Request, Response, NextFunction } from "express";

export const validateUserCreate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters" });
  }

  next();
};

export const validateConfigUpdate = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { configurations } = req.body;

  if (!Array.isArray(configurations)) {
    return res.status(400).json({ message: "Configurations must be an array" });
  }

  next();
};
