import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
    AdminDashboard,
    ManageUsers,
    ManageSellers,
    ManageOrders,
    ManageProducts,
    AdminChatList,
    AdminChatScreen,
    AdminProfile,
    AdminEditProfile,
} from '../../Screen/AdminScreens';

const Stack = createNativeStackNavigator();

const AdminStack = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
            <Stack.Screen name="ManageUsers" component={ManageUsers} />
            <Stack.Screen name="ManageSellers" component={ManageSellers} />
            <Stack.Screen name="ManageOrders" component={ManageOrders} />
            <Stack.Screen name="ManageProducts" component={ManageProducts} />
            <Stack.Screen name="AdminMessages" component={AdminChatList} />
            <Stack.Screen name="AdminChatScreen" component={AdminChatScreen} />
            <Stack.Screen name="AdminProfile" component={AdminProfile} />
            <Stack.Screen name="AdminEditProfile" component={AdminEditProfile} />
        </Stack.Navigator>
    );
};

export default AdminStack;
