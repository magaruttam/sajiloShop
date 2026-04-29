import { Request, Response } from "express";
import Cart from "../models/cart.model";
import Product from "../models/product.model";
import CartItem from "../models/cartItem.model";
import User from "../models/userModel";


const addCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
 

  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error",error.message)
    }else{
        console.error("Unknown error")
    }
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
