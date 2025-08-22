import { useNavigation } from "@react-navigation/native";
import { createSlice } from "@reduxjs/toolkit";
// const navigation=useNavigation()
const initialState = {
  user: null,
  authenticated: false,
  tempEmail: null,   
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createAccount: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.tempEmail=null
    },
    setLoginEmail: (state, action) => {
      state.tempEmail = action.payload;  
    },
    loginWithPassword: (state, action) => {
      const  password  = action.payload;
      const email = state.tempEmail;

      if (
        state.user &&
        state.user.email === email &&
        state.user.password === password
      ) {
        state.authenticated = true;
        state.tempEmail = null; 
        // navigation.navigate('OnBonding')
        
      } else {
        throw new Error("Invalid credentials");
      }
    },
    forgetpassword:(state,action)=>{
       const newPassword = action.payload;
      if(state.user){
      state.user.password =newPassword;
      state.authenticated=false;
      state.tempEmail=null
      }
    },
    logout: (state) => {
      state.user = null;

      state.authenticated = false;
      state.tempEmail = null;
    },
  },
});

export const { createAccount, setLoginEmail, loginWithPassword, logout,forgetpassword } =
  authSlice.actions;
export default authSlice.reducer;
