import { View, Text,TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'

import GST from '../../Constant'

const CustomButton = ({btnTitle,onPress,style}) => {
  return (
      <TouchableOpacity style={[styles.button,style]} onPress={onPress}>
        <Text style={GST.btnTitle}>{btnTitle}</Text>
      </TouchableOpacity>
  )
}

export default CustomButton;
const styles = StyleSheet.create({
  button: {
    ...GST.CENTER,
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 16,
    width:"100%",
    // minHeight:48,

  },
});

