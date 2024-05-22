import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Payment = () => {
  const [creditCard, setCreditCard] = useState({
    card_number: '',
    expiration_date: '',
    cvv: ''
  });
  const [orderId, setOrderId] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    } else {
      toast.error('No estás autenticado. Por favor, inicia sesión.');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://sa-e-commercecompany-1p24-eg5f.onrender.com/payments/',
        {
          order_id: orderId,
          credit_card: creditCard
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Pago procesado exitosamente');
      console.log('Pago procesado exitosamente:', response.data);
    } catch (error) {
      toast.error('Error al procesar el pago. Por favor, inténtalo de nuevo.');
      console.error('Error al procesar el pago:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCreditCard({
      ...creditCard,
      [name]: value
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-6">Procesar Pago</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderId">
            ID de la Orden:
          </label>
          <input
            type="text"
            id="orderId"
            name="orderId"
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cardNumber">
            Número de Tarjeta:
          </label>
          <input
            type="text"
            id="cardNumber"
            name="card_number"
            value={creditCard.card_number}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="expirationDate">
            Fecha de Expiración:
          </label>
          <input
            type="text"
            id="expirationDate"
            name="expiration_date"
            value={creditCard.expiration_date}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="cvv">
            CVV:
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={creditCard.cvv}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Procesar Pago
        </button>
      </form>
    </div>
  );
};

export default Payment;
