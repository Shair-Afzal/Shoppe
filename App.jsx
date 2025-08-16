import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStack from './Src/Navigation/Authstack'
 import Toast from 'react-native-toast-message';

const App = () => {
  return (
    <NavigationContainer>
      <AuthStack />
       <Toast />
    </NavigationContainer>
  )
}

export default App