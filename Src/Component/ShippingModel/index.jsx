import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../Constant';
import DisableButton from '../../assets/SVG/DisableButton.svg';
import CustomInput from '../Custominput';
import CustomButton from '../Custombutton';

const ShippingAddressModal = ({ visible, onclose,add}) => {
    const [first,setfirst]=useState()
    const [second,setsecond]=useState()
    const [third,sethird]=useState()
    const [forth,setforth]=useState()
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onclose}
      statusBarTranslucent={true}
    >
      <View style={GST.MODALMAIN}>
        <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <View
            style={{
              backgroundColor: colors.lightblue,
              padding: RF(15),
              width: '100%',
              paddingVertical: RF(25),
              borderTopLeftRadius: RF(10),
              borderTopRightRadius: RF(10),
            }}
          >
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
              {add?"Add Card":"Shipping Address"}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.DarkWhite,
              padding: RF(15),
              paddingVertical: RF(20),
            }}
          >
            {!add&&
            <TouchableOpacity
              style={{ ...GST.CENTERCONTAINER, marginTop: RF(15) }}
              disabled
            >
              <View>
                <Text style={{ ...GST.smallesttxt, fontSize: RF(12) }}>
                  Country
                </Text>
                <Text style={{ ...GST.description, color: colors.darkgrey }}>
                  Vietnam
                </Text>
              </View>
              <DisableButton />
            </TouchableOpacity>
}
            <View style={{ marginTop: RF(15) }}>
              <Text
                style={{
                  ...GST.smallesttxt,
                  fontSize: RF(12),
                  fontFamily: 'Raleway',
                }}
              >
                {add?"Card Holder":"Address"}
                
              </Text>
              <CustomInput
                containerStyle={{
                  borderRadius: RF(15),
                  backgroundColor: colors.lightblue,
                  paddingVertical: RF(3),
                }}
                inputStyle={{ width: '100%' }}
                value={first}
                onChangeText={setfirst}
                placeholder={"Required"}
              />
            </View>
            <View style={{ marginTop: RF(15) }}>
              <Text
                style={{
                  ...GST.smallesttxt,
                  fontSize: RF(12),
                  fontFamily: 'Raleway',
                }}
              >
                {add?"Card Number":"Town / City"}
                
              </Text>
              <CustomInput
                containerStyle={{
                  borderRadius: RF(15),
                  backgroundColor: colors.lightblue,
                  paddingVertical: RF(3),
                }}
                value={second}
                onChangeText={setsecond}
                placeholder={"Required"}
              />
            </View>
            <View style={{ marginTop: RF(15) }}>
                <View style={GST.CENTERCONTAINER}>
                <View style={{width:add?"45%":"100%"}}>
              <Text
                style={{
                  ...GST.smallesttxt,
                  fontSize: RF(12),
                  fontFamily: 'Raleway',
                }}
              >
                {add?"Valid":" Postcode"}
               
              </Text>
              <CustomInput
                containerStyle={{
                  borderRadius: RF(15),
                  backgroundColor: colors.lightblue,
                  paddingVertical: RF(3),
                }}
                value={third}
                onChangeText={sethird}
                placeholder={"Required"}

              />
              </View>
              {add&&
              <View style={{width:"45%"}}>
              <Text
                style={{
                  ...GST.smallesttxt,
                  fontSize: RF(12),
                  fontFamily: 'Raleway',
                }}
              >
                CVV
              </Text>
              <CustomInput
                containerStyle={{
                  borderRadius: RF(15),
                  backgroundColor: colors.lightblue,
                  paddingVertical: RF(3),
                }}
                value={forth}
                onChangeText={setforth}
                placeholder={"Required"}
              />
              </View>
}
              </View>
            </View>
            <CustomButton
              style={{ paddingVertical: RF(13), marginTop: RF(15) }}
              btnTitle={'Save Changes'}
              onPress={onclose}
              
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ShippingAddressModal;
