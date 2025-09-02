import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';


const userSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),

  countryCode: Yup.string().required('Country code is required'),

  phone: Yup.string()
    .required('Phone number is required')
    .test('is-valid-phone', 'Invalid phone number', function (value) {
      const { countryCode } = this.parent;
      if (!value || !countryCode) return false;

      try {
        const phoneNumber = parsePhoneNumberFromString(value, countryCode);
        return phoneNumber ? phoneNumber.isValid() : false;
      } catch (err) {
        return false;
      }
    })
    .test('is-correct-length', 'Phone number length is not valid', function (value) {
      const { countryCode } = this.parent;
      if (!value || !countryCode) return false;

      try {
        const phoneNumber = parsePhoneNumberFromString(value, countryCode);
        if (!phoneNumber) return false;

        // Ensures the number matches the required length for the country
        return phoneNumber.isPossible();
      } catch (err) {
        return false;
      }
    }),
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
  countryCode: 'PK',
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
export {
  initialValues,
  userSchema,
  LoginSchema,
  PasswordSchema,
  ConfirmPasswordSchema,
  ConfirmPasswordvalues,
  otpSchema,
};
export default userSchema;
