import { useState, useEffect } from 'react';
import axios from 'axios';
import EditCustomer from './EditCustomers';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');
  const [editCustomerId, setEditCustomerId] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Token no encontrado');
          return;
        }

        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCustomers(response.data);
      } catch (err) {
        setError('Error al obtener los clientes');
        console.error('Error fetching customers:', err);
      }
    };

    fetchCustomers();
  }, []);

  const deleteCustomer = async (id) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Token no encontrado');
        return;
      }

      await axios.delete(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCustomers(customers.filter(customer => customer.id !== id));
    } catch (err) {
      setError('Error al eliminar el cliente');
      console.error('Error deleting customer:', err);
    }
  };

  const handleEditCustomer = (customerId) => {
    setEditCustomerId(customerId);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Identificación</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="py-2 px-4 border-b">{customer.id}</td>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{parseInt(customer.telefono)}</td>
              <td className="py-2 px-4 border-b">{customer.direccion}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.identification_card}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  Eliminar
                </button>
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => handleEditCustomer(customer.id)}
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editCustomerId && <EditCustomer customerId={editCustomerId} />}
    </div>
  );
};

export default Customers;
