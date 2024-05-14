const Home = () => {
  return (
    <div className="flex items-center justify-center h-[30em]">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-900 text-center mb-8">
          Bienvenido a ECOMMERCE-COMPANY
        </h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Descubre una amplia variedad de productos para todas tus necesidades.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Productos de Calidad
            </h2>
            <p className="text-gray-700">
              Trabajamos con proveedores de confianza para ofrecerte productos de la mejor calidad.
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Envío Rápido y Seguro
            </h2>
            <p className="text-gray-700">
              Entregamos tus pedidos de forma rápida y segura, para que los recibas lo antes posible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
