// src/app/app.ts
import express, { Application } from 'express';
import User from './models/userModel';
import registerRouter from '../src/routes/auth.route';
import cookieParser from "cookie-parser";

const app: Application = express();
app.use(express.json());
app.use(cookieParser());

User.sync({ alter: true });


app.use('/api/auth', registerRouter);


export default app;