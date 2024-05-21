import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrderForm from '../Order/OrderForm'; 

const CustomersForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    direccion: '',
    email: '',
    identification_card: ''
  });

  const [token, setToken] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false); // Estado para controlar la visibilidad del formulario de pago

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      // Manejo si no hay token almacenado
      toast.error('No estás autenticado. Por favor, inicia sesión.');
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/',
        {
          name: formData.name,
          Telefono: formData.telefono,
          Direccion: formData.direccion,
          email: formData.email,
          Identification_card: formData.identification_card
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('¡Cliente guardado exitosamente!');
      console.log('Response:', response.data);
      setShowPaymentForm(true); // Mostrar el formulario de pago después de crear el cliente
    } catch (error) {
      console.error('Error al crear cliente:', error);
      toast.error('Error al crear cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      {/* Formulario de cliente */}
      {!showPaymentForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative z-10">
          <h2 className="text-2xl font-semibold mb-4">Crear Nuevo Cliente</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700">Teléfono</label>
              <input
                type="text"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="direccion" className="block text-sm font-medium text-gray-700">Dirección</label>
              <input
                type="text"
                id="direccion"
                name="direccion"
                value={formData.direccion}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label htmlFor="identification_card" className="block text-sm font-medium text-gray-700">Cédula de Identificación</label>
              <input
                type="text"
                id="identification_card"
                name="identification_card"
                value={formData.identification_card}
                onChange={handleChange}
                autoComplete="off"
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Siguiente
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Formulario de pago (sobre el formulario de cliente) */}
      {showPaymentForm && (
        <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
          <h2 className="text-2xl font-semibold mb-4">Realizar Pago</h2>
          <OrderForm />
        </div>
      )}
    </div>
  );
};

export default CustomersForm;