import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { countryData } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const CountryScreen = () => {
  const [select, setselect] = useState('india');
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader name={'Settings'} descrip={'Country'} />
      <TouchableOpacity
        style={{
          ...GST.CENTERCONTAINER,
          marginTop: RF(10),
          backgroundColor: colors.lightblue,
          padding: RF(10),
          borderRadius:RF(10)
        }}
      >
        <Text style={{ ...GST.subdescription, color: colors.blue }}>
          {select}
        </Text>
        <Check height={RF(20)} width={RF(20)} />
      </TouchableOpacity>
      <FlatList
        data={countryData}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View>
            <View style={{...GST.CENTER,padding: RF(2), backgroundColor: colors.grey,width:RF(35),marginTop:RF(20)}}>
              <Text style={GST.subdescription}>{item.title}</Text>
            </View>
            {item.data.map(item => (
                <TouchableOpacity
                onPress={()=>setselect(item.name)}
                >
              <Text style={{...GST.smallesttxt,fontSize:RF(14),marginTop:RF(12)}}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      />
    </View>
  );
};

export default CountryScreen;
