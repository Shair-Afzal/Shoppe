import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../../Screen/MainScreen/HomeScreens/Home';
import FlashSales from '../../Screen/MainScreen/HomeScreens/FlashSales';
import Live from '../../Screen/MainScreen/ProfileScreens/Live';
import StoryScreen from '../../Screen/MainScreen/ProfileScreens/StoryScreen';
import ShopeScreen from '../../Screen/MainScreen/HomeScreens/ShopScreen';
import SearchScreen from '../../Screen/MainScreen/HomeScreens/SearchScreen';
import ReviewScreen from '../../Screen/MainScreen/HomeScreens/ReviewScreen';
import DetailsScreen from '../../Screen/MainScreen/HomeScreens/DetailsScreen';


const HomeStack = () => {
    const Stack=createNativeStackNavigator()
  return (
    <Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='FlashSales' component={FlashSales}/>
    <Stack.Screen name='Live' component={Live}/>
    <Stack.Screen name='Story' component={StoryScreen}/>
    <Stack.Screen name='Shop' component={ShopeScreen}/>
    <Stack.Screen name='Search'component={SearchScreen}/>
    <Stack.Screen name='Review' component={ReviewScreen}/>
    
    
    </Stack.Navigator>
  )
}

export default HomeStack