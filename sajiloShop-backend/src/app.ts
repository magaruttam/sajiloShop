// src/app/app.ts
import express, { Application } from 'express';
import User from './models/userModel';
import registerRouter from '../src/routes/auth.route';
import cookieParser from "cookie-parser";
import sequelize from './config/db';
import Vendor from './models/vendore.model';
import Product from './models/product.model';
import OrderItem from './models/orderItem.model';
import Order from './models/order.model';
import Category from './models/categories.model';

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

sequelize.sync();


app.use('/api/auth', registerRouter);


export default app;