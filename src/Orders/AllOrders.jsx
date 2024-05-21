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
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID de Orden</th>
              <th className="border px-4 py-2">ID de Cliente</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="border px-4 py-2">{order.id}</td>
                <td className="border px-4 py-2">{order.customer_id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllOrders;
