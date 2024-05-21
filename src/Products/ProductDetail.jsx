import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');
  const [reviews, setReviews] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

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

    const generateFakeReviews = () => {
      const fakeReviews = [];
      for (let i = 0; i < 10; i++) {
        fakeReviews.push({
          id: i + 1,
          rating: Math.floor(Math.random() * 5) + 1, // Rating entre 1 y 5
          comment: `¡Producto genial! Lo recomendaría totalmente. La calidad es excelente y el envío fue rápido.`,
          user: `Usuario${i + 1}`
        });
      }
      setReviews(fakeReviews);
    };

    const fetchRecommendedProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products?limit=4&offset=0`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setRecommendedProducts(response.data);
      } catch (err) {
        setError('Error fetching recommended products');
        console.error('Error fetching recommended products:', err);
      }
    };

    if (productId) {
      fetchProduct();
      generateFakeReviews();
      fetchRecommendedProducts();
    }
  }, [productId]);

  if (!productId) {
    return <div>No product ID provided</div>;
  }

  if (error) {
    return <div>Error fetching product details: {error}</div>;
  }

  if (!product || !recommendedProducts) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Detalle del producto */}
      <div className="flex flex-col md:flex-row items-start justify-center md:justify-between">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full h-auto md:max-w-md rounded-lg shadow-md border border-gray-200" />
        </div>
        <div className="md:w-1/2 md:pl-8">
            <p className="text-lg ml-20">{product.id}</p>
          <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
          <p className="text-lg mb-4 text-gray-700">{product.description}</p>
          <div className="mb-4">
    
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Precio:</p>
            <p className="text-lg">${product.price}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Disponibilidad:</p>
            <p className="text-lg">{product.availability ? 'Disponible' : 'No disponible'}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Envío:</p>
            <p className="text-lg">{product.shipping || 'Envío gratuito'}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Ventas:</p>
            <p className="text-lg">{product.sales || 72}</p>
          </div>
          <div className="mb-4">
            <p className="text-lg font-semibold mb-2">Ubicación:</p>
            <p className="text-lg">{product.location || 'Colom'}</p>
          </div>
          {/* Botón "Comprar" */}
          <button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md shadow-md transition duration-300 ease-in-out">
            Comprar
          </button>
        </div>
      </div>
      
      {/* Sección de productos recomendados */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Productos Recomendados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {recommendedProducts.map(recommendedProduct => (
            <div key={recommendedProduct.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <Link to={`/products/${recommendedProduct.id}`}>
                <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-64 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{recommendedProduct.name}</h3>
                  <p className="text-gray-700">{recommendedProduct.description}</p>
                  <p className="text-gray-800 font-bold mt-2">${recommendedProduct.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Sección de reseñas */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reseñas de Clientes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((review, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex items-center mb-2">
                {Array.from(Array(review.rating)).map((_, i) => (
                  <span key={i} className="text-yellow-500 mr-1">&#9733;</span>
                ))}
                <span className="text-gray-700">{review.rating}</span>
              </div>
              <p className="text-gray-700 mb-2">{review.comment}</p>
              <p className="text-gray-500">Por: {review.user}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
