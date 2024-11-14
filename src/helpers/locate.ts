import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'Trường này là bắt buộc !',
  },
  string: {
    email: 'Trường này phải là email !',
    min: ({ min }) => `Trường này phải tối thiểu ${min} ký tự.`,
    max: ({ max }) => `Trường này phải tối đa ${max} ký tự.`,
    length: ({ length }) => `Độ dài chỉ được ${length} ký tự.`,
  },
});

export default yup;
