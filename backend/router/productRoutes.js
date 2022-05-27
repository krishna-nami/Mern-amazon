import express from 'express';
import Product from '../models/productModel.js';

const productRoute = express.Router();

productRoute.get('/', async (req, res) => {
  const products = await Product.find();
  res.send(products);
});
productRoute.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne((x) => x.slug === req.params.slug);
  if (!product) {
    res.status(404).send({ message: 'product not found' });
  }
  res.send(product);
});
productRoute.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404).send({ message: 'product not found' });
  }
  res.send(product);
});
export default productRoute;
