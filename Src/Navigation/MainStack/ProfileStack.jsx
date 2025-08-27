import { View, Text } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../../Screen/MainScreen/ProfileScreens/Profile';
import ReciveScreen from '../../Screen/MainScreen/ProfileScreens/ReciveScreen';
import ActivityScreen from '../../Screen/MainScreen/ProfileScreens/ActivityScreen';
import OrderHistory from '../../Screen/MainScreen/ProfileScreens/OrderHistory';
import Setting from '../../Screen/MainScreen/ProfileScreens/Setting';
import SettingProfile from '../../Screen/MainScreen/ProfileScreens/SettingScreens/SettingProfile';
import PaymentMethod from '../../Screen/MainScreen/ProfileScreens/SettingScreens/PaymentMethod';
import ShipppingAdrees from '../../Screen/MainScreen/ProfileScreens/SettingScreens/ShippingAddress';
import CountryScreen from '../../Screen/MainScreen/ProfileScreens/SettingScreens/CountryScreen';
import LanguageScreen from '../../Screen/MainScreen/ProfileScreens/SettingScreens/LanguageScreen';
import CurrencyScreen from '../../Screen/MainScreen/ProfileScreens/SettingScreens/CurrencyScreen';
import SizeScreen from '../../Screen/MainScreen/ProfileScreens/SettingScreens/SizetypeScreen';
import About from '../../Screen/MainScreen/ProfileScreens/SettingScreens/About';
import VoucherScreen from '../../Screen/MainScreen/ProfileScreens/VoucherScreen';
import TrackScreen from '../../Screen/MainScreen/ProfileScreens/TrackScreen';
import ChatScreen from '../../Screen/MainScreen/ProfileScreens/ChatScreen';
const ProfileStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={'Profile'} component={Profile} />
      <Stack.Screen name={'Recive'} component={ReciveScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name={'order'} component={OrderHistory} />
      <Stack.Screen name={'Setting'} component={Setting} />
      <Stack.Screen name={'Settingprofile'} component={SettingProfile} />
      <Stack.Screen name={'PaymentMethod'} component={PaymentMethod} />
      <Stack.Screen name={'shipping'} component={ShipppingAdrees} />
      <Stack.Screen name="Country" component={CountryScreen} />
      <Stack.Screen name="Language" component={LanguageScreen} />
      <Stack.Screen name="Currency" component={CurrencyScreen} />
      <Stack.Screen name="Size" component={SizeScreen} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Voucher" component={VoucherScreen} />
      <Stack.Screen name="Track" component={TrackScreen} />
    </Stack.Navigator>
  );
};
export default ProfileStack;
