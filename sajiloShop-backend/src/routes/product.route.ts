import express from "express";
const router = express.Router();
import { createProduct } from "../controllers/product.controller";
import { upload } from "../middlewares/uploadMiddleware";

// upload.single("image") runs BEFORE createProduct
// "image" must match the field name in your form-data request
router.post("/create-product", upload.single("image"), createProduct);

export default router;
