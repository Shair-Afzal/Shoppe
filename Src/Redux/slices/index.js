import AsyncStorage from '@react-native-async-storage/async-storage';
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import authReducer from './userslice';
import userreducer from './Reducers/Authreducer.js';
import productreducer from "./Reducers/Productreducer.js"

const rootReducer = combineReducers({
  user: userreducer,
  product:productreducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  // 🔥 Complete user slice ko persist نہ کریں تاکہ loading ہمیشہ false سے شروع ہو
  blacklist: ['user'],
  timeout: 0,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
export default persistedReducer;
