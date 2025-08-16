import * as Yup from 'yup';
 const userSchema = Yup.object().shape({
   
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    phone: Yup.string()
    .required('Phone number is required')
    .matches(
      /^(\+?\d{1,4}[-\s]?)?\(?\d{2,4}\)?[-\s]?\d{3,4}[-\s]?\d{3,4}$/,
      'Enter a valid phone number'
    ),
  });
  const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
     .trim()
    .oneOf(['2234'], 'Invalid password')
    
});
 const ConfirmPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('New Password is required'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});
  const initialValues = {
  email: '',
  password: '',
  phone: '',
};
const ConfirmPasswordvalues = {
    newPassword: '',
    repeatPassword: '',
  };
export { initialValues, userSchema, LoginSchema, PasswordSchema,ConfirmPasswordSchema,ConfirmPasswordvalues };
export default userSchema;
