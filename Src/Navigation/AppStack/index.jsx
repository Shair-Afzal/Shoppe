import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import WelcomeScreen from '../../Screen/Authscreen/WelcomeScreen';
import LoginScreen from '../../Screen/Authscreen/LoginScreen';
import CreateAccount from '../../Screen/Authscreen/CreateAccount';
import PasswordScreen from '../../Screen/Authscreen/PasswordScreen';
import ForgetPassword from '../../Screen/Authscreen/ForgetPassword';
import ConfirmPassword from '../../Screen/Authscreen/ConfirmPassword';
import OnBondingScreen from '../../Screen/Authscreen/OnbondingScreen';
import Home from '../../Screen/MainScreen/HomeScreens/Home';
import Favourite from '../../Screen/MainScreen/FavouriteScreens/Favourite';
import Categories from '../../Screen/MainScreen/CategoriesScreen/categories';
import Cart from '../../Screen/MainScreen/CartScreens/cart';
import Profile from '../../Screen/MainScreen/ProfileScreens/Profile';
import Bottomtab from '../MainStack/Bottomtab';
import FilterScreen from '../../Screen/MainScreen/HomeScreens/FilterScreen';
import DetailsScreen from '../../Screen/MainScreen/HomeScreens/DetailsScreen';
import ReviewScreen from '../../Screen/MainScreen/HomeScreens/ReviewScreen';
import ChatScreen from '../../Screen/MainScreen/ProfileScreens/ChatScreen';
const AppStack = () => {
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
        
        <Stack.Screen name="home" component={Bottomtab}/>
       <Stack.Screen name='Filter' component={FilterScreen}/>
       <Stack.Screen name='Details' component={DetailsScreen}/>
       <Stack.Screen name='Chat' component={ChatScreen}/>
       
           {/* <Stack.Screen name='Review' component={ReviewScreen}/> */}

        {/* <Stack.Screen name="FlashSales" component={FlashSales}/> */}
    </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})