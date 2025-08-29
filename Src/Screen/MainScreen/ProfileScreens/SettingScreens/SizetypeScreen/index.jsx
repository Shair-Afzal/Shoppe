import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Check from '../../../../../assets/SVG/Check.svg';
import { languageData, sizes } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const SizeScreen = () => {
     const [select, setselct]=useState("US")
     const  insert=useSafeAreaInsets()
  return (
      <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader name={'Settings'} descrip={'Language'} />
      <FlatList
        data={sizes}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              ...GST.CENTERCONTAINER,
              marginTop: RF(10),
              backgroundColor: colors.lightblue,
              padding: RF(10),
              borderRadius: RF(10),
            }}
            onPress={()=>setselct(item.title)}
          >
            <Text style={{ ...GST.subdescription, color: colors.blue }}>
              {item.title}
            </Text>
            {
                select==item.title?
            
            <Check height={RF(20)} width={RF(20)} />:
            <View
              style={{
                height: RF(20),
                width: RF(20),
                backgroundColor: colors.DarkWhite,
                padding: RF(2),
                borderRadius: RF(100),
              }}
            >
              <View
                style={{
                  backgroundColor: colors.lightpink,
                  height: '100%',
                  width: '100%',
                  borderRadius: RF(100),
                }}
              ></View>
            </View>
        }
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

export default SizeScreen