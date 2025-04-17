import { Router } from "express";
import * as userController from "../controllers/user.controller";
import { validateUserCreate } from "../middleware/validation";

const router = Router();

router.post("/", validateUserCreate, userController.createUser);
router.get("/", userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.put("/:id", userController.updateUser);

export default router;
