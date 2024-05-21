import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderForm = () => {
  const [orderQuantity, setOrderQuantity] = useState(1);
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://sa-e-commercecompany-1p24-eg5f.onrender.com/orders/',
        {
          customer_id: customerId,
          items: [
            {
              product_id: productId,
              quantity: orderQuantity
            }
          ]
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Orden creada exitosamente');
      console.log('Orden creada exitosamente:', response.data);
    } catch (error) {
      toast.error('Error al crear la orden. Por favor, inténtalo de nuevo.');
      console.error('Error al crear la orden:', error);
    }
  };

  const handleOrderChange = (e) => {
    const { name, value } = e.target;
    if (name === 'quantity') {
      setOrderQuantity(parseInt(value, 10));
    } else if (name === 'customerId') {
      setCustomerId(value);
    } else if (name === 'productId') {
      setProductId(value);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Crear Orden</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="customerId">
            ID del Cliente:
          </label>
          <input
            type="text"
            id="customerId"
            name="customerId"
            value={customerId}
            onChange={handleOrderChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productId">
            ID del Producto:
          </label>
          <input
            type="text"
            id="productId"
            name="productId"
            value={productId}
            onChange={handleOrderChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Cantidad:
          </label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={orderQuantity}
            onChange={handleOrderChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            min="1"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Crear Orden
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
