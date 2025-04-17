import { Config, ComponentType } from "../models/config.model";

export const getConfig = async () => {
  return await Config.findAll();
};

export const updateConfig = async (
  page: number,
  componentType: ComponentType
) => {
  const config = await Config.findOne({ where: { componentType } });
  if (config) {
    config.page = page;
    await config.save();
    return config;
  } else {
    return await Config.create({ componentType, page });
  }
};

export const updateMultipleConfigs = async (
  configurations: Array<{ componentType: ComponentType; page: number }>
) => {
  if (!Array.isArray(configurations) || configurations.length === 0) {
    throw new Error("Invalid configuration format");
  }
  const componentTypes = configurations.map((c) => c.componentType);
  const requiredTypes = [
    ComponentType.ABOUT_ME,
    ComponentType.ADDRESS,
    ComponentType.BIRTHDATE,
  ];
  for (const type of requiredTypes) {
    if (!componentTypes.includes(type)) {
      throw new Error(`Missing configuration for ${type}`);
    }
  }
  return await Config.sequelize!.transaction(async (t) => {
    const updates = [];
    for (const config of configurations) {
      updates.push(
        Config.update(
          { page: config.page },
          {
            where: { componentType: config.componentType },
            transaction: t,
          }
        )
      );
    }
    await Promise.all(updates);
    return await Config.findAll();
  });
};

export const initializeDefaultConfig = async () => {
  try {
    const count = await Config.count();

    if (count === 0) {
      await Config.bulkCreate([
        { componentType: ComponentType.ABOUT_ME, page: 2 },
        { componentType: ComponentType.ADDRESS, page: 3 },
        { componentType: ComponentType.BIRTHDATE, page: 2 },
      ]);
      console.log("Default configuration initialized");
    }
  } catch (error) {
    console.error("Error initializing default config:", error);
  }
};
