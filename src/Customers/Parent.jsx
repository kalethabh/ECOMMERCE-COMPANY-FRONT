import { useState } from 'react';
import EditCustomer from './EditCustomer'; // Asegúrate de que la ruta sea correcta

const ParentComponent = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [customerId, setCustomerId] = useState(null);

  const handleEdit = (id) => {
    setCustomerId(id);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  return (
    <div>
      <button onClick={() => handleEdit(1)}>Editar Cliente</button> {/* Cambia el ID según necesites */}
      {isEditing && (
        <EditCustomer customerId={customerId} onCancel={handleCancel} />
      )}
    </div>
  );
};

export default ParentComponent;
