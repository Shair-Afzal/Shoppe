import * as Yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js/min';


const userSchema = Yup.object().shape({
  email: Yup.string().email().required('Email is required'),

  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
   username:Yup.string()
     .required("Enter username"),
   role:Yup.string()
    .required("Role is required"),
  profilepic: Yup.mixed().required("Profile image required")
     
    
});

const SellerSchema=Yup.object().shape({
  shopName:Yup.string()
  .required("ShopName is required"),
   shopDescription:Yup.string()
  .required("ShopName is required"),
  shopLogo:Yup.mixed().required(" shop Logo required")

})

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
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New Password is required'),

  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Repeat Password is required'),
});
const initialValues = {
  email: '',
  password: '',
  username: '',
  role: '',
  profilepic:null
};
const ConfirmPasswordvalues = {
  password: '',
  confirmpassword: '',
};
const otpSchema = Yup.object().shape({
  otp: Yup.string()
    .required('OTP is required')
    // .matches(/^\d+$/, 'OTP must contain only digits')
    .length(6, 'OTP must be exactly 6 digits '),
});
const Sellervalues={
  shopName:"",
  shopDescription:"",
  shopLogo:null,
}
export {
  initialValues,
  userSchema,
  LoginSchema,
  PasswordSchema,
  ConfirmPasswordSchema,
  ConfirmPasswordvalues,
  otpSchema,
  Sellervalues,
  SellerSchema
};
export default userSchema;
