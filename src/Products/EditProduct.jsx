import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

const EditProduct = () => {
  const { id } = useParams(); // Obtener el ID del producto de los parámetros de la URL
  const history = useHistory(); // Obtener el objeto de historial de navegación

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    quantity: ''
  });

  useEffect(() => {
    // Función para obtener los detalles del producto por su ID
    const getProductDetails = async () => {
      try {
        const response = await axios.get(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/${id}`);
        setProduct(response.data); // Actualizar el estado del producto con los detalles recuperados
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };

    getProductDetails(); // Llamar a la función para obtener los detalles del producto al cargar el componente
  }, [id]); // Ejecutar el efecto cada vez que el ID del producto cambie

  const handleChange = (e) => {
    // Función para manejar los cambios en los campos del formulario
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value }); // Actualizar el estado del producto con los nuevos valores
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evitar que el formulario se envíe por defecto

    try {
      await axios.put(`https://sa-e-commercecompany-1p24-eg5f.onrender.com/products/${id}`, product);
      alert('Producto actualizado exitosamente'); // Mostrar una alerta de éxito
      history.push('/products'); // Redirigir al usuario de vuelta a la lista de productos
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Error al actualizar el producto'); // Mostrar una alerta de error
    }
  };

  return (
    <div className="container mx-auto mt-10 w-96">
      <h1 className="text-2xl font-bold mb-4">Editar Producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Nombre
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Descripción
          </label>
          <textarea
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Precio
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="price"
            type="number"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Cantidad
          </label>
          <input
            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantity"
            type="number"
            name="quantity"
            value={product.quantity}
            onChange={handleChange}
            required
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Guardar Cambios
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded ml-4 focus:outline-none focus:shadow-outline"
          onClick={() => history.goBack()}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditProduct;
