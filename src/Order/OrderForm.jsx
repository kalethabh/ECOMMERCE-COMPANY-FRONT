import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CreateOrderForm = () => {
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://your-api-endpoint.com/orders/',
        {
          customer_id: customerId,
          items: [{ product_id: productId, quantity: parseInt(quantity) }]
        },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json'
          }
        }
      );
      toast.success('Order created successfully!');
      console.log('Response:', response.data);
      // Lógica adicional después de crear la orden, si es necesario
    } catch (error) {
      console.error('Error creating order:', error);
      toast.error('Error creating order. Please try again.');
    }
  };

  return (
    <div>
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="customerId">Customer ID:</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="productId">Product ID:</label>
          <input
            type="text"
            id="productId"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Order</button>
      </form>
    </div>
  );
};

export default CreateOrderForm;
