import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import { menuData } from '../../../../utils/Dummydata';
import Righticon from '../../../../assets/SVG/Righticon.svg';
import CustomModel from '../../../../Component/CustomModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Setting = ({ navigation }) => {
  const [model, setmodel] = useState(false);
  const del = () => {
    setmodel(false);
    navigation.navigate('Login');
  };
  const insert = useSafeAreaInsets();

  return (
    <ScrollView
      contentContainerStyle={{
        paddingHorizontal: RF(20),
        backgroundColor: colors.DarkWhite,
        paddingBottom: RF(10),
        paddingTop: insert.top,
      }}
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
      <Text style={{ ...GST.subHeading, marginTop: RF(5) }}>Settings</Text>

      {/* Replaced FlatList with manual mapping */}
      {menuData.map(item => (
        <View key={item.id} style={{ marginTop: RF(18) }}>
          <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
            {item.title}
          </Text>
          {item.screens.map(screenItem => (
            <TouchableOpacity
              key={screenItem.id}
              style={{
                ...GST.CENTERCONTAINER,
                marginTop: RF(15),
                borderBottomWidth: 1,
                borderColor: colors.grey,
                paddingVertical: RF(12),
              }}
              onPress={() => navigation.navigate(screenItem.navigateTo)}
            >
              <Text style={{ ...GST.subdescription }}>{screenItem.name}</Text>
              <View style={{ ...GST.ROW, gap: RF(5) }}>
                <Text style={{ ...GST.smallesttxt, fontSize: RF(12) }}>
                  {screenItem.txt}
                </Text>
                <Righticon />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}

      <TouchableOpacity onPress={() => setmodel(true)}>
        <Text
          style={{
            ...GST.smallesttxt,
            color: colors.pink,
            marginTop: RF(15),
            fontSize: RF(12),
          }}
        >
          Delete My Account
        </Text>
      </TouchableOpacity>
      <Text
        style={{
          ...GST.description,
          fontFamily: 'Raleway-Bold',
          marginTop: RF(15),
        }}
      >
        Slada
      </Text>
      <Text style={GST.smallesttxt}>Version 1.0 April, 2020</Text>
    </ScrollView>
  );
};

export default Setting;
