import { createSlice } from '@reduxjs/toolkit';
import {
  registerAccount,
  LoginUser,
  ForgetPasword,
  VerifyOtp,
  ResetPassword,
  LogoutUser,
  RegisterSellerAccount,
  GetSeller,
  UserProfile,
  UpdateProfile,
  UpdateSellerProfile
  
} from '../Action/Authaction.js';

const initialState = {
  user: null,
  authenticated: false,
  error: null,
  loading: false,
  accesstoken: null,
  resetToken:null,
  seller:null
};

const userslice = createSlice({
  name: 'user',
  initialState,
  reducers: {
      setAccessToken:(state,action)=>{
     state.accesstoken = action.payload
  },
   logout: (state) => {
    state.user = null;
    state.accesstoken = null;
    state.authenticated = false;
  }
  },

  extraReducers: builder => {
    builder
      .addCase(registerAccount.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data;
        state.authenticated = true;
      })
      .addCase(registerAccount.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'Failed to create account. Please try again.';
      })

      .addCase(LoginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LoginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.data.user;
        state.authenticated = true;
        state.accesstoken = action.payload.data.accessToken;
      })
      .addCase(LoginUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload ||
          'Login failed. Please check your credentials and try again.';
      });

    builder

      .addCase(ForgetPasword.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ForgetPasword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ForgetPasword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'otp is not send ';
      })

      .addCase(VerifyOtp.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.resetToken=action.payload.data
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'otp is not correct';
      })

      .addCase(ResetPassword.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(ResetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(ResetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'password is not changing ';
      })
    
      .addCase(LogoutUser.pending,(state,action)=>{
        state.loading=false;
        state.error=null

      })
      .addCase(LogoutUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=null;
        state.authenticated=false;
        state.accesstoken=null
      })
      .addCase(LogoutUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"somethink going wrong"
      })

      .addCase(RegisterSellerAccount.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(RegisterSellerAccount.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.seller=action.payload.data
      })
      .addCase(RegisterSellerAccount.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"seller acount is not registerd"
      })
      .addCase(GetSeller.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(GetSeller.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.seller=action.payload
      })
      .addCase(GetSeller.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"

      })

       .addCase(UserProfile.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(UserProfile.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=action.payload
      })
      .addCase(UserProfile.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })

      .addCase(UpdateProfile.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(UpdateProfile.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=action.payload
      })
      .addCase(UpdateProfile.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })

      .addCase(UpdateSellerProfile.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(UpdateSellerProfile.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.seller=action.payload
      })
      .addCase(UpdateSellerProfile.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })

  },
});

export default userslice.reducer;
export const {setAccessToken,logout} = userslice.actions
