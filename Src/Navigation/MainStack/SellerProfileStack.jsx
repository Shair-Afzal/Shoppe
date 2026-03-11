import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerProfile from '../../Screen/SellerScreens/Profile';

const Stack = createNativeStackNavigator();

const SellerProfileStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SellerProfileMain" component={SellerProfile} />
        </Stack.Navigator>
    );
};

export default SellerProfileStack;
