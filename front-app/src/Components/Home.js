import { Link } from 'react-router-dom';
import data from '../data';

const Home = () => {
  return (
    <>
      <h1>Featured Products</h1>
      <div className="products">
        {data.porducts.map((product) => (
          <div className="product" key={product.slug}>
            <Link to={`/product/${product.slug}`}>
              <img src={product.image} alt={product.name} />
            </Link>
            <div className="product-info">
              <Link to={`/product/${product.slug}`}>
                <p>{product.name}</p>
              </Link>
              <p>{product.price}</p>
              <button>Addd to cart</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default Home;
