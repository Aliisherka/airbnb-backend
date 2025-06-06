require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import './cron/clearOldBookings';
import userRouter from './routes/user';
import houseRouter from './routes/house';
import reviewRouter from './routes/review';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.0.74:5173', 'https://aliisherka.github.io'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/', userRouter);
app.use('/', houseRouter);
app.use('/', reviewRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});