import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../Screen/Authscreen/WelcomeScreen';
import LoginScreen from '../../Screen/Authscreen/LoginScreen';
import CreateAccount from '../../Screen/Authscreen/CreateAccount';
import PasswordScreen from '../../Screen/Authscreen/PasswordScreen';
import ForgetPassword from '../../Screen/Authscreen/ForgetPassword';
import ConfirmPassword from '../../Screen/Authscreen/ConfirmPassword';
import OnBondingScreen from '../../Screen/Authscreen/OnbondingScreen';

const AuthStack = () => {
    const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        
      }}
      initialRouteName='OnBonding'
    >
      <Stack.Screen name="OnBonding" component={OnBondingScreen}/>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Create" component={CreateAccount} />
      <Stack.Screen name="Password" component={PasswordScreen} />
       <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
       <Stack.Screen name="ConfirmPassword" component={ConfirmPassword}/>
        

     
      

           

    
      
    </Stack.Navigator>
  )
}

export default AuthStack