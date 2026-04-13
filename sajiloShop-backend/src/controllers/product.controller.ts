import { getCategory } from './categories.controller';
import { Request, Response } from "express";
import Product from "../models/product.model";
import { uploadToImageKit } from "../utils/imagekit";


//Create a new Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, vendorId, stock, status, description, categoryId } =
      req.body;
    const result = await uploadToImageKit(
      req.file!.buffer,
      req.file!.originalname,
      "/products",
    );
    const product = await Product.create({
      name,
      price,
      vendorId,
      stock,
      status,
      description,
      categoryId,
      image: result.url!,
    });
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in createProduct:", err.message);
    } else {
      console.error("Unknown error in createProduct:", err);
    }
    return res.status(500).json({ message: "Internal Server Error"});
  }
};


//Get All Products
export const getProducts = async (req: Request, res: Response) => {
  {
    try {
      const allProducts = await Product.findAll();
      if (!allProducts) {
        return res.status(401).json({ message: "No Products" });
      }
      return res.status(200).json({ allProducts });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error("Error in getProducts:", err.message);
      } else {
        console.error("Unknown error in getProducts:", err);
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
};
