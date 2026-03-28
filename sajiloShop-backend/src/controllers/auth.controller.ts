import { Op } from "sequelize";
import User from "../models/userModel";
import { Request, Response } from "express";
import  bcrypt from 'bcrypt'

const registerUser = async (req: Request, res: Response)=>{
    try{
       const {userName,email,password} = req.body;

       const existingUser = await User.findOne({
        where: {
            [Op.or] : [{userName: userName}, {email: email}]
        }
       })

       if (existingUser){
        if (existingUser.email === email){
            res.status(409).json({message: "email already exist"});
        }
        if (existingUser.userName === userName){
           res.status(409).json({message: "username already exist"});
        }
    }

        //Hash Password 
          const hashPassword = await bcrypt.hash(password,10);
        

      const newUser = await User.create({ userName, email, password: hashPassword});

      return res.status(201).json({message: "User is created successfully", newUser: newUser});

    }catch(error: any){
       return res.status(500).json({error: error.message})
    }
}

export  {registerUser};