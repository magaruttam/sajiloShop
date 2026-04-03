import { Request,Response } from "express";
import Product from "../models/product.model";
import { uploadToImageKit } from "../utils/imagekit";



export const createProduct = async (req: Request, res: Response)=> {
    try{
    const {name,price,vendorId,stock, status,description,categoryId} = req.body;
        const result = await uploadToImageKit(req.file!.buffer, req.file!.originalname, "/products");
        const product = await Product.create({
            name,
            price,
            vendorId,
            stock,
            status,
            description,
            categoryId,
            image: result.url!
        });
        return res.status(201).json({message: "Product created successfully", product});
    }catch(err){
        return res.status(500).json({message: "Internal Server Error", Error: err})
    }
}