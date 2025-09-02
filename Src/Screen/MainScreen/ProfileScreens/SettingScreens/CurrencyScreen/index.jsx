import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import { currencyData } from '../../../../../utils/Dummydata';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';
const CurrencyScreen = () => {
  const [select, setselct] = useState('USD');
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      <CustomHeader name={'Settings'} descrip={'Language'} />

      <FlatList
        data={currencyData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[GST.CENTERCONTAINER, styles.itemContainer]}
            onPress={() => setselct(item.name)}
          >
            <Text style={[GST.subdescription, styles.itemText]}>
              {item.symbol} {item.name}
            </Text>

            {select === item.name ? (
              <Check height={RF(20)} width={RF(20)} />
            ) : (
              <View style={styles.unselectedOuter}>
                <View style={styles.unselectedInner} />
              </View>
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CurrencyScreen;


