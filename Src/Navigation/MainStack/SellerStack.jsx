import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Chat, OrderHistory } from '../../Screen/SellerScreens';
import SellerHomeStack from './SellerHomeStack';
import SellerProfileStack from './SellerProfileStack';

import InactiveOrder from '../../assets/SVG/InactiveCart.svg';
import ActiveOrder from '../../assets/SVG/Activecart.svg';
import ActiveProfile from '../../assets/SVG/Activeprofile.svg';
import InactiveProfile from '../../assets/SVG/InactiveProfile.svg';
import InactiveHome from '../../assets/SVG/InactiveHome.svg';
import ActiveHome from '../../assets/SVG/Activehome.svg';
import ActiveMessage from '../../assets/SVG/Message.svg';
import InactiveMessage from '../../assets/SVG/Messageicon.svg';

import { wp, colors } from '../../Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Tab = createBottomTabNavigator();

const SellerStack = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          paddingBottom: insets.bottom || wp('1%'),
          borderTopWidth: 1,
          borderTopColor: colors.sellerBorder,
          elevation: 12,
          shadowColor: colors.sellerPrimary,
          shadowOpacity: 0.12,
          shadowOffset: { width: 0, height: -3 },
          shadowRadius: 8,
          backgroundColor: colors.sellerCard,
          height: wp('16%'),
        },
        tabBarLabelStyle: {
          fontSize: wp('2.8%'),
          marginBottom: wp('1.5%'),
          fontFamily: 'NunitoSans-SemiBold',
        },
        tabBarActiveTintColor: colors.sellerPrimary,
        tabBarInactiveTintColor: colors.sellerSubText,
        tabBarIcon: ({ focused }) => {
          let IconComponent;
          if (route.name === 'SellerHome') IconComponent = focused ? ActiveHome : InactiveHome;
          else if (route.name === 'SellerOrders') IconComponent = focused ? ActiveOrder : InactiveOrder;
          else if (route.name === 'SellerChat') IconComponent = focused ? ActiveMessage : InactiveMessage;
          else if (route.name === 'SellerProfile') IconComponent = focused ? ActiveProfile : InactiveProfile;
          return <IconComponent width={wp('6%')} height={wp('6%')} />;
        },
      })}
    >
      <Tab.Screen
        name="SellerHome"
        component={SellerHomeStack}
        options={{ title: 'Home' }}
      />
      <Tab.Screen
        name="SellerOrders"
        component={OrderHistory}
        options={{ title: 'Orders' }}
      />
      <Tab.Screen
        name="SellerChat"
        component={Chat}
        options={{ tabBarStyle: { display: 'none' }, title: 'Chat' }}
      />
      <Tab.Screen
        name="SellerProfile"
        component={SellerProfileStack}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default SellerStack;