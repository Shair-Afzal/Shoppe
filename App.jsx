import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './Src/Navigation/Authstack'
 import Toast from 'react-native-toast-message';
import { Provider } from "react-redux";
import { store } from './Src/Redux/store';
import Bottomtab from './Src/Navigation/MainStack/Bottomtab';
import { colors } from './Src/Constant';
import AppStack from './Src/Navigation/AppStack';
import Model from './Src/Component/ImageModel';
import ShippingAddressModal from './Src/Component/ShippingModel';
import PaymentModel from './Src/Component/PaymentModel';
import CustomModel from './Src/Component/CustomModel';
import ReviewModel from './Src/Component/ReviewModel';
import { SafeAreaProvider } from 'react-native-safe-area-context';




const App = () => {
  return (
    <SafeAreaProvider>
    <Provider store={store}>
    <NavigationContainer>

      <StatusBar
      // hidden={true}
              // translucent
              backgroundColor={colors.DarkWhite}
              barStyle="dark-content"
            />
      {/* <AuthStack /> */}
      {/* <Bottomtab/> */}
      <AppStack/>
      
      
      
    
      
      
      
       <Toast />
    </NavigationContainer>
    </Provider>
   </SafeAreaProvider>
  )
}

export default App




