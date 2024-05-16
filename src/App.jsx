import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Register from './Register/Register';
import Login from './Login/Login';
import AllProducts from './Products/AllProducts';
import AllCustomers from './Customers/AllCustomers';
import AllOrders from './Orders/AllOrders';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Verifica el estado de autenticación al cargar la aplicación
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Maneja el inicio de sesión y guarda el estado en localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    // Maneja el cierre de sesión y elimina el estado del localStorage
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      {isLoggedIn && <Nav handleLogout={handleLogout} />}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <Routes>
        <Route path="/" element={<Login handleLogin={handleLogin} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/customers" element={<AllCustomers />} />
        <Route path="/orders" element={<AllOrders />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
