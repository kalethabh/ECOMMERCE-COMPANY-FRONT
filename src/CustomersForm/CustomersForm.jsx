import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import OrderForm from '../Order/OrderForm'; 

const CustomersForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    direccion: '',
    email: '',
    identification_card: ''
  });

  const [token, setToken] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const formRef = useRef(null); // Ref para el formulario

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
    }

    // Manejador de clics fuera del formulario
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onClose(); // Llamar la función onClose para cerrar el formulario
      }
    };

    // Agregar evento
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Limpiar evento
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

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
      toast.success('¡Datos guardados exitosamente!');
      console.log('Response:', response.data);
      setShowPaymentForm(true);
    } catch (error) {
      console.error('Error al guardar los datos:', error);
      toast.error('Error al guardar los datos. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {!showPaymentForm && (
        <div ref={formRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative">
          <h2 className="text-2xl font-semibold mb-4">Registra tus datos</h2>
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
      {showPaymentForm && (
        <div ref={formRef} className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg mx-4 relative">
          <h2 className="text-2xl font-semibold mb-4">Siguiente</h2>
          <OrderForm />
        </div>
      )}
    </div>
  );
};

export default CustomersForm;
