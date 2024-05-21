import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    console.log('AllProducts Component Mounted');
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/products', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProducts(response.data);
      } catch (err) {
        setError('Error al obtener los productos');
        console.error('Error fetching products:', err);
      }
    };

    fetchProducts();
  }, []);

  const handleDeleteProduct = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setProducts(prevProducts => prevProducts.filter(product => product.id !== productId));
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error('Error deleting product:', err);
    }
  };

  const handleEditProduct = (productId) => {
    // Lógica para editar producto
    console.log(`Editar producto con ID: ${productId}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      {error && <div className="text-red-500">{error}</div>}
      <Link to="/create-product">
        <button className="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600">
          Crear Producto
        </button>
      </Link>
      {location.pathname === '/home' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map(product => (
            <div key={product.id} className="border p-4 rounded shadow-md">
              <h2 className="text-xl font-bold mb-2">
                <Link to={`/products/${product.id}`}>{product.name}</Link>
              </h2>
              <p className="text-gray-700 mb-2">{product.description}</p>
              <p className="text-gray-800 font-bold">${product.price}</p>
              <p className="text-gray-500">Cantidad: {product.quantity}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  <FaTrash />
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600"
                  onClick={() => handleEditProduct(product.id)}
                >
                  <FaEdit />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nombre</th>
              <th className="py-2 px-4 border-b">Descripción</th>
              <th className="py-2 px-4 border-b">Precio</th>
              <th className="py-2 px-4 border-b">Cantidad</th>
              <th className="py-2 px-4 border-b">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">
                  <Link to={`/products/${product.id}`} className="text-blue-500 hover:underline">
                    {product.name}
                  </Link>
                </td>
                <td className="py-2 px-4 border-b">{product.description}</td>
                <td className="py-2 px-4 border-b">${product.price}</td>
                <td className="py-2 px-4 border-b">{product.quantity}</td>
                <td className="py-2 px-4 border-b flex space-x-2">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded flex items-center hover:bg-red-600"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <FaTrash />
                  </button>
                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded flex items-center hover:bg-blue-600"
                    onClick={() => handleEditProduct(product.id)}
                  >
                    <FaEdit />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllProducts;
