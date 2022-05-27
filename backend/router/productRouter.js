import express from 'express';
import Product from '../models/productModel.js';
const productRouter = express.Router();
import data from '../data.js';

productRouter.get('/', async (req, res) => {
  await Product.remove({});
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default productRouter;
