import { useState } from 'react';
import ListMedicalHistories from './components/ListMedicalHistories';
import AddMedicalHistories from './components/AddMedicalHistories';

const MedicalHistories = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(!navigate);
  };
  return (
    <div>
      {!navigate ? (
        <ListMedicalHistories navigate={handleNavigate} />
      ) : (
        <AddMedicalHistories navigate={handleNavigate} />
      )}
    </div>
  );
};

export default MedicalHistories;
