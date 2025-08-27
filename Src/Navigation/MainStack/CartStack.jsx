import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favourite from '../../Screen/MainScreen/FavouriteScreens/Favourite';
import RecentlyView from '../../Screen/MainScreen/FavouriteScreens/RecentlyView';
import Cart from '../../Screen/MainScreen/CartScreens/cart';
import PaymentScreen from '../../Screen/MainScreen/CartScreens/PaymentScreen';
const CartStack=()=>{
    const Stack=createNativeStackNavigator()
return(
<Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
    <Stack.Screen name="Cart" component={Cart}/>
    <Stack.Screen name='Payment' component={PaymentScreen}/>
    
    
    
    </Stack.Navigator>
)
}
export default CartStack;
