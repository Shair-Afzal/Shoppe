import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { countryData } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const CountryScreen = () => {
  const [select, setselect] = useState('india');
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      <CustomHeader name={'Settings'} descrip={'Country'} />

      <TouchableOpacity style={[GST.CENTERCONTAINER, styles.selectedBox]}>
        <Text style={[GST.subdescription, styles.selectedText]}>{select}</Text>
        <Check height={RF(20)} width={RF(20)} />
      </TouchableOpacity>

      <FlatList
        data={countryData}
        keyExtractor={(item, index) => item.title + index}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <View style={styles.sectionHeader}>
              <Text style={GST.subdescription}>{item.title}</Text>
            </View>

            {item.data.map((item, index) => (
              <TouchableOpacity onPress={() => setselect(item.name)} key={index}>
                <Text style={styles.countryName}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default CountryScreen;

