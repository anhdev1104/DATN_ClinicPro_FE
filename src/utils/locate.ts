import * as yup from 'yup';

yup.setLocale({
  mixed: {
    required: 'trường này là bắt buộc',
  },
  string: {
    email: 'trường này phải là email',
    min: ({ min }) => `trường này phải tối thiểu ${min} ký tự`,
    max: ({ max }) => `trường này phải tối đa ${max} ký tự`,
    length: ({ length }) => `độ dài chỉ được ${length} ký tự`,
  },
});

export default yup;
