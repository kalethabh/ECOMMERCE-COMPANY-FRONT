import { useState, useEffect } from 'react';
import axios from 'axios';

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

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      {error && <div className="text-red-500">{error}</div>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map((customer, index) => (
          <div key={index} className="border p-4 rounded">
            <h2 className="text-xl font-bold">{customer.name}</h2>
            <p>Teléfono: {parseInt(customer.telefono)}</p> {/* Convertir a número */}
            <p>Dirección: {customer.direccion}</p>
            <p>Email: {customer.email}</p>
            <p>Identificación: {customer.identification_card}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Customers;
