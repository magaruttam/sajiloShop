import { Op } from "sequelize";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { userName, email, password } = req.body;

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ userName: userName }, { email: email }],
      },
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(409).json({ message: "email already exist" });
      }
      if (existingUser.userName === userName) {
        return res.status(409).json({ message: "username already exist" });
      }
    }

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
    });

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }
    //Create a token for the user and send it in the response
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
    return res
      .status(201)
      .json({ message: "User is created successfully", newUser: newUser });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const {userName, email, password} = req.body;

    const condition = [];
    if (userName){
      condition.push({userName});
    }
    if (email){
      condition.push({email});
    }
      if (condition.length === 0){
        return res.status(400).json({messsage: "Please provide either username or email"})
      }
    const user = await User.findOne({
      where: {
        [Op.or]: condition
      }
    })

     if (!user){
      return res.status(404).json({message: "User not found"});
     }
    
    //  comppare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid){
      return res.status(401).json({message: "Invalid password"});
    }

     if (!process.env.JWT_SECRET) {
      return res.status(500).json({ message: "JWT secret is not defined" });
    }
    //Create a token for the user and send it in the response
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
    return res.status(200).json({message: "Login successful", user: user});

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
