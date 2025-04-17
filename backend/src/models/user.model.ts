import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

interface UserAttributes {
  id?: number;
  email: string;
  password: string;
  aboutMe?: string;
  street?: string;
  city?: string;
  state?: string;
  zip?: string;
  birthdate?: Date;
  currentStep?: number;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public email!: string;
  public password!: string;
  public aboutMe!: string;
  public street!: string;
  public city!: string;
  public state!: string;
  public zip!: string;
  public birthdate!: Date;
  public currentStep!: number;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    aboutMe: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    birthdate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    currentStep: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    sequelize,
    modelName: "User",
  }
);

export default User;
