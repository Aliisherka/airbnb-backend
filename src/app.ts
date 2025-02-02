require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';

import userRouter from './routes/user';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));


app.get('/', (req, res) => {
  res.send('Hello, world!');
});

app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});