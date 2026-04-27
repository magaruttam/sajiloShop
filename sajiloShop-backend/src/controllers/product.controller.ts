import { getCategory } from './categories.controller';
import { Request, Response } from "express";
import Product from "../models/product.model";
import ProductImage from "../models/product_image.model";
import Vendor from "../models/vendor.model";
import Category from "../models/categories.model";
import {uploadMultipleToImageKit } from "../utils/imagekit";


// Helper function to store product images in database
const storeProductImages = async (productId: number, imageUrls: string[]) => {
  const imageRecords = imageUrls.map(url => ({
    productId,
    url
  }));
  return await ProductImage.bulkCreate(imageRecords);
};

//Create a new Product
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, vendorId, stock, status, description, categoryId } = req.body;
    
    // Validate that vendor exists
    const vendor = await Vendor.findByPk(vendorId);
    if (!vendor) {
      return res.status(400).json({ message: `Vendor with id ${vendorId} not found` });
    }

    // Validate that category exists
    const category = await Category.findByPk(categoryId);
    if (!category) {
      return res.status(400).json({ message: `Category with id ${categoryId} not found` });
    }
    
    // Create product first
    const product = await Product.create({
      name,
      price,
      vendorId,
      stock,
      status,
      description,
      categoryId,
    });

    // Check if files are uploaded and store images
    if (req.files && Array.isArray(req.files) && req.files.length > 0) {
      // Upload multiple images to ImageKit
      const files = req.files.map((file: any) => ({
        buffer: file.buffer,
        originalname: file.originalname,
      }));
      
      const imageUrls = await uploadMultipleToImageKit(files, "/products");
      
      // Store images in product_images table
      await storeProductImages(product.id, imageUrls);
    }

    // Fetch product with included images
    const productWithImages = await Product.findByPk(product.id, {
      include: [{ model: ProductImage, as: 'images' }]
    });

    return res
      .status(201)
      .json({ message: "Product created successfully", product: productWithImages });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in createProduct:", err.message);
    } else {
      console.error("Unknown error in createProduct:", err);
    }
    return res.status(500).json({ message: "Internal Server Error"});
  }
};

//Upload a Product Image
export const uploadProductImage = async (req: Request, res: Response) => {
  try {
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
    console.log(imageUrls)

  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error in uploadProductImage:", err.message);
    } else {
      console.error("Unknown error in uploadProductImage:", err);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get All Products
export const getProducts = async (req: Request, res: Response) => {
  {
    try {
      const allProducts = await Product.findAll({
        include: [{ model: ProductImage, as: 'images' }]
      });
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