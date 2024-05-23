import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderForm = ({ onClose }) => {
  const [products, setProducts] = useState([]);
  const [orderItems, setOrderItems] = useState([{ product_id: '', quantity: 1 }]);
  const [token, setToken] = useState('');
  const [identification, setIdentification] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
    }

    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/', {
          headers: {
            'Authorization': `Bearer ${storedToken}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Error al obtener los productos.');
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (index, field, value) => {
    const newOrderItems = [...orderItems];
    newOrderItems[index][field] = value;
    setOrderItems(newOrderItems);
  };

  const handleAddItem = () => {
    setOrderItems([...orderItems, { product_id: '', quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    const newOrderItems = orderItems.filter((_, i) => i !== index);
    setOrderItems(newOrderItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const orderData = {
        identification_card: identification,
        items: orderItems.map(item => ({
          product_id: parseInt(item.product_id, 10),
          quantity: parseInt(item.quantity, 10),
        })),
      };

      const response = await axios.post(
        'https://sa-e-commercecompany-1p24-eg5f.onrender.com/orders/',
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      toast.success('¡Orden creada exitosamente!');
      console.log('Response:', response.data);
      onClose(); // Cerrar el formulario después de crear la orden
    } catch (error) {
      console.error('Error creating order:', error);
      if (error.response && error.response.data) {
        toast.error(`Error al crear la orden: ${error.response.data.detail}`);
      } else {
        toast.error('Error al crear la orden. Por favor, inténtalo de nuevo.');
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative">
      <h2 className="text-2xl font-semibold mb-4">Crear Orden</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="identification" className="block text-sm font-medium text-gray-700">
            Identificación
          </label>
          <input
            type="text"
            id="identification"
            value={identification}
            onChange={(e) => setIdentification(e.target.value)}
            className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        {orderItems.map((item, index) => (
          <div key={index} className="flex space-x-4">
            <div className="flex-1">
              <label htmlFor={`product-${index}`} className="block text-sm font-medium text-gray-700">
                Producto
              </label>
              <select
                id={`product-${index}`}
                name="product_id"
                value={item.product_id}
                onChange={(e) => handleChange(index, 'product_id', e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              >
                <option value="">Selecciona un producto</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.title}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label htmlFor={`quantity-${index}`} className="block text-sm font-medium text-gray-700">
                Cantidad
              </label>
              <input
                type="number"
                id={`quantity-${index}`}
                name="quantity"
                value={item.quantity}
                onChange={(e) => handleChange(index, 'quantity', e.target.value)}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                min="1"
                required
              />
            </div>
            <button
              type="button"
              className="bg-red-500 text-white px-3 py-1 rounded mt-6"
              onClick={() => handleRemoveItem(index)}
            >
              X
            </button>
          </div>
        ))}
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleAddItem}
        >
          Añadir Producto
        </button>
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Crear Orden
          </button>
        </div>
      </form>
    </div>
  );
};

OrderForm.propTypes = {
  onClose: PropTypes.func.isRequired,
};

export default OrderForm;
