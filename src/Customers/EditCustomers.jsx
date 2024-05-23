import { useState, useEffect } from 'react';
import axios from 'axios';

const EditCustomers = ({ customerId, onCancelEdit }) => {
  const [customer, setCustomer] = useState({
    name: '',
    Telefono: '',
    Direccion: '',
    email: '',
    Identification_card: ''
  });  
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setCustomer(response.data);
      } catch (err) {
        setError('Error al obtener el cliente');
        console.error('Error fetching customer:', err);
      }
    };

    fetchCustomer();
  }, [customerId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.put(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/${customerId}`, {
        name: customer.name,
        Telefono: customer.telefono,
        Direccion: customer.direccion,
        email: customer.email,
        Identification_card: customer.identification_card
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        },
      });
      onCancelEdit();
    } catch (err) {
      setError('Error al actualizar el cliente');
      console.error('Error updating customer:', err);
    }
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prevCustomer => ({
      ...prevCustomer,
      [name]: value
    }));
  };

  if (!customer) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg w-96 relative z-10">
        <h2 className="text-xl font-bold mb-2">Editar Cliente</h2>
        {error && <div className="text-red-500">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Nombre</label>
            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Teléfono</label>
            <input
              type="text"
              name="telefono"
              value={customer.telefono}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Dirección</label>
            <input
              type="text"
              name="direccion"
              value={customer.direccion}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={customer.email}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Cédula de Identidad</label>
            <input
              type="text"
              name="identification_card"
              value={customer.identification_card}
              onChange={handleChange}
              className="mt-1 p-2 border rounded w-full"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Actualizar Cliente
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              onClick={onCancelEdit}
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCustomers;
