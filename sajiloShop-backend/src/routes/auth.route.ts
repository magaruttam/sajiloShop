import express from "express";
const router = express.Router();
import { registerUser, loginUser, loginVendor } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginSchema, registerSchema } from "../validations/auth.validation";

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.post("/vendor/login", validate(loginSchema), loginVendor);

export default router;
