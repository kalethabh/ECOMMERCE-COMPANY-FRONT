import { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const PaymentForm = ({ orderId, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    card_number: '',
    expiration_date: '',
    cvv: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('https://sa-e-commercecompany-1p24-eg5f.onrender.com/payments/', {
        credit_card: {
          card_number: formData.card_number,
          expiration_date: formData.expiration_date,
          cvv: formData.cvv
        },
        order_id: orderId
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      onSuccess(response.data);
    } catch (error) {
      onError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="card_number">Número de Tarjeta:</label>
        <input
          type="text"
          id="card_number"
          name="card_number"
          value={formData.card_number}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="expiration_date">Fecha de Expiración:</label>
        <input
          type="text"
          id="expiration_date"
          name="expiration_date"
          value={formData.expiration_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="cvv">CVV:</label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Procesando...' : 'Pagar'}
      </button>
    </form>
  );
};

PaymentForm.propTypes = {
  orderId: PropTypes.string.isRequired,
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
};

export default PaymentForm;
