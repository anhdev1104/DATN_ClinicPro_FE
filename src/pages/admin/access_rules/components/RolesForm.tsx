import { CloseIcon } from '@/components/icons';
import MessageForm from '@/components/message';
import { resolveErrorResponse } from '@/helpers/utils';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import { useGetPermissionsQuery } from '@/redux/api/permissions';
import { useAddRolesMutation, useGetRolesDetailQuery, useUpdateRolesMutation } from '@/redux/api/roles';
import { rolesSchema } from '@/schema/permission.schema';
import { ICreateRoles } from '@/types/permissions.type';
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

type TRolesForm = {
  open: boolean;
  onClose: () => void;
  isEdit: boolean;
  idRoles: string;
};

const RolesForm = ({ open, onClose, isEdit, idRoles }: TRolesForm) => {
  const [handleCreate] = useAddRolesMutation();
  const [handleUpdate] = useUpdateRolesMutation();
  const { data: rolesDetail } = useGetRolesDetailQuery(idRoles);
  const { data: permissionsData } = useGetPermissionsQuery();

  const {
    control,
    handleSubmit,
    getValues,
    formState: { isValid, errors, isSubmitting, isDirty },
    reset,
  } = useForm({
    mode: 'onSubmit',
    resolver: yupResolver(rolesSchema),
    defaultValues: {
      name: rolesDetail?.data?.name || '',
      description: rolesDetail?.data?.description || '',
      permissions:
        rolesDetail?.data?.permissions?.map(permissionAction => ({
          id: permissionAction.id,
          actions: permissionAction.actions.map(item => ({ id: item.id })),
        })) || [],
    },
  });

  const handleSubmitForm: SubmitHandler<ICreateRoles> = async data => {
    if (!isValid) return;

    const newData = {
      name: data.name.toUpperCase(),
      description: data.description,
      permissions: data.permissions.reduce((acc: any, permission) => {
        const existingPermissionIndex = acc.findIndex((p: any) => p.id === permission.id);

        if (existingPermissionIndex === -1) {
          acc.push({
            id: permission.id,
            actions: permission.actions,
          });
        } else {
          const uniqueActions = [
            ...new Set(
              [...acc[existingPermissionIndex].actions, ...permission.actions].map(action => JSON.stringify(action)),
            ),
          ].map(action => JSON.parse(action));

          acc[existingPermissionIndex].actions = uniqueActions;
        }

        return acc;
      }, []),
    };

    const res = await handleCreate(newData);

    if (res.data) {
      reset({
        name: '',
        description: '',
        permissions: [],
      });
      toast.success('Tạo mới thành công role.');
      return onClose();
    }

    resolveErrorResponse((res.error as AxiosBaseQueryError).data);
  };

  useEffect(() => {
    if (!isEdit) {
      reset({
        name: '',
        description: '',
        permissions: [],
      });
    } else {
      reset({
        name: (rolesDetail && rolesDetail?.data.name) ?? '',
        description: (rolesDetail && rolesDetail?.data.description) ?? '',
        permissions:
          rolesDetail?.data?.permissions?.map(permissionAction => ({
            id: permissionAction.id,
            actions: permissionAction.actions.map(item => ({ id: item.id })),
          })) || [],
      });
    }
  }, [rolesDetail, isEdit, reset]);

  const handleUpdateRoles: SubmitHandler<ICreateRoles> = async data => {
    if (!isValid) return;

    const formattedPermissions = data.permissions.reduce((acc: any, permission) => {
      const existingPermissionIndex = acc.findIndex((p: any) => p.id === permission.id);

      if (existingPermissionIndex === -1) {
        acc.push({
          id: permission.id,
          actions: permission.actions,
        });
      } else {
        const uniqueActions = [
          ...new Set(
            [...acc[existingPermissionIndex].actions, ...permission.actions].map(action => JSON.stringify(action)),
          ),
        ].map(action => JSON.parse(action));

        acc[existingPermissionIndex].actions = uniqueActions;
      }

      return acc;
    }, []);

    const newDataUpdate = {
      id: idRoles,
      name: data.name.toUpperCase(),
      description: data.description,
      permissions: formattedPermissions,
    };

    const res = await handleUpdate(newDataUpdate);

    if (res.data) {
      reset({
        name: '',
        description: '',
        permissions: [],
      });
      toast.success('Cập nhật thành công role.');
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
        onSubmit: handleSubmit(isEdit ? (handleUpdateRoles as any) : handleSubmitForm),
      }}
    >
      <div
        className="mb-3 transition-all ease-linear hover:bg-primaryAdmin/5 cursor-pointer p-2 !w-fit ml-auto rounded-full absolute right-4 top-2"
        onClick={() => {
          reset({
            name: '',
            description: '',
            permissions: [],
          });
          onClose();
        }}
      >
        <CloseIcon />
      </div>
      <Box sx={{ p: '20px' }}>
        <DialogTitle sx={{ fontWeight: 600, p: 0 }}> {isEdit ? 'Sửa role' : 'Tạo mới role'} </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <Typography sx={{ fontSize: '14px', mt: '25px', fontWeight: 550, mb: '3px' }}>Tên</Typography>
          <Controller
            name="name"
            control={control}
            defaultValue={getValues('name') || ''}
            render={({ field }) => (
              <>
                <input {...field} placeholder="Nhập vào tên role" className="appointment-input text-[#333]" />
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
                <input {...field} placeholder="Mô tả cho nội dung role" className="appointment-input text-[#333]" />
                <MessageForm error={errors.description?.message} className="!mt-0 !text-[10px]" />
              </>
            )}
          />
          <FormGroup sx={{ marginTop: '20px' }}>
            <Stack direction={'row'} alignItems={'flex-start'} flexWrap={'wrap'}>
              {permissionsData &&
                permissionsData.data.map(permission => (
                  <div key={permission.id} style={{ marginBottom: '15px', width: '100%' }}>
                    <Typography sx={{ fontSize: '14px', fontWeight: 600, marginBottom: '5px' }}>
                      {permission.name}
                    </Typography>
                    <Stack direction={'row'} flexWrap={'wrap'}>
                      {permission.permission_actions.map((action, index) => (
                        <Controller
                          key={action.id}
                          name="permissions"
                          control={control}
                          render={({ field }) => (
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value={action.action_id}
                                  checked={
                                    field.value?.some(
                                      perm =>
                                        perm &&
                                        perm.id === permission.id &&
                                        perm.actions &&
                                        perm.actions.some(act => act.id === action.action_id),
                                    ) || false
                                  }
                                  onChange={e => {
                                    const checked = e.target.checked;

                                    if (checked) {
                                      field.onChange([
                                        ...(field.value || []),
                                        {
                                          id: permission.id,
                                          actions: [
                                            ...(field.value?.find(perm => perm.id === permission.id)?.actions || []),
                                            { id: action.action_id },
                                          ],
                                        },
                                      ]);
                                    } else {
                                      field.onChange(
                                        (field.value || [])
                                          .map(perm => {
                                            if (perm.id === permission.id) {
                                              return {
                                                ...perm,
                                                actions:
                                                  perm.actions &&
                                                  perm.actions.filter(act => act.id !== action.action_id),
                                              };
                                            }
                                            return perm;
                                          })
                                          .filter(perm => perm.actions && perm.actions.length > 0),
                                      );
                                    }
                                  }}
                                />
                              }
                              label={`${permission.action[index].name}`}
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
                  </div>
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

export default RolesForm;
