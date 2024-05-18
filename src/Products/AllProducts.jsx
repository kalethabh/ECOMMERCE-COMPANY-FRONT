import { useState, useEffect } from 'react';
import axios from 'axios';

const AllProducts = () => {
  const [products, setProducts] = useState([]);
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
      setProducts(prevProducts => prevProducts.map(product => {
        if (product.id === productId) {
          return { ...product, active: false }; // Marcar el producto como inactivo en el estado local
        }
        return product;
      }));
    } catch (err) {
      setError('Error al eliminar el producto');
      console.error('Error deleting product:', err);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Productos</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.id} className="border p-4 rounded shadow-md">
            <h2 className="text-xl font-bold mb-2">{product.name}</h2>
            <p className="text-gray-700 mb-2">{product.description}</p>
            <p className="text-gray-800 font-bold">${product.price}</p>
            <p className="text-gray-500">Cantidad: {product.quantity}</p>
            <button className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600" onClick={() => handleDeleteProduct(product.id)}>Eliminar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProducts;
