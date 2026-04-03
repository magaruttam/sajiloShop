import { Request,Response } from "express";
import Product from "../models/product.model";


export const createProduct = async (req: Request, res: Response)=> {
    try{
    const {name,price,vendorId,stock, status,description,categoryId} = req.body;
    }catch(err){
        return res.status(500).json({message: "Internal Server Error", Error: err})
    }
}