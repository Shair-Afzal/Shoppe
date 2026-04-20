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
  UpdateSellerProfile,
  UpdateProfilepic,
  AllUsers,
  AllSellers,
  ToggleBlock,
  SellerStatus
  
} from '../Action/Authaction.js';

const initialState = {
  user: null,
  authenticated: false,
  error: null,
  loading: false,
  accesstoken: null,
  resetToken:null,
  seller:null,
  allusers:[],
  allSellers:[],
  currentPage: 1,
  totalPages: 1,
  isfetchMore:false,
  scurrentpage:1,
  stotalpage:1,
  sisfetchmore:false,
  totalusers:0,
  totalsellers:0

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
    state.seller=null;
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
        state.seller=null
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
       .addCase(UpdateProfilepic.pending,(state,action)=>{
        state.loading=true;
        state.error=null
      })
      .addCase(UpdateProfilepic.fulfilled,(state,action)=>{
        state.loading=false;
        state.error=null;
        state.user=action.payload
      })
      .addCase(UpdateProfilepic.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })
      .addCase(AllUsers.pending,(state,action)=>{
        if(action.meta.arg.page === 1){
        state.loading=true;
        }else{
          state.isfetchMore=true
        }
      })
      .addCase(AllUsers.fulfilled,(state,action)=>{
        const { docs, page, totalPages,totalDocs} = action.payload;
         if (page === 1) {
    state.allusers = docs; 
  } else {
     const newUsers = docs.filter(
      newUser => !state.allusers.some(u => u._id === newUser._id)
    );
    state.allusers = [...state.allusers, ...newUsers]; 
  }
state.totalusers=totalDocs
  state.currentPage = page;
  state.totalPages = totalPages;

  state.loading = false;
  state.isfetchMore = false;
      })
      .addCase(AllUsers.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })
      .addCase(AllSellers.pending,(state,action)=>{
        if(action.meta.arg.page === 1){
        state.loading=true;
        }else{
          state.sisfetchmore=true
        }
      })
      .addCase(AllSellers.fulfilled,(state,action)=>{
                const { docs, page, totalPages,totalDocs } = action.payload;
                 if (page === 1) {
    state.allSellers = docs; 
  } else {
     const newUsers = docs.filter(
      newUser => !state.allSellers.some(u => u._id === newUser._id)
    );
  
    state.allSellers = [...state.allSellers, ...newUsers];
  }
  state.totalsellers=totalDocs
    state.scurrentpage=page
    state.stotalpage=totalPages
        state.loading=false;
        state.error=null;
        state.sisfetchmore = false;

       
      })
      .addCase(AllSellers.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"some think is wrong"
        
      })

      .addCase(ToggleBlock.pending,(state,action)=>{
        state.loading=true;

      })
      .addCase(ToggleBlock.fulfilled,(state,action)=>{
        state.loading=false;
        const updatedUser=action.payload;
        state.allusers = state.allusers.map(user =>
    user._id === updatedUser._id ? updatedUser : user
  );
        state.error=null
      })
      .addCase(ToggleBlock.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload||"somethink going to be wrong"

      })
      .addCase(SellerStatus.pending, (state) => {
  state.loading = true;
})

.addCase(SellerStatus.fulfilled, (state, action) => {
  state.loading = false;

  const updatedSeller = action.payload;


  state.allSellers = state.allSellers.map(item =>
    item._id === updatedSeller._id ? updatedSeller : item
  );
})

.addCase(SellerStatus.rejected, (state, action) => {
  state.loading = false;
  state.error = action.payload;
})

  },
});

export default userslice.reducer;
export const {setAccessToken,logout} = userslice.actions
