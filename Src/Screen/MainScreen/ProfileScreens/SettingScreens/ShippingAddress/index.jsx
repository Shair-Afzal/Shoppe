import { View, Text, TouchableOpacity, ScrollView, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Button from '../../../../../assets/SVG/Button.svg';
import CustomInput from '../../../../../Component/Custominput';
import CustomButton from '../../../../../Component/Custombutton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const ShipppingAdrees = ({ navigation }) => {
  const [address, setaddress] = useState('');
  const [city, setcity] = useState('');
  const [postcode, setpodtcode] = useState('');
  const [phone, setphone] = useState('');
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboardVisible(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardVisible(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const insert = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.container, { paddingTop: insert.top }]}
    >
      <CustomHeader name={'Settings'} descrip={'Shipping Address'} />

      {/* Country Row */}
      <TouchableOpacity style={[GST.CENTERCONTAINER, styles.countryRow]}
      onPress={()=>navigation.navigate('Country')}
      >
        <View>
          <Text style={GST.smallesttxt}>Country</Text>
          <Text style={[GST.subdescription, styles.countryName]}>
            Vietnam
          </Text>
        </View>
        <Button />
      </TouchableOpacity>

      {/* Address Input */}
      <View style={styles.inputBlock}>
        <Text style={GST.smallesttxt}>Address</Text>
        <CustomInput
          containerStyle={styles.inputContainer}
          value={address}
          onChangeText={setaddress}
        />
      </View>

      {/* City Input */}
      <View style={styles.inputBlock}>
        <Text style={GST.smallesttxt}>Town / City</Text>
        <CustomInput
          containerStyle={styles.inputContainer}
          value={city}
          onChangeText={setcity}
        />
      </View>

      {/* Postcode Input */}
      <View style={styles.inputBlock}>
        <Text style={GST.smallesttxt}>Postcode</Text>
        <CustomInput
          containerStyle={styles.inputContainer}
          value={postcode}
          onChangeText={setpodtcode}
        />
      </View>

      {/* Phone Input */}
      <View style={styles.inputBlock}>
        <Text style={GST.smallesttxt}>PhoneNumber</Text>
        <CustomInput
          containerStyle={styles.inputContainer}
          value={phone}
          onChangeText={setphone}
        />
      </View>

      {/* Save Button (hidden on keyboard open) */}
      {!keyboardVisible && (
        <CustomButton
          style={styles.saveButton}
          btnTitle={'Save Changes'}
          onPress={() => navigation.goBack()}
        />
      )}
    </ScrollView>
  );
};

export default ShipppingAdrees;
