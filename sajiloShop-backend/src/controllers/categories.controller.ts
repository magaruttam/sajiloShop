import Category from "../models/categories.model";
import { Request, Response } from "express";

export const getCategory = async (req: Request, res: Response) => {
  try {
    const allCategories = await Category.findAll({});
    if (allCategories.length === 0){
        return res.status(401).json({"message": "No categories found"});
    }
    return res.status(200).json(allCategories);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("Error:", err.message);
    } else {
      console.error("Unknown Error", err);
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
