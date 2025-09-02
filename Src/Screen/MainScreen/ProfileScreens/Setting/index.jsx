import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import { menuData } from '../../../../utils/Dummydata';
import Righticon from '../../../../assets/SVG/Righticon.svg';
import CustomModel from '../../../../Component/CustomModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const Setting = ({ navigation }) => {
  const [model, setmodel] = useState(false);
  const del = () => {
    setmodel(false);
    navigation.navigate('Login');
  };
  const insert = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={[styles.scrollContainer, { paddingTop: insert.top }]}
      showsVerticalScrollIndicator={false}
    >
      <CustomModel
        deltitile={true}
        txt
        btn
        visible={model}
        onClose={() => setmodel(false)}
        onpress={del}
      />
      <Text style={[GST.subHeading, styles.heading]}>Settings</Text>

      {menuData.map(item => (
        <View key={item.id} style={styles.section}>
          <Text style={[GST.description, styles.sectionTitle]}>
            {item.title}
          </Text>
          {item.screens.map(screenItem => (
            <TouchableOpacity
              key={screenItem.id}
              style={[GST.CENTERCONTAINER, styles.menuItem]}
              onPress={() => navigation.navigate(screenItem.navigateTo)}
            >
              <Text style={GST.subdescription}>{screenItem.name}</Text>
              <View style={[GST.ROW, styles.menuRight]}>
                <Text style={[GST.smallesttxt, styles.menuRightText]}>
                  {screenItem.txt}
                </Text>
                <Righticon />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={() => setmodel(true)}>
        <Text style={[GST.smallesttxt, styles.deleteText]}>
          Delete My Account
        </Text>
      </TouchableOpacity>

      <Text style={[GST.description, styles.footerTitle]}>Slada</Text>
      <Text style={GST.smallesttxt}>Version 1.0 April, 2020</Text>
    </ScrollView>
  );
};

export default Setting;
