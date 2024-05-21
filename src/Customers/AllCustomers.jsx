import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const token = localStorage.getItem('token'); // Asegúrate de tener el token almacenado
        if (!token) {
          setError('Token no encontrado');
          return;
        }

        const response = await axios.get('https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log('Response data:', response.data); // Verificar los datos recibidos
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

  const editCustomer = (id) => {
    // Lógica para editar cliente
    console.log(`Editar cliente con ID: ${id}`);
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Teléfono</th>
            <th className="py-2 px-4 border-b">Dirección</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Identificación</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b">{customer.name}</td>
              <td className="py-2 px-4 border-b">{parseInt(customer.telefono)}</td> {/* Convertir a número */}
              <td className="py-2 px-4 border-b">{customer.direccion}</td>
              <td className="py-2 px-4 border-b">{customer.email}</td>
              <td className="py-2 px-4 border-b">{customer.identification_card}</td>
              <td className="py-2 px-4 border-b flex space-x-2">
                <button 
                  className="bg-red-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => deleteCustomer(customer.id)}
                >
                  <FaTrash />
                </button>
                <button 
                  className="bg-blue-500 text-white px-3 py-1 rounded flex items-center"
                  onClick={() => editCustomer(customer.id)}
                >
                  <FaEdit />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Customers;
