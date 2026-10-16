import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRoutes from './routes/authRoutes.js';
import workerRoutes from './routes/workerRoutes.js';
import skillRoutes from './routes/skillRoutes.js';

const app = express(); // Pehle app initialize hoga

app.use(cors());
app.use(express.json());

// Routes register karein (app.use se)
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);
app.use('/api/worker', skillRoutes); // Ya app.use('/api/skills', skillRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Database Connect Ho Gaya Hai!');
    app.listen(PORT, () => console.log(`Backend server port ${PORT} par chal raha hai`));
  })
  .catch((err) => console.error('DB Connection Error:', err));