import { useState } from 'react';

const AddToCart = ({ product }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    // Aquí puedes implementar la lógica para agregar el producto al carrito
    console.log(`Añadido ${quantity} unidades de ${product.name} al carrito.`);
  };

  return (
    <div>
      <div className="flex items-center mb-2">
        <label htmlFor="quantity" className="mr-2">Cantidad:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={quantity}
          onChange={handleQuantityChange}
          className="border rounded px-2 py-1 w-16"
        />
      </div>
      <button
        onClick={handleAddToCart}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default AddToCart;
