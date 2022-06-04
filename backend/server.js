import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './router/seedRoutes.js';
import productRoute from './router/productRoutes.js';
import userRouter from './router/userRoutes.js';
import orderRouter from './router/orderRoutes.js';

dotenv.config();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to db. ');

    app.listen(PORT, () => {
      console.log(` The server is running in the ${PORT} address`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5000;

app.use('/api/seed', seedRouter);
app.use('/api/products', productRoute);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});
