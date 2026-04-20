import { View, Text } from 'react-native';
import React, { use, useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerAccount from '../../Screen/Authscreen/SellerAccount';
import SellerStack from './SellerStack';
import { useDispatch, useSelector } from 'react-redux';
import { GetSeller } from '../../Redux/slices/Action/Authaction';
import { showErrorToast, showSuccessToast } from '../../utils/Toast';
const Stack = createNativeStackNavigator();

const RootSellerStack = () => {
    const {user,seller}=useSelector(state=>state.user)
    const dispatch=useDispatch()
    useEffect(()=>{
    dispatch(GetSeller(user?._id))
    if(seller?.status=="pending"){
      showSuccessToast("Your seller account is not approved yet. Please wait for approval.")
    }else if(seller?.status==="rejected"){
      showErrorToast("Your seller account application has been rejected. Please contact support for more information.")
    }
    },[])
    if (seller === undefined) {
  return null; 
}
    if (seller === null|| seller?.status!=="approved") {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SellerAccount" component={SellerAccount} />
      </Stack.Navigator>
    );
  }else if(seller?.status==="approved"){
    
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}
    >

      <Stack.Screen name="SellerTabs" component={SellerStack} />
    </Stack.Navigator>
  );
};
}

export default RootSellerStack;
