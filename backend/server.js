import express from 'express';
import data from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  res.send(data.products);
});
app.get('/api/products/slug/:slug', async (req, res) => {
  const product = await data.products.find((x) => x.slug === req.params.slug);
  if (!product) {
    res.status(404).send({ message: 'product not found' });
  }
  res.send(product);
});

app.listen(PORT, () => {
  console.log(` The server is running in the ${PORT} address`);
});
