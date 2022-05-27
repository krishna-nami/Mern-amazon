import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import productRouter from './router/productRouter.js';
import productRoute from './router/productRoutes.js';

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
const PORT = process.env.PORT || 5000;

app.use('/api/seed', productRouter);
app.use('/api/products', productRoute);

app.get('/api/products/slug/:slug', async (req, res) => {
  const product = await data.products.find((x) => x.slug === req.params.slug);
  if (!product) {
    res.status(404).send({ message: 'product not found' });
  }
  res.send(product);
});
app.get('/api/products/:id', async (req, res) => {
  const product = await data.products.find((x) => x._id === req.params.id);
  if (!product) {
    res.status(404).send({ message: 'product not found' });
  }
  res.send(product);
});
