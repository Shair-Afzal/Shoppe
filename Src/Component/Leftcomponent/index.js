import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../Constant';
import TopMenu from '../../assets/SVG/TopMenu.svg';
import Settings from '../../assets/SVG/Settings.svg';
import Vouchers from '../../assets/SVG/Vouchers.svg';
import CustomInput from '../Custominput';
import Time from '../../assets/SVG/Time.svg';
import { useNavigation } from '@react-navigation/native';
import ActiveVourcher from '../../assets/SVG/ActiveVourcher.svg';
import Filter from '../../assets/SVG/Filter.svg';

const Leftcomponent = ({
  icon,
  input,
  placeholder,
  time,
  onFocus,
  value,
  onChangetxt,
  onSubmitEditing,
  back,
  onimagpicked,
  Active,
  containerStyle,
  placeholderTextColor,
  inputstyle,
  filter,
}) => {
  const navigation = useNavigation();
  return (
    <View>
      {icon && (
        <View style={{ ...GST.mid_row, gap: RF(10) }}>
          <TouchableOpacity onPress={() => navigation.navigate('Voucher')}>
            {Active ? (
              <ActiveVourcher height={RF(35)} width={RF(35)} />
            ) : (
              <Vouchers height={RF(35)} width={RF(35)} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('order')}>
            <TopMenu height={RF(35)} width={RF(35)} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Settings height={RF(35)} width={RF(35)} />
          </TouchableOpacity>
        </View>
      )}
      <View style={filter?styles.inputwrapper:null}>
        {input && (
          <CustomInput
            style={[styles.input, inputstyle]}
            cameraicon
            placeholder={placeholder}
            onFocus={onFocus}
            value={value}
            onChangeText={onChangetxt}
            onSubmitEditing={onSubmitEditing}
            onimagepicked={onimagpicked}
            containerStyle={containerStyle}
            placeholderTextColor={placeholderTextColor}
          />
        )}
        {filter && (
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Filter height={RF(25)} width={RF(25)} />
          </TouchableOpacity>
        )}
      </View>
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
  input: {
    width: '56%',
    paddingVertical: RF(1),
  },
  inputwrapper: {
    ...GST.mid_row,
    gap: RF(5),
    justifyContent: 'flex-end',
  },
});
