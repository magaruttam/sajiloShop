import express from "express";
const router = express.Router();
import { createProduct, getProducts } from "../controllers/product.controller";
import { upload } from "../middlewares/uploadMiddleware";
import { getCategory } from "../controllers/categories.controller";
import { deleteProduct } from "../controllers/product.controller";

// upload.array("images", 10) runs BEFORE createProduct
// "images" must match the field name in your form-data request
// Maximum 10 images per product
router.post("/create-product", upload.array("images", 10), createProduct);
router.get("/get-products", getProducts);
router.get("/get-category", getCategory);
router.get("/delete-product/:id", deleteProduct);

export default router;
