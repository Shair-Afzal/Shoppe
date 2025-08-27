import { View, Text, Modal, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../Constant';
import Mastercard from '../../assets/SVG/Mastercard.svg';
import Settings from '../../assets/SVG/Settings.svg';
import Check from '../../assets/SVG/Check.svg';

const PaymentModel = ({ visible, onclose }) => {
  const [select, setselect] = useState(false);

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
            Payment Methods
          </Text>
        </View>
        <View
          style={{
            backgroundColor: colors.DarkWhite,
            padding: RF(15),
            paddingVertical: RF(20),
          }}
        >
          <View style={{ ...GST.ROW, gap: RF(10), marginTop: RF(10) }}>
            <TouchableOpacity
              style={{
                backgroundColor: colors.lightblue,
                width: '80%',
                padding: RF(10),
                paddingBottom: RF(20),
                height: RF(150),
                justifyContent: 'space-between',
                borderRadius: RF(10),
              }}
              onPress={() => setselect(!select)}
            >
              <View style={GST.CENTERCONTAINER}>
                <Mastercard height={RF(30)} width={RF(30)} />
                <TouchableOpacity>
                  <Settings height={RF(30)} width={RF(30)} />
                </TouchableOpacity>
              </View>
              <View style={{ gap: RF(13) }}>
                <View style={GST.CENTERCONTAINER}>
                  <Text style={GST.subdescription}>****</Text>
                  <Text style={GST.subdescription}>****</Text>
                  <Text style={GST.subdescription}>****</Text>
                  <Text style={GST.subdescription}>1593</Text>
                </View>
                <View style={GST.CENTERCONTAINER}>
                  <Text style={GST.subdescription}>Amanda Morgan</Text>
                  <Text style={GST.subdescription}>12/22</Text>
                </View>
              </View>
              {select && (
                <Check
                  height={RF(20)}
                  width={RF(20)}
                  style={{ position: 'absolute', top: 0, right: RF(-8) }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                ...GST.CENTER,
                height: RF(150),
                backgroundColor: colors.blue,
                width: RF(50),
                borderRadius: RF(10),
              }}
              onPress={onclose}
            >
              <Text style={{ ...GST.description, color: colors.DarkWhite }}>
                +
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      </View>
    </Modal>
  );
};

export default PaymentModel;
