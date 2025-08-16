import React from 'react';
import { View, TextInput, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { RF } from '../../Constant';
import Eyeicon from '../../assets/SVG/Eyeicon.svg'; // Adjust the path as necessary
const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  rightIcon, // Pass require('path/to/image.png') or { uri: '...' }
  containerStyle,
  inputStyle,
  onBlur,
  secureTextEntry,
  ...rest
}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor="#D2D2D2"
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
        secureTextEntry={secureTextEntry}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity>
          <Eyeicon height={RF(20)} width={RF(20)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: RF(30),
    paddingHorizontal: RF(15),
    paddingVertical: RF(8),
    justifyContent:"space-between"
  },
  input: {
    width:"80%",
    fontSize: RF(14),
    color: '#000',
  },
  icon: {
    width: RF(20),
    height: RF(20),
    marginLeft: RF(8),
  },
});

export default CustomInput;
