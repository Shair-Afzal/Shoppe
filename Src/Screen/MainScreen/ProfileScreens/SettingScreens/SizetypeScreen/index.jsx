import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GST, { RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { sizes } from '../../../../../utils/Dummydata';
import styles from './style';  // ⬅️ import stylesheet

const SizeScreen = () => {
  const [select, setSelect] = useState("US");
  const insert = useSafeAreaInsets();

  return (
    <View style={[styles.main, { paddingTop: insert.top }]}>
      <CustomHeader name={'Settings'} descrip={'Language'} />
      <FlatList
        data={sizes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.container}
            onPress={() => setSelect(item.title)}
          >
            <Text style={styles.text}>{item.title}</Text>
            {select === item.title ? (
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

export default SizeScreen;
