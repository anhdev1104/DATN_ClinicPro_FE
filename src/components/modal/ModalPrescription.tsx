import convertTime from '@/helpers/convertTime';
import convertGender from '@/helpers/convertToGender';
import prettyId from '@/helpers/prettyId';
import { IPrescriptions } from '@/types/prescription.type';
import { Box, Dialog, DialogContent, DialogTitle, Stack, Typography } from '@mui/material';
import { FileDownloadIcon } from '../icons';
import React from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

interface IModalPrescription {
  open: boolean;
  onClose: () => void;
  detailMedication: IPrescriptions;
}

const ModalPrescription = React.forwardRef(({ open, onClose, detailMedication }: IModalPrescription, ref: any) => {
  if (Object.keys(detailMedication).length === 0) return;

  const formatDob = (dob: string) => {
    const year = dob?.split('-')[0];
    const month = dob?.split('-')[1];
    const day = dob?.split('-')[2];
    return `${day}/${month}/${year}`;
  };

  const separateDate = () => {
    const flatDate = detailMedication.created_at && convertTime(detailMedication?.created_at, true);
    const day = flatDate?.split('/')[0];
    const month = flatDate?.split('/')[1];
    const year = flatDate?.split('/')[2];
    return {
      day,
      month,
      year,
    };
  };

  const handleDowloadPrescription = async () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: 'a4',
    });
    const content = ref.current.querySelector('.MuiBox-root');

    if (content) {
      try {
        const canvas = await html2canvas(content, {
          scale: 2,
          logging: true,
        });
        const imgData = canvas.toDataURL('image/jpeg');

        const pageWidth = pdf.internal.pageSize.width;
        // const pageHeight = pdf.internal.pageSize.height;

        const imgWidth = pageWidth - 20;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(imgData, 'JPEG', 10, 10, imgWidth, imgHeight);

        pdf.save('donthuoc-clinicpro.pdf');
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '6px',
          maxWidth: '35%',
          width: '100%',
          overflow: 'visible',
        },
        autoComplete: 'off',
      }}
      ref={ref}
    >
      <Box sx={{ color: '#333', p: '22px' }}>
        <Stack direction="row" justifyContent="space-between">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            <img src="/images/logo.png" alt="" className="w-10" />
            <Typography sx={{ textAlign: 'left', fontSize: '13px' }}>
              Phòng khám{' '}
              <Typography sx={{ color: '#116aef', fontWeight: 600, fontSize: '13px' }} component="span">
                ClinicPro
              </Typography>
            </Typography>
          </Box>
          <Box sx={{ textAlign: 'left' }}>
            <Typography sx={{ fontSize: '13px' }}>
              Hồ sơ bệnh án: {prettyId(detailMedication?.medical_histories?.id)}
            </Typography>
            <Typography sx={{ fontSize: '13px' }}>
              Ngày khám: {detailMedication?.created_at && convertTime(detailMedication?.created_at)}
            </Typography>
          </Box>
        </Stack>
        <DialogTitle sx={{ fontSize: '25px', fontWeight: 600, mb: '15px', textAlign: 'center' }}>ĐƠN THUỐC</DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ textAlign: 'left', fontSize: '14px' }}>
            Họ và tên: <b className="uppercase text-sm">{detailMedication?.patient?.patient_info?.fullname}</b>
          </Typography>
          <Stack direction="row" justifyContent="space-between" sx={{ mt: '5px' }}>
            <Typography sx={{ fontSize: '14px' }}>
              Ngày sinh: {formatDob(detailMedication?.patient?.patient_info?.dob)}
            </Typography>
            <Typography sx={{ fontSize: '14px' }}>
              Giới tính: {convertGender(detailMedication?.patient?.patient_info?.gender)}
            </Typography>
          </Stack>
          <Typography sx={{ mt: '5px', fontSize: '14px' }}>
            Địa chỉ: {detailMedication?.patient?.patient_info?.address}
          </Typography>
        </DialogContent>
        <Typography sx={{ mt: '15px', fontSize: '14px' }}>
          Chẩn đoán: <b className="italic">{detailMedication?.medical_histories?.diagnosis}</b>
        </Typography>
        <DialogContent sx={{ height: '130px', overflowY: 'auto', pt: 0, mt: '20px' }} className="scroll-select">
          {detailMedication?.medications &&
            detailMedication?.medications?.map((med, index) => (
              <Stack direction="row" justifyContent="space-between" marginBottom={'8px'} key={med?.id}>
                <Box sx={{ maxWidth: '68%' }}>
                  <Typography sx={{ fontSize: '13px', fontWeight: 500, color: 'black' }}>
                    {index + 1}/. {med?.medication.name}
                  </Typography>

                  <Typography sx={{ fontSize: '13px', fontStyle: 'italic', color: '#666' }}>
                    HDSD: {med?.instructions}
                  </Typography>
                </Box>
                <Typography sx={{ fontSize: '13px', maxWidth: '65%' }}>
                  {med?.quantity} viên / {med?.duration} lần
                </Typography>
              </Stack>
            ))}
        </DialogContent>
        <Box sx={{ border: '1px dashed #ccc', mt: '18px' }}></Box>
        <Typography sx={{ fontSize: '13px', mt: '10px' }}>Lời dặn: {detailMedication?.description}</Typography>
        <Stack
          direction={'column'}
          justifyContent="end"
          mt={'10px'}
          width="240px"
          ml={'auto'}
          sx={{ textAlign: 'center' }}
        >
          <Typography sx={{ fontSize: '13px' }}>
            Đà Nẵng, ngày {separateDate().day}, tháng {separateDate().month}, năm {separateDate().year}
          </Typography>
          <Typography component="div" sx={{ fontWeight: 600, fontSize: '13px' }}>
            Bác sĩ điều trị
          </Typography>
          <Typography sx={{ mt: '70px', fontStyle: 'italic', fontWeight: 600, fontSize: '14px' }}>
            {detailMedication?.user?.user_info?.fullname}
          </Typography>
        </Stack>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: -50,
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '100%',
          transition: 'all ease .3s',
          ':hover': {
            bgcolor: '#d0e1fb',
          },
        }}
        title="Tải xuống đơn thuốc"
        onClick={handleDowloadPrescription}
      >
        <FileDownloadIcon />
      </Box>
    </Dialog>
  );
});

export default ModalPrescription;
