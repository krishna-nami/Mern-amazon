//import './App.css';
import { Route, Routes } from 'react-router-dom';
import Axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './screen-Components/Home';
import Product from './screen-Components/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Badge from 'react-bootstrap/Badge';
import { Link } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { Store } from './Store';
import CartScreen from './screen-Components/CartScreen';
import SigninScreen from './screen-Components/SinginScreen';
import ShippingAddressScreen from './screen-Components/ShippingAddressScreen';
import SignupScreen from './screen-Components/SignupScreen';
import PaymentMethodScreen from './screen-Components/PaymentMethodScreen';
import PlaceOrderScreen from './screen-Components/PlaceOrderScreen';
import OrderScreen from './screen-Components/OrderScreen';
import OrderHistoryScreen from './screen-Components/OrderHistoryScreen';
import ProfileScreen from './screen-Components/ProfileScreen';
import Button from 'react-bootstrap/esm/Button';
import { getError } from './util';
import SearchBox from './components/SearchBox';
import SearchScreen from './screen-Components/SearchScreen';

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart, userInfo } = state;
  const signoutHandler = () => {
    ctxDispatch({ type: 'USER_SIGNOUT' });
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress');
    localStorage.removeItem('paymentMethod');
    window.location.href = '/signin';
  };

  const [openSidebar, setopenSidebar] = useState(false);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await Axios.get(`/api/products/categories`);
        setCategories(data);
      } catch (error) {
        toast.error(getError(error));
      }
    };
    fetchCategories();
  }, []);
  return (
    <div
      className={
        openSidebar
          ? 'd-flex flex-column nav-container side-active'
          : 'd-flex flex-column nav-container'
      }
    >
      <ToastContainer position="top-center" limit={1} />
      <header>
        <Navbar bg="dark" variant="dark" expand="lg">
          <Container>
            <Button variant="dark" onClick={() => setopenSidebar(!openSidebar)}>
              {' '}
              <i className="fas fa-bars"></i>
            </Button>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <SearchBox />
              <Nav className="me-auto w-100 justify-content-end">
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
                {userInfo ? (
                  <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                    <LinkContainer to={'/profile'}>
                      <NavDropdown.Item>User Profile</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to={'/orderhistory'}>
                      <NavDropdown.Item>Order History</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Divider />
                    <Link
                      className="dropdown-item"
                      to={'#signout'}
                      onClick={signoutHandler}
                    >
                      Sign Out
                    </Link>
                  </NavDropdown>
                ) : (
                  <Link className="nav-link" to="/signin">
                    Sign In
                  </Link>
                )}
                ;
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div
          className={
            openSidebar
              ? 'active-nav side-navbar d-flex justify-content-between flex-wrap flex-column'
              : 'side-navbar d-flex justify-content-between flex-wrap flex-column'
          }
        >
          <Nav className="flex-column text-white w-100 p-2">
            <Nav.Item>
              <strong>Categories</strong>
            </Nav.Item>
            {categories.map((category) => (
              <Nav.Item key={category}>
                <LinkContainer
                  to={`/search?category=${category}`}
                  onClick={() => setopenSidebar(false)}
                >
                  <Nav.Link>{category}</Nav.Link>
                </LinkContainer>
              </Nav.Item>
            ))}
          </Nav>
        </div>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/cart" element={<CartScreen />} />
            <Route path="/search" element={<SearchScreen />} />
            <Route path="/signin" element={<SigninScreen />} />
            <Route path="/signup" element={<SignupScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/shipping" element={<ShippingAddressScreen />} />
            <Route path="/payment" element={<PaymentMethodScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/orderhistory" element={<OrderHistoryScreen />} />

            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center"> @ All Right Reserved</div>
      </footer>
    </div>
  );
}

export default App;
