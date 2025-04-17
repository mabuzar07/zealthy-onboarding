import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db.config";

enum ComponentType {
  ABOUT_ME = "ABOUT_ME",
  ADDRESS = "ADDRESS",
  BIRTHDATE = "BIRTHDATE",
}

interface ConfigAttributes {
  id?: number;
  componentType: ComponentType;
  page: number;
}

class Config extends Model<ConfigAttributes> implements ConfigAttributes {
  public id!: number;
  public componentType!: ComponentType;
  public page!: number;
}

Config.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    componentType: {
      type: DataTypes.ENUM("ABOUT_ME", "ADDRESS", "BIRTHDATE"),
      allowNull: false,
    },
    page: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 2,
    },
  },
  {
    sequelize,
    modelName: "Config",
  }
);

export { Config, ComponentType };
