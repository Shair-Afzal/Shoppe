import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../Constant';
import CustomButton from '../Custombutton';
import { useNavigation } from '@react-navigation/native';

const PaymentFooter = ({ title, price, btnstyle, txtstyle, onPress,style,disbale}) => {
  const navigation = useNavigation();
  return (
    <View
      style={[styles.footerstyle,style]}
    >
      <View style={GST.CENTERCONTAINER}>
        <Text style={styles.totattxt}>
          Totat<Text style={GST.description}>{price}</Text>
        </Text>
        {/* <CustomButton btnTitle={title} style={[styles.btn,btnstyle]} txtstyle={colors.darkblack}/> */}
        <TouchableOpacity style={[styles.btn, btnstyle]} onPress={onPress}
        disabled={disbale}
        >
          <Text style={[GST.subdescription, txtstyle]}>{title}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaymentFooter;

const styles = StyleSheet.create({
  totattxt: {
    fontSize: RF(20),
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
  },
  btn: {
    height: RF(40),
    backgroundColor: colors.DarkWhite,
    width: RF(128),
    ...GST.CENTER,
    borderRadius: RF(10),
    elevation: 2,
  },
  footerstyle: {
    backgroundColor: colors.grey,
    padding: RF(10),
    paddingLeft: RF(15),
  },
});
