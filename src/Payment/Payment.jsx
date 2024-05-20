import { useState } from 'react';

const PaymentForm = ({ orderId, onSubmit }) => {
  const [formData, setFormData] = useState({
    card_number: '',
    expiration_date: '',
    cvv: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
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
      <button type="submit">Pagar</button>
    </form>
  );
};

export default PaymentForm;
