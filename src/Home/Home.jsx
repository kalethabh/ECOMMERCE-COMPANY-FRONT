import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (err) {
        const errorMessage = err.response?.data?.message || 'Error al obtener los productos';
        setError(errorMessage);
        console.error('Error fetching products:', err);
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/${searchTerm}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (response.data) {
        setFilteredProducts([response.data]);
      } else {
        setError('Producto no encontrado');
        toast.error('Producto no encontrado', {
          position: toast.POSITION.TOP_RIGHT
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error al buscar el producto';
      setError(errorMessage);
      console.error('Error fetching product:', err);
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex flex-col items-center h-auto min-h-screen bg-gray-100 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Welcome to ECOMMERCE COMPANY
        </h1>
        <div className="mb-4 flex">
          <input
            type="text"
            placeholder="Buscar producto por ID..."
            className="w-full px-4 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            value={searchTerm}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearch} className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            <i className="fas fa-search"></i>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-8">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105">
              <Link to={`/products/${product.id}`} className="block mb-2">
                <img src={product.image} alt={product.name} className="w-[15em] h-56 object-cover rounded" />
              </Link>
              <Link to={`/products/${product.id}`} className="text-xl font-bold text-gray-900 hover:underline">
                {product.title}
              </Link>
              <p className="text-gray-700">${product.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
