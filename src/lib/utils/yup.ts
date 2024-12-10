import { emailRegex, passwordRegex } from '@/constants/regex';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Trường này là bắt buộc !',
    oneOf: ({ values }) => `Giá trị phải bắt buộc trong nhưng giá trị sau: ${values}`,
    notNull: () => 'Giá trị này không thể null',
    notType: () => 'Giá trị không hợp lệ',
  },
  string: {
    min: ({ min }) => `Trường này phải tối thiểu ${min} ký tự.`,
    max: ({ max }) => `Trường này phải tối đa ${max} ký tự.`,
    length: ({ length }) => `Độ dài chỉ được ${length} ký tự.`,
  },
});

yup.addMethod(yup.string, 'omit', function (compare: Array<null | undefined | string>) {
  return this.transform(value => (compare.includes(value) ? undefined : value));
});

yup.addMethod(yup.object, 'safeParse', function (value) {
  return this.cast(value, { stripUnknown: true, assert: false });
});
yup.addMethod(yup.string, 'email', function (message) {
  return this.required().test({
    name: 'email',
    message: message || 'Trường này phải là email !',
    test: value => emailRegex.test(value),
  });
});
yup.addMethod(yup.string, 'password', function (message) {
  return this.required()
    .min(8)
    .test({
      name: 'password',
      message: message || 'Giá trị phải chứa 1 ký tự in hoa và 1 ký tự đặc biệt',
      test: value => passwordRegex.test(value),
    });
});
export default yup;
