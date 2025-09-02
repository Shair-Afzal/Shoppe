import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Select from '../../../../assets/SVG/Select.svg';
import Options from '../../../../assets/SVG/Options.svg';
import CustomCalendar from '../../../../Component/CustomCalender';
import NewItem from '../../../../Component/NewItem';
import { newItemsData } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';   // ✅ Imported stylesheet

const RecentlyView = () => {
  const [model, setmodel] = useState(false);
  const [select, setselect] = useState('today');
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }]}>
      <CustomCalendar visible={model} close={() => setmodel(false)} />
      <CustomHeader name={'Recently viewed'} />

      {/* Toggle Buttons */}
      <View style={styles.btnContainer}>
        <TouchableOpacity
          style={[
            styles.toggleBtn,
            { backgroundColor: select == 'today' ? colors.lightblue : colors.grey },
          ]}
          onPress={() => setselect('today')}
        >
          <Text style={styles.toggleTxt}>Today</Text>
          {select == 'today' && (
            <Select height={RF(25)} width={RF(25)} style={styles.selectIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleBtn,
            { backgroundColor: select != 'today' ? colors.lightblue : colors.grey },
          ]}
          onPress={() => setselect('yestarday')}
        >
          <Text style={styles.toggleTxt}>Yesterday</Text>
          {select != 'today' && (
            <Select height={RF(25)} width={RF(25)} style={styles.selectIcon} />
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setmodel(true)}>
          <Options height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>

      {/* Items */}
      <NewItem
        data={newItemsData}
        justfor
        numofcolumn={2}
        contentContainerStyle={styles.newItemContainer}
        rowstyle={styles.newItemRow}
        style={{ width: "49%", marginLeft: RF(2) }}
        imgstyle={styles.imgStyle}
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
