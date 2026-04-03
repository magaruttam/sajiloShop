import { Op } from "sequelize";
import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRole } from "../models/userModel";
import Vendor from "../models/vendor.model";

const registerUser = async (req: Request, res: Response) => {
  try {
    const { email, password, role, shopName } = req.body;

    const existingUser = await User.findOne({
      where:
        { email: email },

    });

    if (existingUser) {
      return res.status(409).json({ message: "email already exist" });
    }

    //Hash Password
    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      role: role as UserRole,
      password: hashPassword,
    });
    if (newUser.role === 'vendor') {
      const vendor = await Vendor.create({ userId: newUser.id, shopName: shopName, status: "approved", commission_rate: "10", })
      if (!process.env.JWT_SECRET) {
        return res.status(500).json({ message: "JWT secret is not defined" });
      }
    }

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
      .json({ message: "User is created successfully", newUser: {
        email: email,
        role: role
      } });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: {
        email: email
      }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }


    //Create a token for the user and send it in the response
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "2d",
    });
    res.cookie("token", token);
    return res.status(200).json({ message: "Login successful", user: user });

  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export { registerUser, loginUser };
