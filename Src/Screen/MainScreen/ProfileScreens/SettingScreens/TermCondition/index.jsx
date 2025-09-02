import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import GST, { colors, fontFamily, RF } from '../../../../../Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Appicon from '../../../../../assets/SVG/Appicon.svg';
import styles from './style';

const TermCondition = () => {
  const insert = useSafeAreaInsets();
  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }, styles.main]}>
      <View style={[GST.CENTER, styles.iconContainer]}>
        <Appicon
          height={RF(100)}
          width={RF(100)}
          style={styles.appIcon}
        />
      </View>
      <Text style={GST.subHeading}>Term&Condition</Text>
      <View style={styles.section}>
        <Text style={[GST.description, styles.boldText]}>
          Demo Purpose Only
        </Text>
        <Text style={GST.subdescription}>
          This application is a sample e-commerce app created for learning,
          demonstration, and testing purposes. It is not a real shopping
          platform.
        </Text>
        <Text style={[GST.description, styles.boldText]}>
          No Real Transactions
        </Text>
        <Text style={GST.subdescription}>
          All products, prices, and payment options shown in this app are dummy
          data. No actual orders, deliveries, or payments will take place.
        </Text>
        <Text style={[GST.description, styles.boldText]}>
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

