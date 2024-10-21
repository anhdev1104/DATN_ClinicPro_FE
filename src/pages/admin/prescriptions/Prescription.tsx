import AddPrescriptions from './components/AddPrescriptions';
import ListPrescriptions from './components/ListPrescriptions';
import { useState } from 'react';

const Prescription = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(!navigate);
  };

  return (
    <div>
      {!navigate ? <ListPrescriptions navigate={handleNavigate} /> : <AddPrescriptions navigate={handleNavigate} />}
    </div>
  );
};

export default Prescription;
