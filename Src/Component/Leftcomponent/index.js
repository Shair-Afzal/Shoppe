import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../Constant';
import TopMenu from '../../assets/SVG/TopMenu.svg';
import Settings from '../../assets/SVG/Settings.svg';
import Vouchers from '../../assets/SVG/Vouchers.svg';
import CustomInput from '../Custominput';
import Time from '../../assets/SVG/Time.svg';

const Leftcomponent = ({
  icon,
  input,
  placeholder,
  time,
  onFocus,
  value,
  onChangetxt,
  onSubmitEditing,
  back
}) => {
  return (
    <View>
      {icon && (
        <View style={{ ...GST.mid_row, gap: RF(10) }}>
          <TouchableOpacity>
            <Vouchers height={RF(35)} width={RF(35)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <TopMenu height={RF(35)} width={RF(35)} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Settings height={RF(35)} width={RF(35)} />
          </TouchableOpacity>
        </View>
      )}
      {input && (
        <CustomInput
          style={{ width: '54%', paddingVertical: 4 }}
          cameraicon
          placeholder={placeholder}
          onFocus={onFocus}
          value={value}
          onChangeText={onChangetxt}
          onSubmitEditing={onSubmitEditing}
        />
      )}
      {time && (
        <View style={{ ...GST.mid_row, gap: RF(3) }}>
          <Time height={RF(20)} width={RF(20)} />
          <View style={styles.box}>
            <Text style={styles.txt}>00</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt}>36</Text>
          </View>
          <View style={styles.box}>
            <Text style={styles.txt}>57</Text>
          </View>
        </View>
      )}
     
    </View>
  );
};

export default Leftcomponent;

const styles = StyleSheet.create({
  box: {
    ...GST.CENTER,
    padding: RF(5),
    borderRadius: RF(5),
    backgroundColor: colors.DarkWhite,
    margin: 1,
    zIndex: 6,
  },
  txt: {
    ...GST.smallesttxt,
    fontFamily: 'Raleway-Bold',
  },
});
