import express from "express";
const router = express.Router();
import { createProduct, getProducts } from "../controllers/product.controller";
import { upload } from "../middlewares/uploadMiddleware";
import { getCategory } from "../controllers/categories.controller";

// upload.single("image") runs BEFORE createProduct
// "image" must match the field name in your form-data request
router.post("/create-product", upload.single("image"), createProduct);
router.get("/get-products", getProducts);
router.get("/get-category", getCategory)

export default router;
