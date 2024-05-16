import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Limpiar el token del localStorage
    localStorage.removeItem('token');
    // Redirigir al usuario a la página de inicio
    navigate('/');
  };

  return (
    <button onClick={handleLogout} className="text-gray-600 hover:text-gray-800">
      Cerrar sesión
    </button>
  );
};

export default Logout;
