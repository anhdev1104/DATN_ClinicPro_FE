import BaseIcon from '@/components/base/BaseIcon';
import BaseButton from '@/components/base/button';
import BaseInput from '@/components/base/input';
import { resolveErrorResponse } from '@/helpers/utils';
import { Form, former } from '@/lib/form';
import { AxiosBaseQueryError } from '@/lib/utils/axiosBaseQuery';
import yup from '@/lib/utils/yup';
import { useCreateServiceMutation } from '@/redux/api/services';
import { IconBrandAws, IconCurrencyDong, IconPlus } from '@tabler/icons-react';
import { useFormContext } from 'react-hook-form';
import toast from 'react-hot-toast';

const createServiceSchema = yup.object({
  service_name: yup.string().required(),
  description: yup.string(),
  price: yup.number().required(),
});
export type CreateServices = yup.InferType<typeof createServiceSchema>;
const CreateServices = ({ close }: { close: () => void }) => {
  const {
    setError,
    formState: { disabled },
  } = useFormContext<CreateServices>();
  const [handleCreate] = useCreateServiceMutation();
  const handleCreateService = async (data: CreateServices) => {
    const response = await handleCreate(data);
    if (response.data) {
      toast.success(response.data.message);
      close();
      return;
    }
    resolveErrorResponse((response.error as AxiosBaseQueryError).data, setError);
  };
  return (
    <Form withAutoValidate onSubmit={handleCreateService}>
      <BaseInput.Group
        name="service_name"
        autoComplete="service_name"
        placeholder="Tên dịch vụ"
        label="Tên dịch vụ"
        leftSection={<BaseIcon icon={IconBrandAws} />}
        withAsterisk
      />
      <BaseInput.Number
        name="price"
        autoComplete="price"
        placeholder="Giá dịch vụ"
        label="Giá dịch vụ"
        thousandSeparator=","
        suffix=" VND"
        leftSection={<BaseIcon icon={IconCurrencyDong} />}
        withAsterisk
      />
      <BaseInput.Textarea name="description" autoComplete="description" placeholder="Mô tả" label="Mô tả" />
      <BaseButton
        loading={disabled}
        disabled={disabled}
        type="submit"
        className="ml-auto flex"
        rightSection={<BaseIcon icon={IconPlus} />}
      >
        Thêm
      </BaseButton>
    </Form>
  );
};
const CreateServicesComponent = former(CreateServices, createServiceSchema, { mode: 'onChange' });
export default CreateServicesComponent;
