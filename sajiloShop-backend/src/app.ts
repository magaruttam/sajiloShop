// src/app/app.ts
import express, { Application } from 'express';

const app: Application = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

export default app;