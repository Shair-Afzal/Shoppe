import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './Src/Navigation/Authstack'
 import Toast from 'react-native-toast-message';
import { Provider, useSelector } from "react-redux";
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
import VariationModal from './Src/Component/VaritaionModal';
import SellerStack from './Src/Navigation/MainStack/SellerStack';
import AdminStack from './Src/Navigation/MainStack/AdminStack';
import Route from './Src/Navigation/Route.js';
import { StripeProvider } from '@stripe/stripe-react-native';





const App = () => {
  
  return (
    <StripeProvider publishableKey="pk_test_51SzdnO0FSgUPRJCbtVjpHPA3MHbggIbanOaOKGpQvHKBGGLw7ZTOsT8Vz7L28DZQcL7w3Gebri1AR33oiRESJyrH00sQ8WeNhn">
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
      {/* <AppStack/> */}
      {/* <SellerStack/> */}
      {/* <AdminStack/> */}
      {/* <CustomModel  /> */}
      <Route/>
      
      
      
      
       
      
      
      
    
      
      
      
       <Toast />
    </NavigationContainer>
    </Provider>
   </SafeAreaProvider>
   </StripeProvider>
  )
}

export default App




