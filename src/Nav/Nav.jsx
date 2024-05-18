import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const Nav = ({ handleLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    handleLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex justify-between items-center">
        <Link to="/home" className="text-white text-lg font-bold">
          E-Commerce Company
        </Link>
        <div>
          <Link to="/products" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Productos
          </Link>
          <Link to="/customers" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Clientes
          </Link>
          <Link to="/orders" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
            Pedidos
          </Link>
          <button
            onClick={handleLogoutClick}
            className="ml-4 text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </nav>
  );
};

Nav.propTypes = {
  handleLogout: PropTypes.func.isRequired
};

export default Nav;
