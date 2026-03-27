import dotenv from 'dotenv';
dotenv.config();
import app from './src/app';


import sequelize, { connectDB } from './src/config/db';

connectDB();

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});