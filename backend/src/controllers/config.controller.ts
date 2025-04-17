import { Request, Response } from "express";
import * as configService from "../services/config.service";

export const getConfig = async (_req: Request, res: Response) => {
  try {
    const config = await configService.getConfig();
    return res.status(200).json(config);
  } catch (error) {
    console.error("Error fetching config:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateConfig = async (req: Request, res: Response) => {
  try {
    const { configurations } = req.body;

    const page2Components = configurations.filter((c: any) => c.page === 2);
    const page3Components = configurations.filter((c: any) => c.page === 3);

    if (page2Components.length === 0 || page3Components.length === 0) {
      return res.status(400).json({
        message: "Each page must have at least one component",
      });
    }

    const updatedConfig = await configService.updateMultipleConfigs(
      configurations
    );
    return res.status(200).json(updatedConfig);
  } catch (error) {
    console.error("Error updating config:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export { initializeDefaultConfig } from "../services/config.service";
