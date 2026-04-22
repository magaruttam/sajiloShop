// src/app/app.ts
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import sequelize from "./config/db";
import cors from 'cors';

// 1. Import base tables first
import User from "./models/userModel";
import Category from "./models/categories.model";
import Vendor from "./models/vendor.model"; 

// 2. Import tables that reference the others
import Product from "./models/product.model";
import Order from "./models/order.model";
import OrderItem from "./models/orderItem.model";

// Import associations to register them
import "./models/associations";

// Routers
import registerRouter from "./routes/auth.route";
import productRouter from "./routes/product.route";

const app: Application = express();

// Request Logger for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Robust CORS configuration
app.use(cors({
  origin: (origin, callback) => {
    // Allow all origins for debugging, or specify yours
    // If you want to be strict: if (origin === 'http://localhost:4200' || !origin)
    callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
}));

app.use(express.json());
app.use(cookieParser());

// Health check route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is running" });
});

// Synchronize Database
sequelize.sync({force: false});

app.use("/api/auth", registerRouter);
app.use("/api/product", productRouter);

export default app;
