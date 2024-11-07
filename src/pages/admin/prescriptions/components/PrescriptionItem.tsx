// import { CloseIcon } from '@/components/icons';
// import useToggle from '@/hooks/useToggle';
// import { Link } from 'react-router-dom';
import { Dialog } from '@mui/material';

const PrescriptionItem = () => {
  // const { show, handleToggle } = useToggle();
  return (
    <Dialog
      open={false}
      // onClose={handleToggle}
      PaperProps={{
        style: {
          backgroundColor: '#f5f5f5',
          padding: '40px',
          width: '600px',
          borderRadius: '8px',
          gap: '20px',
        },
      }}
    >
      {/* <div style={{ padding: '15px' }}>
        <h1 style={{ fontSize: '24px', marginBottom: '15px', textTransform: 'uppercase', textAlign: 'center' }}>
          Đơn thuốc: #{selectedItem.id}
        </h1>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Tên thuốc:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.medicineName}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Liều lượng:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.dosage}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Số ngày:</h1>
        <p style={{ fontSize: '12px', flex: '0 0 50%' }}>{selectedItem.days}</p>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Bệnh nhân chỉ định:</h1>
        <Link to="profile.html" style={{ display: 'flex', alignItems: 'center', fontSize: '12px', flex: '0 0 50%' }}>
          <img
            src={selectedItem.patient.img}
            style={{
              width: '30px',
              height: '30px',
              objectFit: 'cover',
              borderRadius: '9999px',
              marginRight: '8px',
            }}
            alt={selectedItem.patient.name}
          />
          <span style={{ color: '#2d3748', fontWeight: 'bold' }}>{selectedItem.patient.name}</span>
        </Link>
      </div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <h1 style={{ fontWeight: '600', flex: '0 0 50%' }}>Bác sĩ:</h1>
        <p style={{}}>
          <Link to="profile.html" style={{ display: 'flex', alignItems: 'center', fontSize: '12px', flex: '0 0 50%' }}>
            <img
              src={selectedItem.doctor.img}
              style={{
                width: '30px',
                height: '30px',
                objectFit: 'cover',
                borderRadius: '9999px',
                marginRight: '8px',
              }}
              alt={selectedItem.doctor.name}
            />
            <span style={{ color: '#2d3748', fontWeight: 'bold' }}>{selectedItem.doctor.name}</span>
          </Link>
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1 style={{ fontWeight: '600', marginBottom: '20px' }}>Hướng dẫn sử dụng:</h1>
        <p style={{ fontWeight: '300' }}>{selectedItem.instructions}</p>
      </div>

      <div style={{ position: 'absolute', top: '0', right: '0', padding: '10px', cursor: 'pointer' }} onClick={close}>
        <CloseIcon />
      </div> */}
    </Dialog>
  );
};

export default PrescriptionItem;
