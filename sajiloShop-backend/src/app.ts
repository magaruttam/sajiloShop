// src/app/app.ts
import express, { Application } from 'express';
import User from './models/userModel';
import registerRouter from '../src/routes/auth.route';

const app: Application = express();
app.use(express.json());

User.sync({ alter: true })

app.use('/api/auth', registerRouter);


export default app;