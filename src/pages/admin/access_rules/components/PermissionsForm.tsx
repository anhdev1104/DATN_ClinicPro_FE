import { CloseIcon } from '@/components/icons';
import MessageForm from '@/components/message';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { useGetActionQuery } from '@/redux/api/action';
import {
  useAddPermissionsMutation,
  useGetPermissionsDetailQuery,
  useUpdatePermissionsMutation,
} from '@/redux/api/permissions';
import { permissionSchema } from '@/schema/permission.schema';
import { ICreatePermissions } from '@/types/permissions.type';
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

type TPermissionsForm = {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  idPermissions: string;
};

const PermissionsForm = ({ open, onClose, isEdit, idPermissions }: TPermissionsForm) => {
  const { data: permissionsDetail } = useGetPermissionsDetailQuery(idPermissions);
  const [handleCreate] = useAddPermissionsMutation();
  const [handleUpdate] = useUpdatePermissionsMutation();
  const { data: actionsData } = useGetActionQuery();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors, isSubmitting },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(permissionSchema),
    defaultValues: {
      name: permissionsDetail?.data.name || '',
      description: permissionsDetail?.data.description || '',
      actions:
        permissionsDetail?.data.permission_actions?.map(permission => ({
          action_id: permission.action_id,
        })) || [],
    },
  });

  const handleSubmitForm: SubmitHandler<ICreatePermissions> = async data => {
    if (!isValid) return;
    const newData = {
      name: data.name.toUpperCase(),
      description: data.description,
      actions: data.actions,
    };
    const res = await handleCreate(newData);
    if (res.data) {
      reset({
        name: '',
        description: '',
        actions: [],
      });
      toast.success('Tạo thành công một quyền mới.');
      return onClose();
    }
    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
  };

  useEffect(() => {
    if (!isEdit) {
      reset({
        name: '',
        description: '',
        actions: [],
      });
    } else {
      reset({
        name: (permissionsDetail && permissionsDetail?.data.name) ?? '',
        description: (permissionsDetail && permissionsDetail?.data.description) ?? '',
        actions:
          permissionsDetail?.data.permission_actions?.map(permission => ({
            action_id: permission.action_id,
          })) || [],
      });
    }
  }, [permissionsDetail, isEdit, reset]);

  const handleUpdatePermissions: SubmitHandler<ICreatePermissions> = async data => {
    if (!isValid) return;
    const newDataUpdate = {
      id: idPermissions,
      name: data.name.toUpperCase(),
      description: data.description,
      actions: data.actions,
    };
    const res = await handleUpdate(newDataUpdate);
    if (res.data) {
      reset({
        name: '',
        description: '',
        actions:
          permissionsDetail?.data.permission_actions?.map(permission => ({
            action_id: permission.action_id,
          })) || [],
      });
      toast.success('Cập nhật thành công quyền.');
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
          description: '',
          actions: [],
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
        onSubmit: handleSubmit(isEdit ? handleUpdatePermissions : handleSubmitForm),
      }}
    >
      <div
        className="mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 !w-fit ml-auto rounded-full absolute right-4 top-2"
        onClick={() => {
          reset({
            name: '',
            description: '',
          });
          onClose();
        }}
      >
        <CloseIcon />
      </div>
      <Box sx={{ p: '20px' }}>
        <DialogTitle sx={{ fontWeight: 600, p: 0 }}> {isEdit ? 'Sửa quyền' : 'Tạo quyền'} </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ fontSize: '14px', mt: '25px', fontWeight: 550, mb: '3px' }}>Tên</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue={getValues('name') || ''}
            render={({ field }) => (
              <>
                <input {...field} placeholder="Nhập vào tên quyền" className="appointment-input text-[#333]" />
                <MessageForm error={errors.name?.message} className="!mt-0 !text-[10px]" />
              </>
            )}
          />
          <Typography sx={{ fontSize: '14px', mt: '10px', fontWeight: 550, mb: '3px' }}>Mô tả</Typography>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <>
                <input {...field} placeholder="Mô tả cho nội dung quyền" className="appointment-input text-[#333]" />
                <MessageForm error={errors.description?.message} className="!mt-0 !text-[10px]" />
              </>
            )}
          />
          <FormGroup>
            <Stack direction={'row'} alignItems={'center'} flexWrap={'wrap'}>
              {actionsData &&
                actionsData.data.map(action => (
                  <Controller
                    key={action.id}
                    name="actions"
                    control={control}
                    render={({ field }) => (
                      <FormControlLabel
                        control={
                          <Checkbox
                            value={action.id}
                            checked={field.value?.some(act => act.action_id === action.id) || false}
                            onChange={e => {
                              const checked = e.target.checked;

                              field.onChange(
                                checked
                                  ? [...(field.value || []), { action_id: action.id }]
                                  : field.value?.filter(act => act.action_id !== action.id),
                              );
                            }}
                          />
                        }
                        label={action.name}
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
        <Button loading={isSubmitting} type="submit" color={(isEdit && 'yellow') || ''}>
          {isEdit ? 'Cập nhật' : 'Xác nhận'}
        </Button>
      </Stack>
    </Dialog>
  );
};

export default PermissionsForm;
