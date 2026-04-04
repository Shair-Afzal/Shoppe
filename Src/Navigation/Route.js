import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import AppStack from './AppStack'
import AuthStack from './Authstack'
import SellerStack from './MainStack/SellerStack'
import AdminStack from './MainStack/AdminStack'
import { useSelector, useDispatch } from 'react-redux'
import RootSellerStack from './MainStack/RootSellerStack'
import { connectSocket } from '../utils/socket/socket'
import { addMessageRealtime } from '../Redux/slices/Reducers/chatReducer'


const Route = () => {
  const {accesstoken,user}=useSelector(state=>state.user)
  const dispatch = useDispatch()
  
  useEffect(() => {
  if (!user?._id) return;

  const socket = connectSocket(user._id);

  socket.on("newMessage", (msg) => {
    dispatch(addMessageRealtime(msg));
  });

  return () => socket.disconnect();
}, [user]);
  return (
    
    
      user?.role=="customer"&&accesstoken?<AppStack/>:user?.role=="seller"&&accesstoken?<RootSellerStack/>:user?.role=="admin"&&accesstoken?<AdminStack/>:<AuthStack/>
      
    
  )
}

export default Route

const styles = StyleSheet.create({})