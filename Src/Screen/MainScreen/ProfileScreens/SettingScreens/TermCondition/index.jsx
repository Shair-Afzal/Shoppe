import { View, Text } from 'react-native';
import React from 'react';
import GST, { colors, fontFamily, RF } from '../../../../../Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Appicon from '../../../../../assets/SVG/Appicon.svg';

const TermCondition = () => {
  const insert = useSafeAreaInsets();
  return (
    <View style={{ ...GST.MAIN, paddingTop: insert.top, paddingTop: RF(10) }}>
      <View style={{ ...GST.CENTER, height: RF(270) }}>
        <Appicon
          height={RF(100)}
          width={RF(100)}
          style={{ marginTop: RF(10), alignSelf: 'center' }}
        />
      </View>
      <Text style={GST.subHeading}>Term&Condition</Text>
      <View style={{ gap: RF(10), marginTop: RF(10) }}>
        <Text style={{ ...GST.description, fontFamily: fontFamily.bold }}>
          Demo Purpose Only
        </Text>
        <Text style={GST.subdescription}>
          This application is a sample e-commerce app created for learning,
          demonstration, and testing purposes. It is not a real shopping
          platform.
        </Text>
        <Text style={{ ...GST.description, fontFamily: fontFamily.bold }}>
          No Real Transactions
        </Text>
        <Text style={GST.subdescription}>
          All products, prices, and payment options shown in this app are dummy
          data. No actual orders, deliveries, or payments will take place.
        </Text>
        <Text style={{ ...GST.description, fontFamily: fontFamily.bold }}>
          No Liability
        </Text>
        <Text style={GST.subdescription}>
          The creators of this app are not responsible for any misunderstanding,
          financial loss, or damage caused by assuming this is a real store.
        </Text>
      </View>
    </View>
  );
};

export default TermCondition;
