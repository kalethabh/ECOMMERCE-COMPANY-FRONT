import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomersForm from '../CustomersForm/CustomersForm'; // Importar el componente CustomersForm
import { useParams } from 'react-router-dom';


const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false); // Estado para controlar la visibilidad del formulario

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/${productId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setProduct(response.data);
      } catch (err) {
        setError('Error fetching product details');
        console.error('Error fetching product details:', err);
      }
    };

    if (productId) {
      fetchProduct();
    }
  }, [productId]);

  // Función para manejar el evento de clic en el botón "Comprar"
  const handleBuyButtonClick = () => {
    setIsFormVisible(true); // Mostrar el formulario al hacer clic en el botón "Comprar"
  };

  if (!productId) {
    return <div>No product ID provided</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-between">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto md:max-w-md" />
        </div>
        <div className="md:w-1/2 md:pl-8">
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-2xl font-bold mb-4">${product.price}</p>
          {/* Añadir el manejador de eventos al botón "Comprar" */}
          <button onClick={handleBuyButtonClick} className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
            Comprar
          </button>
        </div>
      </div>
      {/* Renderizar el formulario solo si isFormVisible es true */}
      {isFormVisible && <CustomersForm />}
    </div>
  );
};

export default ProductDetail;
