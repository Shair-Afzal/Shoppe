import React from 'react';
import { View, TextInput, Image, StyleSheet, Touchable, TouchableOpacity } from 'react-native';
import { RF } from '../../Constant';
import Eyeicon from '../../assets/SVG/Eyeicon.svg'; // Adjust the path as necessary
import ImageIcon from '../../assets/SVG/ImageIcon.svg';
import { Alert } from "react-native";
import ImagePicker from "react-native-image-crop-picker";
import Eyeopen from '../../assets/SVG/Eyeopen.svg'

export const pickImage = async () => {
  return new Promise((resolve, reject) => {
    Alert.alert(
      "Select Image",
      "Choose an option",
      [
        {
          text: "Camera",
          onPress: async () => {
            try {
              const image = await ImagePicker.openCamera({
                width: 300,
                height: 400,
                cropping: true,
              });
              resolve(image);
            } catch (error) {
              reject(error);
            }
          },
        },
        {
          text: "Gallery",
          onPress: async () => {
            try {
              const image = await ImagePicker.openPicker({
                width: 300,
                height: 400,
                cropping: true,
              });
              resolve(image);
            } catch (error) {
              reject(error);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
          onPress: () => resolve(null),
        },
      ],
      { cancelable: true }
    );
  });
};
const CustomInput = ({
  placeholder,
  value,
  onChangeText,
  rightIcon, // Pass require('path/to/image.png') or { uri: '...' }
  containerStyle,
  inputStyle,
  onBlur,
  secureTextEntry,
  cameraicon,
  onFocus,
  onSubmitEditing,
  eyepress,
  onimagepicked,
  multiline,
  numberOfLines,
  ...rest
}) => {
  const handlePick = async () => {
  try {
    const result = await pickImage();
    if (result) {
      console.log("Image Path:", result.path);
      if (onimagepicked) {
          onimagepicked(result); // 👈 send result back to parent
        }
      
    } else {
      console.log("No image selected");
    }
  } catch (e) {
    console.log("Error:", e);
  }
};
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
        onFocus={onFocus}
        onSubmitEditing={onSubmitEditing}
        multiline={multiline}
        numberOfLines={numberOfLines}
        {...rest}
      />
      {rightIcon && (
        <TouchableOpacity
        onPress={eyepress}
        >
          {secureTextEntry==true?
          <Eyeicon height={RF(20)} width={RF(20)} />:
          <Eyeopen height={RF(20)} width={RF(20)} />
}
        </TouchableOpacity>
      )}
      {cameraicon&& (
        <TouchableOpacity
        onPress={handlePick} 
        >
          <ImageIcon height={RF(20)} width={RF(20)} />
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
