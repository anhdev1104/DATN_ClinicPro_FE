import { emailRegex } from '@/constants/regex';
import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Trường này là bắt buộc !',
    oneOf: ({ values }) => `Giá trị phải bắt buộc trong nhưng giá trị sau: ${values}`,
  },
  string: {
    min: ({ min }) => `Trường này phải tối thiểu ${min} ký tự.`,
    max: ({ max }) => `Trường này phải tối đa ${max} ký tự.`,
    length: ({ length }) => `Độ dài chỉ được ${length} ký tự.`,
  },
});
yup.addMethod(yup.string, 'email', function (message) {
  return this.test('email', message || 'Trường này phải là email !', value => {
    if (!value) return false;
    return emailRegex.test(value);
  });
});
export default yup;
