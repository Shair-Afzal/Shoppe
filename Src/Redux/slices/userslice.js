import { createSlice } from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';

const initialState = {
  user: null,
  authenticated: false,
  tempEmail: null,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.authenticated = true;
      state.tempEmail = null;
      state.error = null;
    },
    setLoginEmail: (state, action) => {
      state.tempEmail = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearUser: state => {
      state.user = null;
      state.authenticated = false;
      state.tempEmail = null;
      state.error = null;
    },
  },
});

export const { setUser, setLoginEmail, setError, clearUser } =
  authSlice.actions;

export const createAccount =
  ({ email, password }) =>
  async dispatch => {
    try {
      const res = await auth().createUserWithEmailAndPassword(email, password);
      dispatch(setUser(res.user));
      return { success: true };
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        dispatch(setError('This email is already registered. Please log in.'));
      } else {
        dispatch(setError(err.message));
      }
      return { success: false, error: err.message };
    }
  };

export const loginWithPassword =
  ({ email, password }) =>
  async dispatch => {
    try {
      const res = await auth().signInWithEmailAndPassword(email, password);
      dispatch(setUser(res.user));
      return { success: true };
    } catch (err) {
      dispatch(setError(err.message));
      return { success: false, error: err.message };
    }
  };

export const forgetpassword = email => async dispatch => {
  try {
    await auth().sendPasswordResetEmail(email);
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export const logout = () => async dispatch => {
  try {
    await auth().signOut();
    dispatch(clearUser());
  } catch (err) {
    dispatch(setError(err.message));
  }
};

export default authSlice.reducer;
