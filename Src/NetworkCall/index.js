import axios from 'axios';
const SERVER_IP = 'http://192.168.18.20:3000';
export const serverURL = axios.create({
  baseURL: SERVER_IP,
  headers: {
    'Content-Type': 'application/json',
  },
});
export const endPoint = {
  signUp: '/signup',
  login: '/login',
  logout: '/logout',
  resetPassword: '/reset-password',
  userOTP: '/user_otp',
  updateProfile: '/update_profile',
  getProfile: '/get_profile',
  payments: '/create_payment_intent',
};