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
    const loggedInStatus = localStorage.getItem('isLoggedIn');
    if (loggedInStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        {isLoggedIn && <Nav handleLogout={handleLogout} />}
        <main className="flex-grow">
          <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/customers" element={<AllCustomers />} />
            <Route path="/orders" element={<AllOrders />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
