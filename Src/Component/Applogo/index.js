import { StyleSheet, Text, View ,Image} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import Appicon from "../../assets/SVG/Appicon.svg";
const AppLogo = () => {
    
  return (
    <View style={styles.container}>
      <Appicon width={RF(100)} height={RF(100)} />
    </View>
  )
}

export default AppLogo

const styles = StyleSheet.create({
    container:{
        backgroundColor:colors.DarkWhite,
        width:RF(150),
        paddingVertical: RF(22),
        borderRadius: RF(100),
        borderWidth: 1,
        borderColor:colors.DarkWhite,
        ...GST.CENTER,
        elevation: 5,
        // overflow: 'hidden',
    },
   
})