import { StyleSheet, View } from 'react-native';
import React from 'react';
import RNPickerSelect from 'react-native-picker-select';
import { RF, colors } from '../../Constant';
import Dropicon from '../../assets/SVG/Dropicon.svg';
import Dropimg from '../../assets/SVG/Dropimg.svg'; 

const CustomSelector = () => {
  return (
    <View style={styles.container}>
     
      <Dropimg height={RF(38)} width={RF(38)} style={styles.leftIcon} />
      <View style={{ flex: 1 }}>
        <RNPickerSelect
          onValueChange={(value) => console.log(value)}
          items={[
            { label: 'Jackets', value: 'jackets' },
            { label: 'T-Shirts', value: 'tshirts' },
            { label: 'Bags', value: 'bags' },
            { label: 'Shoes', value: 'shoes' },
          ]}
          style={pickerSelectStyles}
          placeholder={{ label: "Select category", value: null }}
          useNativeAndroidPickerStyle={false}
          Icon={() => (
            <Dropicon height={RF(25)} width={RF(15)} style={styles.rightIcon} />
          )}
        />
      </View>
    </View>
  );
};

export default CustomSelector;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(10),
    height: RF(45),
    paddingHorizontal: RF(5),
    elevation: 5,
    marginTop: RF(10),
    width:"98%",
    alignSelf:"center"
  },
  leftIcon: {
    marginRight: RF(8),
  },
  rightIcon: {
    marginRight: RF(5),
    marginTop: RF(10),   
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: RF(14),
    color: "black",
    paddingVertical: 8,
  },
  inputAndroid: {
    fontSize: RF(14),
    color: "black",
    paddingVertical: 8,
  },
});
