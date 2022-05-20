//import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './screen-Components/Home';
import Product from './screen-Components/Product';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';

function App() {
  return (
    <div className="d-flex flex-column nav-container">
      <header>
        <Navbar bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand>amazona</Navbar.Brand>
            </LinkContainer>
          </Container>
        </Navbar>
      </header>
      <main>
        <Container className="mt-3">
          <Routes>
            <Route path="/product/:slug" element={<Product />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </Container>
      </main>
      <footer>
        <div className="text-center"> @ All Right Reservd</div>
      </footer>
    </div>
  );
}

export default App;
