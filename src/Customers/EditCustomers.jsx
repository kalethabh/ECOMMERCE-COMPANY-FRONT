import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const EditCustomers = ({ onClose, customerId }) => {
  const [formData, setFormData] = useState({
    name: '',
    telefono: '',
    direccion: '',
    email: '',
    identification_card: ''
    // Agrega aquí otros atributos del cliente que desees actualizar
  });

  const formRef = useRef(null); // Ref para el formulario

  useEffect(() => {
    // Lógica para obtener los datos del cliente a editar y establecerlos en el estado local `formData`
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/${customerId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setFormData(response.data);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    fetchCustomerData();
  }, [customerId]);

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
      const token = localStorage.getItem('token');
      await axios.put(
        `https://sa-e-commercecompany-1p24-eg5f.onrender.com/customers/${customerId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      toast.success('¡Cliente actualizado exitosamente!');
      onClose();
    } catch (error) {
      console.error('Error updating customer:', error);
      toast.error('Error al actualizar el cliente. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Editar Cliente</h2>
      <form ref={formRef} onSubmit={handleSubmit}>
        <label htmlFor="name" className="block mb-2">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <label htmlFor="telefono" className="block mb-2">Teléfono:</label>
        <input
          type="text"
          id="telefono"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <label htmlFor="direccion" className="block mb-2">Dirección:</label>
        <input
          type="text"
          id="direccion"
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <label htmlFor="email" className="block mb-2">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        <label htmlFor="identification_card" className="block mb-2">Cédula de Identificación:</label>
        <input
          type="text"
          id="identification_card"
          name="identification_card"
          value={formData.identification_card}
          onChange={handleChange}
          className="border border-gray-300 rounded px-2 py-1 mb-2"
        />
        {/* Agrega aquí otros campos de formulario para los atributos adicionales del cliente */}
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Guardar cambios</button>
      </form>
    </div>
  );
};

export default EditCustomers;
