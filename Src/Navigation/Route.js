import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AppStack from './AppStack'
import AuthStack from './Authstack'
import SellerStack from './MainStack/SellerStack'
import AdminStack from './MainStack/AdminStack'
import { useSelector } from 'react-redux'
import RootSellerStack from './MainStack/RootSellerStack'


const Route = () => {
  const {accesstoken,user}=useSelector(state=>state.user)
  return (
    
    
      user?.role=="customer"&&accesstoken?<AppStack/>:user?.role=="seller"&&accesstoken?<RootSellerStack/>:user?.role=="admin"&&accesstoken?<AdminStack/>:<AuthStack/>
      
    
  )
}

export default Route

const styles = StyleSheet.create({})