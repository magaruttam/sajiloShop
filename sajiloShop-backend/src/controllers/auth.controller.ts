import { Op } from "sequelize";
import User from "../models/userModel";
import { Request, Response } from "express";

const registerUser = async (req: Request, res: Response)=>{
    try{
       const {userName,email,password} = req.body;

       const existingUser = await User.findOne({
        where: {
            [Op.or] : [{userName: userName}, {email: email}]
        }
       })

       if (existingUser){
        if (existingUser.email = email){
            res.status(409)
        }
       }

    }catch(error){

    }
}

export  {registerUser};