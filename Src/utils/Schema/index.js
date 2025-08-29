import * as Yup from 'yup';
import { parsePhoneNumberFromString } from "libphonenumber-js/min";
 const userSchema = Yup.object().shape({
   
    email: Yup.string().email().required(),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
     phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', function (value) {
      const { countryCode } = this.parent; // grab from form
      if (!value || !countryCode) return false;

      const phoneNumber = parsePhoneNumberFromString(value, countryCode);
      return phoneNumber ? phoneNumber.isValid() : false;
    }),
  countryCode: Yup.string().required('Country code is required'),
  });
  const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Enter a valid email')
    .required('Email is required'),
});
const PasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
});
 const ConfirmPasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(8, 'Password must be at least 6 characters')
    .required('New Password is required'),

  repeatPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});
  const initialValues = {
  email: '',
  password: '',
  phone: '',
   countryCode: 'PK'
};
const ConfirmPasswordvalues = {
    newPassword: '',
    repeatPassword: '',
  };
  const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    // .matches(/^\d+$/, 'OTP must contain only digits')
    .length(4, 'OTP must be exactly 4 digits '),
});
export { initialValues, userSchema, LoginSchema, PasswordSchema,ConfirmPasswordSchema,ConfirmPasswordvalues,otpSchema};
export default userSchema;
