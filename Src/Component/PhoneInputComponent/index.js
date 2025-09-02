import { StyleSheet, Text, View } from 'react-native'
import React, { useRef, useState } from 'react'
import PhoneInput from "react-native-phone-number-input";
import { colors, fontSize, RF } from '../../Constant';

const PhoneInputComponent = ({value, onChangeText, onChangeFormattedText, onChangeCountry}) => {
  const phoneInput = useRef(null);
  
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
        withShadow
        autoFocus
      flagButtonStyle={{
  padding: RF(5),
  width: RF(40),
  justifyContent: "center",
  alignItems: "center"
}}
        containerStyle={{
          width: "100%",
          backgroundColor: colors.grey,
          borderRadius: RF(30)
        }}
        textInputStyle={{
          backgroundColor: colors.grey,
          height: RF(40),
          borderRadius: RF(30),
          fontSize: RF(14) // Ensure text is visible
        }}
        textContainerStyle={{
          backgroundColor: colors.grey,
          height: RF(50),
          borderRadius: RF(30),
          paddingLeft: 0 // Remove left padding
        }}
       codeTextStyle={{
  fontSize: fontSize.small,
  // color: "transparent",
}}
        countryPickerButtonStyle={{
          width: RF(70), // Adjust width to fit only the flag
        }}
        renderDropdownImage={null} // Remove dropdown arrow
      />
    </View>
  )
}

export default PhoneInputComponent

const styles = StyleSheet.create({})