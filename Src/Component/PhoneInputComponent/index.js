import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { colors, RF } from '../../Constant';

const PhoneInputComponent = ({value,onChangeText,onChangeFormattedText,onChangeCountry}) => {
  // const [value, setValue] = useState("");
  const phoneInput = useRef(null);
  // const [formattedValue, setFormattedValue] = useState("");
  return (
    <View>
      <PhoneInput
            ref={phoneInput}
            defaultValue={value}
            defaultCode="PK"
            layout="second"
            onChangeText={onChangeText}
            onChangeFormattedText={onChangeFormattedText}
            onChangeCountry={onChangeCountry}
            // withDarkTheme
  //           codeTextStyle={{
  //   fontSize: 0, // makes text invisible but flag stays
  //   width: 0,    // hides the number part
  //   marginLeft: -5, // adjust so flag stays 
  
  // }}
  //  disableArrowIcon 
            withShadow
            autoFocus
            flagButtonStyle={{padding:RF(10),}}
            containerStyle={{width:"100%",backgroundColor:colors.grey,borderRadius:RF(30)}}
             textInputStyle={{backgroundColor:colors.grey,height:RF(40),borderRadius:RF(30)}}
             textContainerStyle={{backgroundColor:colors.grey,height:RF(50),borderRadius:RF(30)}}
          />
    </View>
  )
}

export default PhoneInputComponent

const styles = StyleSheet.create({})