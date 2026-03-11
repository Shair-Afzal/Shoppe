import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SellerHome from '../../Screen/SellerScreens/Home';
import CreateProduct from '../../Screen/SellerScreens/CreateProduct';
import EditProduct from '../../Screen/SellerScreens/EditProduct';

const Stack = createNativeStackNavigator();

const SellerHomeStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SellerHomeMain" component={SellerHome} />
      <Stack.Screen name="CreateProduct" component={CreateProduct} />
      <Stack.Screen name="EditProduct" component={EditProduct} />
    </Stack.Navigator>
  );
};

export default SellerHomeStack;
