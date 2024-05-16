import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home/Home';
import Nav from './Nav/Nav';
import Footer from './Footer/Footer';
import Register from './Register/Register'
import Login from './Login/Login';
import AllProducts from './Products/AllProducts';
import AllUsers from './Users/AllUsers';

function App() {

  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/user' element={<AllUsers/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
