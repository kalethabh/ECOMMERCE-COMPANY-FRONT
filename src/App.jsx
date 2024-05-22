import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
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
import CreateProduct from './CreateProduct/CreateProduct';
import ProductDetail from './Products/ProductDetail';
import CustomersForm from './CustomersForm/CustomersForm';
import OrdersForm from './Order/OrderForm';
import Payment from './Payment/Payment'
import OrderForm from './Order/OrderForm';

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
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/products" element={<AllProducts />} />
            <Route path="/customers" element={<AllCustomers />} />
            <Route path="/orders" element={<AllOrders />} />
            <Route path="/create-product" element={<CreateProduct />} />
            <Route path="/products/:productId" element={<ProductDetail />} />
            <Route path="/payment" element={<CustomersForm />} />
            <Route path="/order" element={<OrdersForm />} />
            <Route path="/pay" element={<Payment />} />
            <Route path="/order" element={<OrderForm />} />


            

            {!isLoggedIn && <Route path="*" element={<Navigate to="/" replace />} />}
          </Routes>
        </main>
        {!window.location.pathname.includes("/register") && !window.location.pathname.includes("/login") && <Footer />}
      </div>
    </BrowserRouter>
  );
}

export default App;
