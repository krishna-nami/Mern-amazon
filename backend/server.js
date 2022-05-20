import express from 'express';
import data from './data.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/products', (req, res) => {
  res.send(data.porducts);
});

app.listen(PORT, () => {
  console.log(` The server is running in the ${PORT} address`);
});
