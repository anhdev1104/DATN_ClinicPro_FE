import AddPackage from './component/AddPackage';
import ListPackage from './component/ListPackage';
import { useState } from 'react';

const Prescription = () => {
  const [navigate, setNavigate] = useState(false);

  const handleNavigate = () => {
    setNavigate(!navigate);
  };

  return <div>{!navigate ? <ListPackage navigate={handleNavigate} /> : <AddPackage navigate={handleNavigate} />}</div>;
};

export default Prescription;
