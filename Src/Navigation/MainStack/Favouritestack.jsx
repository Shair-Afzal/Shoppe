import { View, Text } from 'react-native'
import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Favourite from '../../Screen/MainScreen/FavouriteScreens/Favourite';
import RecentlyView from '../../Screen/MainScreen/FavouriteScreens/RecentlyView';
const FavouriteStack=()=>{
    const Stack=createNativeStackNavigator()
return(
<Stack.Navigator
    screenOptions={{
        headerShown:false
    }}
    >
    <Stack.Screen name='Favourite' component={Favourite}/>
    <Stack.Screen name='RecenltyView' component={RecentlyView}/>
    
    
    
    </Stack.Navigator>
)
}
export default FavouriteStack;
