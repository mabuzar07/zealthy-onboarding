import User from "../models/user.model";
import bcrypt from "bcrypt";

export const createUser = async (
  email: string,
  password: string
): Promise<User> => {
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    email,
    password: hashedPassword,
    currentStep: 2,
  });

  return user;
};

export const getAllUsers = async (): Promise<User[]> => {
  return await User.findAll();
};

export const getUserById = async (id: number): Promise<User | null> => {
  return await User.findByPk(id);
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await User.findOne({ where: { email } });
};

export const updateUser = async (
  id: number,
  data: Partial<User>
): Promise<User | null> => {
  const user = await User.findByPk(id);
  if (!user) {
    return null;
  }

  if (data.password) {
    data.password = await bcrypt.hash(data.password, 10);
  }

  await user.update(data);
  return user;
};

export const deleteUser = async (id: number): Promise<boolean> => {
  const user = await User.findByPk(id);
  if (!user) {
    return false;
  }
  await user.destroy();
  return true;
};
