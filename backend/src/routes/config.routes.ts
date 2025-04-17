import { Router } from "express";
import * as configController from "../controllers/config.controller";
import { validateConfigUpdate } from "../middleware/validation";

const router = Router();

router.get("/", configController.getConfig);

router.put("/", validateConfigUpdate, configController.updateConfig);

export default router;
