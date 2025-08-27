import { View, Text, TouchableOpacity, KeyboardAvoidingView,ScrollView, Keyboard} from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Button from '../../../../../assets/SVG/Button.svg';
import CustomInput from '../../../../../Component/Custominput';
import CustomButton from '../../../../../Component/Custombutton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ShipppingAdrees = ({ navigation }) => {
    const [address,setaddress]=useState("")
    const [city,setcity]=useState("")
    const [postcode,setpodtcode]=useState("")
    const [phone,setphone]=useState("")
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
        const insert=useSafeAreaInsets();
  return (
    <ScrollView
    contentContainerStyle={{flexGrow:1,paddingHorizontal:RF(15),backgroundColor:colors.DarkWhite,paddingTop:insert.top}}
     >
    
      <CustomHeader name={'Settings'} descrip={'Shipping Address'} />
      <TouchableOpacity style={{ ...GST.CENTERCONTAINER, marginTop: RF(15) }}>
        <View>
          <Text style={GST.smallesttxt}>Country</Text>
          <Text style={{ ...GST.subdescription, color: colors.blue }}>
            Vietnam
          </Text>
        </View>
        <Button />
      </TouchableOpacity>
      <View style={{ marginTop: RF(15) }}>
        <Text style={GST.smallesttxt}>Address</Text>
        <CustomInput
          containerStyle={{
            borderRadius: RF(15),
            backgroundColor: colors.lightblue,
            paddingVertical: RF(3),
          }}
          value={address}
          onChangeText={setaddress}
        />
      </View>
      <View style={{ marginTop: RF(15) }}>
        <Text style={GST.smallesttxt}>Town / City</Text>
        <CustomInput
          containerStyle={{
            borderRadius: RF(15),
            backgroundColor: colors.lightblue,
            paddingVertical: RF(3),
          }}
          value={city}
          onChangeText={setcity}
        />
      </View>
      <View style={{ marginTop: RF(15) }}>
        <Text style={GST.smallesttxt}>Postcode</Text>
        <CustomInput
          containerStyle={{
            borderRadius: RF(15),
            backgroundColor: colors.lightblue,
            paddingVertical: RF(3),
          }}
          value={postcode}
          onChangeText={setpodtcode}
        />
      </View>
      <View style={{ marginTop: RF(15) }}>
        <Text style={GST.smallesttxt}>PhoneNumber</Text>
        <CustomInput
          containerStyle={{
            borderRadius: RF(15),
            backgroundColor: colors.lightblue,
            paddingVertical: RF(3),
          }}
          value={phone}
          onChangeText={setphone}
        />
      </View>
      {
        !keyboardVisible&&
      
      <CustomButton
        style={{
          position: 'absolute',
          bottom: RF(10),
          left: RF(15),
          paddingVertical: RF(15),
        }}
        btnTitle={'Save Changes'}
        onPress={() => navigation.goBack()}
      />
    }
    </ScrollView>
  );
};

export default ShipppingAdrees;
