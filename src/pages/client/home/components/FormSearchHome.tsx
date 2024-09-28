import { Button } from '@/components/button';
import Field from '@/components/field';
import { SearchIcon } from '@/components/icons';
import Input from '@/components/input';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  search: yup.string().required('Chưa nhập vào từ khoá tìm kiếm !'),
});

const FormSearchHome = () => {
  const {
    handleSubmit,
    control,
    formState: { isDirty },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const handleSearch: SubmitHandler<{ search: string }> = async query => {
    console.log(query);
    reset();
  };

  return (
    <section className="container-page">
      <div
        className="w-full bg-white px-[45px] pt-9 pb-[42px] z-10 rounded-[29px] -translate-y-2/4"
        style={{ boxShadow: '0px 30px 40px #00405315' }}
      >
        <form onSubmit={handleSubmit(handleSearch)}>
          <Field className="flex items-center gap-3">
            <Input control={control} name="search" placeholder="Tìm phòng khám hoặc bác sĩ ..." isGlass />
            <button
              type="submit"
              className={`w-[53px] h-[48px] flex items-center justify-center bg-primary rounded-[9px] transition-all duration-300 ease-linear ${!isDirty ? 'opacity-50 pointer-events-none' : 'hover:scale-110'}`}
              disabled={!isDirty}
            >
              <SearchIcon className="text-white" />
            </button>
          </Field>
        </form>
        <form className="pt-[30px] flex items-center justify-between gap-12">
          <div>Tìm nhanh</div>
          <div className="flex-1 grid grid-cols-3 gap-5">
            <Button type="button" className="text-sm w-full bg-primary/60">
              Tìm bác sĩ
            </Button>
            <Button type="button" className="text-sm w-full bg-primary/60">
              Bệnh viện hoặc phòng khám
            </Button>
            <Button type="button" className="text-sm w-full">
              Đặt lịch hẹn
            </Button>
          </div>
        </form>
      </div>
      <h2 className="text-center text-[32px] text-primary font-medium mt-5 mb-5">
        Điểm đến của dịch vụ chăm sóc chất lượng cao
      </h2>
      <div className="pb-12">
        <p className="max-w-[700px] leading-7 text-center mx-auto">
          Với mạng lưới 13 bệnh viện và 4 phòng khám trên toàn quốc, Hoàn Mỹ là đơn vị y tế tư nhân hàng đầu, định hình
          văn hóa chăm sóc sức khỏe tại Việt Nam.
        </p>
      </div>
    </section>
  );
};

export default FormSearchHome;
