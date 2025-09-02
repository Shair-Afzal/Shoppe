import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { languageData } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const LanguageScreen = ({ navigation }) => {
  const [select, setselct] = useState("English");
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      <CustomHeader name={'Settings'} descrip={'Language'} />
      <FlatList
        data={languageData}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[GST.CENTERCONTAINER, styles.itemContainer]}
            onPress={() => setselct(item.name)}
          >
            <Text style={[GST.subdescription, styles.itemText]}>
              {item.name}
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

export default LanguageScreen;


