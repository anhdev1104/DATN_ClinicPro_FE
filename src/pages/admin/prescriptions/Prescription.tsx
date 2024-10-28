import PrescriptionProvider from '@/providers/PrescriptionProvider';
import AddPrescriptions from './components/AddPrescriptions';
import ListPrescriptions from './components/ListPrescriptions';
import { useState } from 'react';

const Prescription = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(!navigate);
  };

  return (
    <PrescriptionProvider>
      {!navigate ? <ListPrescriptions navigate={handleNavigate} /> : <AddPrescriptions navigate={handleNavigate} />}
    </PrescriptionProvider>
  );
};

export default Prescription;
