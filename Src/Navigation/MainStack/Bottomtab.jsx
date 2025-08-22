import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from 'react'
import InactiveHome from '../../assets/SVG/InactiveHome.svg'
import Activehome from '../../assets/SVG/Activehome.svg'
import Home from "../../Screen/MainScreen/HomeScreens/Home";
import InactiveFavorite from "../../assets/SVG/InactiveFavorite.svg"
import Activefavourite from "../../assets/SVG/Activefavourite.svg"
import Favourite from "../../Screen/MainScreen/FavouriteScreens/Favourite";
import InactiveCategories from "../../assets/SVG/InactiveCategories.svg";
// import ActiveCategories from '../../assets/SVG/ActiveCategories.svg';
import InactiveCart from "../../assets/SVG/InactiveCart.svg";
import Activecart from "../../assets/SVG/Activecart.svg"
import Activeprofile from "../../assets/SVG/Activeprofile.svg"
import InactiveProfile from "../../assets/SVG/InactiveProfile.svg"
import Categories from "../../Screen/MainScreen/CategoriesScreen/categories";
import Cart from "../../Screen/MainScreen/CartScreens/cart";
import Profile from "../../Screen/MainScreen/ProfileScreens/Profile";
import GST, { colors, RF } from "../../Constant";
import { StyleSheet } from "react-native";
import HomeStack from "./HomeStack";



    const Tab = createBottomTabNavigator();
const Bottomtab = () => {
    
  return (
     <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle:styles.tabbarstyle,
         tabBarIconStyle: {
      marginTop: RF(10),   
      
    },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Activehome height={RF(30)} width={RF(30)}/> : <InactiveHome height={RF(30)} width={RF(22)}/>
        }}
      />
      <Tab.Screen
        name="Favourite"
        component={Favourite}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Activefavourite height={RF(30)} width={RF(30)}/> : <InactiveFavorite height={RF(30)} width={RF(20)}/>,
        }}
      />
      <Tab.Screen
        name="Categories"
        component={Categories}
        options={{
          tabBarStyle: { display: "none" },
          tabBarIcon: ({ focused }) =>
            focused ? <InactiveCategories height={RF(30)} width={RF(30)}/> :<InactiveCategories height={RF(30)} width={RF(20)}/>,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          
          tabBarIcon: ({ focused }) =>
            focused ? <Activecart height={RF(30)} width={RF(30)}/> : <InactiveCart height={RF(30)} width={RF(20)}/>,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) =>
            focused ? <Activeprofile height={RF(30)} width={RF(30)}/> : <InactiveProfile height={RF(30)} width={RF(20)}/>
        }}
      />
      </Tab.Navigator>
  )
}

export default Bottomtab;
const styles=StyleSheet.create({
    tabbarstyle:{
       height: RF(65),
          backgroundColor: colors.DarkWhite,
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowOffset: { width: 0, height: 2 },
          shadowRadius: 5,
          elevation: 5,
    }
})