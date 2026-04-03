// src/app/app.ts
import express, { Application } from 'express';
import cookieParser from "cookie-parser";
import sequelize from './config/db';

// 1. Import base tables first (the ones being referenced)
import User from './models/userModel';
import Category from './models/categories.model';
import Vendor from './models/vendor.model'; // Fixed typo from 'vendore'

// 2. Import tables that reference the others
import Product from './models/product.model';
import Order from './models/order.model';
import OrderItem from './models/orderItem.model';

// Import associations to register them
import './models/associations';

// Routers
import registerRouter from '../src/routes/auth.route';
import productRouter from './routes/product.route';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

// Synchronize Database
sequelize.sync(); 

app.use('/api/auth', registerRouter);
app.use('/api/product', productRouter);

export default app;
