import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import workerRoutes from './routes/workerRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes connect karna
app.use('/api/auth', authRoutes);
app.use('/api/worker', workerRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Database Connect Ho Gaya Hai!');
    app.listen(PORT, () => console.log(`Backend server port ${PORT} par chal raha hai`));
  })
  .catch((err) => console.error('DB Connection Error:', err));