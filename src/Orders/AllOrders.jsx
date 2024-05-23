import { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token no encontrado');
          return;
        }

        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/orders/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setOrders(response.data);
      } catch (err) {
        setError('Error al obtener las órdenes');
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Órdenes</h1>
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID de Orden</th>
            <th className="py-2 px-4 border-b">Nombre del Cliente</th>
            <th className="py-2 px-4 border-b">Email del Cliente</th>
            <th className="py-2 px-4 border-b">Teléfono del Cliente</th>
            <th className="py-2 px-4 border-b">Dirección del Cliente</th>
            <th className="py-2 px-4 border-b">Productos - Cantidad</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.order_id}>
              <td className="py-2 px-4 border-b">{order.order_id}</td>
              <td className="py-2 px-4 border-b">{order.customer_name}</td>
              <td className="py-2 px-4 border-b">{order.customer_email}</td>
              <td className="py-2 px-4 border-b">{order.customer_phone}</td>
              <td className="py-2 px-4 border-b">{order.customer_address}</td>
              <td className="py-2 px-4 border-b">
                <ul>
                  {order.products.map((product, index) => (
                    <li key={index}>{product.product_title} - {product.product_quantity}</li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
