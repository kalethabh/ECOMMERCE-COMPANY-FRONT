import { useState, useEffect } from 'react';
import axios from 'axios';

const AllOrders = () => {
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

        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/orders', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Response data:', response.data); // Verifica los datos que recibes en la consola
        setOrders(response.data);
      } catch (error) {
        setError('Error al obtener las órdenes');
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Todas las Órdenes</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {orders.map(order => (
          <div key={order.id} className="border p-4 rounded">
            <h2 className="text-xl font-bold">Orden #{order.id}</h2>
            <p>Cliente ID: {order.customer_id}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllOrders;
