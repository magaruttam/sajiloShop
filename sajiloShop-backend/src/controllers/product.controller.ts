import { getCategory } from './categories.controller';
import { Request, Response } from "express";
import Product from "../models/product.model";
import { uploadToImageKit, uploadMultipleToImageKit } from "../utils/imagekit";


//Create a new Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, vendorId, stock, status, description, categoryId } =
      req.body;
    
    // Check if files are uploaded
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      return res.status(400).json({ message: "At least one image is required" });
    }

    // Upload multiple images to ImageKit
    const files = req.files.map((file: any) => ({
      buffer: file.buffer,
      originalname: file.originalname,
    }));
    
    const imageUrls = await uploadMultipleToImageKit(files, "/products");
    
    const product = await Product.create({
      name,
      price,
      vendorId,
      stock,
      status,
      description,
      categoryId,
      image: imageUrls[0] || '', // First image as primary (backward compatibility)
      images: imageUrls, // Store array of image URLs
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

//Delete a Product
export const deleteProduct = async (req: Request, res: Response) => {
  try {
  }catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in deleteProduct:", err.message);
    } else {
      console.error("Unknown error in deleteProduct:", err);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
}