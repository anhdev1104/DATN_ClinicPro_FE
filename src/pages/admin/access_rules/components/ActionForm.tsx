import { CloseIcon } from '@/components/icons';
import MessageForm from '@/components/message';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { useAddActionMutation, useGetActionDetailQuery, useUpdateActionMutation } from '@/redux/api/action';
import { useGetPermissionsQuery } from '@/redux/api/permissions';
import { actionSchema } from '@/schema/permission.schema';
import { ICreateAction } from '@/types/permissions.type';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mantine/core';
import {
  Box,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Stack,
  Typography,
} from '@mui/material';
import { useEffect } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type TActionForm = {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  idAction: string;
};

const ActionForm = ({ open, onClose, isEdit, idAction }: TActionForm) => {
  const { data: actionDetail } = useGetActionDetailQuery(idAction);
  const [handleCreate] = useAddActionMutation();
  const [handleUpdate] = useUpdateActionMutation();
  const { data: permissionsData } = useGetPermissionsQuery();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(actionSchema),
    defaultValues: {
      name: actionDetail?.data.name || '',
      value: actionDetail?.data.value || '',
      permissions:
        actionDetail?.data.permission_actions?.map(permission => ({
          permission_id: permission.permission_id,
        })) || [],
    },
  });

  const handleSubmitForm: SubmitHandler<ICreateAction> = async data => {
    if (!isValid) return;
    const newData = {
      name: data.name.toUpperCase(),
      value: data.value,
      permissions: data.permissions,
    };
    const res = await handleCreate(newData);
    if (res.data) {
      reset({
        name: '',
        value: '',
        permissions: [],
      });
      toast.success('Tạo mới thành công hành động.');
      return onClose();
    }
    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
  };

  useEffect(() => {
    if (!isEdit) {
      reset({
        name: '',
        value: '',
        permissions: [],
      });
    } else {
      reset({
        name: (actionDetail && actionDetail?.data.name) ?? '',
        value: (actionDetail && actionDetail?.data.value) ?? '',
        permissions:
          (actionDetail &&
            actionDetail.data.permission_actions?.map(permission => ({
              permission_id: permission.permission_id,
            }))) ||
          [],
      });
    }
  }, [actionDetail, isEdit, reset]);

  const handleUpdateAction: SubmitHandler<ICreateAction> = async data => {
    if (!isValid) return;
    const newDataUpdate = {
      id: idAction,
      name: data.name.toUpperCase(),
      value: data.value,
      permissions: data.permissions,
    };
    const res = await handleUpdate(newDataUpdate);
    if (res.data) {
      reset({
        name: '',
        value: '',
        permissions: [],
      });
      toast.success('Cập nhật thành công hành động.');
      return onClose();
    }
    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        reset({
          name: '',
          value: '',
          permissions: [],
        });
        onClose();
      }}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          position: 'relative',
        },
        component: 'form',
        onSubmit: handleSubmit(isEdit ? handleUpdateAction : handleSubmitForm),
      }}
    >
      <div
        className="mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 !w-fit ml-auto rounded-full absolute right-4 top-2"
        onClick={() => {
          reset({
            name: '',
            value: '',
            permissions: [],
          });
          onClose();
        }}
      >
        <CloseIcon />
      </div>
      <Box sx={{ p: '20px' }}>
        <DialogTitle sx={{ fontWeight: 600, p: 0 }}> {isEdit ? 'Sửa hành động' : 'Tạo hành động'} </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ fontSize: '14px', mt: '25px', fontWeight: 550, mb: '3px' }}>Tên</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue={getValues('name') || ''}
            render={({ field }) => (
              <>
                <input {...field} placeholder="Nhập vào tên hành động" className="appointment-input text-[#333]" />
                <MessageForm error={errors.name?.message} className="!mt-0 !text-[10px]" />
              </>
            )}
          />
          <Typography sx={{ fontSize: '14px', mt: '10px', fontWeight: 550, mb: '3px' }}>Mô tả</Typography>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <>
                <input
                  {...field}
                  placeholder="Mô tả cho nội dung hành động"
                  className="appointment-input text-[#333]"
                />
                <MessageForm error={errors.value?.message} className="!mt-0 !text-[10px]" />
              </>
            )}
          />
          <FormGroup>
            <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'}>
              {permissionsData &&
                permissionsData.data.map(permission => (
                  <Controller
                    key={permission.id}
                    name="permissions"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={permission.id}
                            checked={field.value?.some(perm => perm.permission_id === permission.id) || false}
                            onChange={e => {
                              const checked = e.target.checked;

                              field.onChange(
                                checked
                                  ? [...(field.value || []), { permission_id: permission.id }]
                                  : field.value?.filter(perm => perm.permission_id !== permission.id),
                              );
                            }}
                          />
                        }
                        label={permission.name}
                        sx={{
                          '& .MuiFormControlLabel-label': {
                            fontSize: '13px',
                          },
                        }}
                      />
                    )}
                  />
                ))}
            </Stack>
          </FormGroup>
        </DialogContent>
      </Box>
      <Stack direction={'row'} justifyContent={'end'} sx={{ paddingRight: '20px', paddingBottom: '20px' }}>
        <Button loading={isSubmitting} disabled={!isDirty} type="submit" color={(isEdit && 'yellow') || ''}>
          {isEdit ? 'Cập nhật' : 'Xác nhận'}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default ActionForm;
