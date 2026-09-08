import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/auth.js';
import bookingRoutes from './routes/booking.js';
import sosRoutes from './routes/sos.js';
import locationRoutes from './routes/location.js';
import userRoutes from './routes/users.js';
import driverRoutes from './routes/drivers.js';

import dataRoutes from './routes/data.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/sos', sosRoutes);
app.use('/api/location', locationRoutes);
app.use('/api/data', dataRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'GoCab Backend is running' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
