import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import { Touchable } from 'react-native';
import Select from '../../../../assets/SVG/Select.svg';
import Options from '../../../../assets/SVG/Options.svg';
import CustomCalendar from '../../../../Component/CustomCalender';
import NewItem from '../../../../Component/NewItem';
import { newItemsData } from '../../../../utils/Dummydata';

const RecentlyView = () => {
  const [model, setmodel] = useState(false);
  const [select,setselect]=useState('today')
   const { width, height } = Dimensions.get('window');
    const aspectRatio = height / width;
    const isTablet = aspectRatio < 1.6;
  return (
    <View style={{ ...GST.MAIN, paddingTop: RF(5) }}>
      <CustomCalendar visible={model} close={() => setmodel(false)} />
      <CustomHeader name={'Recently viewed'} />
      <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10) }}>
        <TouchableOpacity
          style={{
            ...GST.mid_row,
            backgroundColor: select=="today"?colors.lightblue:colors.grey,
            padding: RF(4),
            borderRadius: RF(20),
            width: RF(135),
          }}
          onPress={()=>setselect("today")}
        >
          <Text style={{ ...GST.smallesttxt, fontSize: RF(13) }}>Today</Text>
          {select=="today"&&
          <Select
            height={RF(25)}
            width={RF(25)}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            ...GST.mid_row,
            backgroundColor: select!="today"?colors.lightblue:colors.grey,
            padding: RF(4),
            borderRadius: RF(20),
            width: RF(135),
          }}
          onPress={()=>setselect("yestarday")}
        >
          <Text style={{ ...GST.smallesttxt, fontSize: RF(13) }}>
            Yesterday
          </Text>
          {select!="today"&&
          <Select
            height={RF(25)}
            width={RF(25)}
            style={{ position: 'absolute', top: 0, right: 0 }}
          />
}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setmodel(true)}>
          <Options height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>
      <NewItem
        data={newItemsData}
        justfor
        numofcolumn={2}
        contentContainerStyle={{ marginTop: RF(12),paddingBottom:RF(20)}}
        rowstyle={{ justifyContent: 'space-between', }}
        style={{ width: isTablet ? RF(195) : RF(155), marginLeft: RF(2) }}
        imgstyle={{ width: '100%' }}
        img={{
          height: isTablet ? RF(190) : RF(150),
          width: '100%',
          resizemode: 'cover',
        }}
      />
    </View>
  );
};

export default RecentlyView;
