import { Link } from 'react-router-dom';

function Nav() {
  return (
    <div className="flex flex-col justify-center items-start bg-white mb-4">
      <div className="bg-gray-800 p-2 rounded-lg mt-0 w-full">
        <p className="text-center text-white text-lg">Free Colombia Delivery on all orders over 50.000 COP</p>
      </div>
      <nav className="mt-4 ml-[45px]">
        <ul className="flex justify-center space-x-12">
          <li><Link to="/" className="text-gray-600 hover:text-gray-800">Home</Link></li>
          {/* <li><Link to="/products" className="text-gray-600 hover:text-gray-800">Products</Link></li> */}
          <li><Link to="/orders" className="text-gray-600 hover:text-gray-800">My Orders</Link></li>
          <li><Link to="/contact" className="text-gray-600 hover:text-gray-800">Contact</Link></li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Nav;
