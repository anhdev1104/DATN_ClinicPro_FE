import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { resolveErrorResponse } from '@/helpers/utils';
import { Formik, FormikHandler } from '@/lib/form';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import yup from '@/lib/utils/yup';
import { useUpdateServiceMutation } from '@/redux/api/services';
import { Services } from '@/types/services.type';
import { IconPencil } from '@tabler/icons-react';
import toast from 'react-hot-toast';

const updateServiceSchema = yup.object({
  service_name: yup.string().required(),
  description: yup.string(),
  price: yup.number().required(),
});
export type UpdateServices = yup.InferType<typeof updateServiceSchema>;
interface UpdateServiceProps extends Services {
  close: () => void;
}
export default function UpdateService({ close, ...props }: UpdateServiceProps) {
  const [handleUpdate] = useUpdateServiceMutation();
  const handleUpdateService: FormikHandler<UpdateServices> = async (data, { setError }) => {
    const response = await handleUpdate({ id: props.id, ...data });
    if (response.data) {
      toast.success(response.data.message);
      close();
      return;
    }
    resolveErrorResponse((response.error as AxiosBaseQueryError).data, setError);
  };
  return (
    <Formik
      withAutoValidate
      onSubmit={handleUpdateService}
      schema={updateServiceSchema}
      options={{ defaultValues: updateServiceSchema.safeParse(props) }}
    >
      {({ formState: { disabled } }) => (
        <>
          <BaseInput.Group
            name="service_name"
            autoComplete="service_name"
            placeholder="Tên dịch vụ"
            label="Tên dịch vụ"
            withAsterisk
          />
          <BaseInput.Number
            name="price"
            autoComplete="price"
            placeholder="Giá dịch vụ"
            label="Giá dịch vụ"
            thousandSeparator=","
            suffix=" VND"
            withAsterisk
          />
          <BaseInput.Textarea name="description" autoComplete="description" placeholder="Mô tả" label="Mô tả" />
          <BaseButton
            loading={disabled}
            disabled={disabled}
            type="submit"
            className="ml-auto flex"
            rightSection={<BaseIcon icon={IconPencil} />}
          >
            Cập Nhật
          </BaseButton>
        </>
      )}
    </Formik>
  );
}
