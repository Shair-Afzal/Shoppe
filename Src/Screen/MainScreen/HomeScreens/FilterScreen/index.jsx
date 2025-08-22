import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import SectionHeader from '../../../../Component/SectionHeader';
import TopProduct from '../../../../Component/TopProduct';
import {
  colorsData,
  sizesData,
  sortOptions,
  topProductsData,
} from '../../../../utils/Dummydata';
import styles from './style';
import RangeSlider from '../../../../Component/RangeSlider';
import RangeSliderComponent from '../../../../Component/RangeSlider';
import Select from '../../../../assets/SVG/Select.svg';
import CustomButton from '../../../../Component/Custombutton';
const FilterScreen = () => {
  const [select, setselect] = useState('XS');
  const [slectcolor, setselectcolor] = useState('Light Gray');

  return (
    <View style={{ ...GST.FLEX, paddingTop: RF(25) }}>
      <View style={{ paddingHorizontal: RF(15) }}>
        <SectionHeader titile={'Filter'} txt img txtstyle={GST.subHeading} />
        <TopProduct
          data={topProductsData}
          txt={true}
          numColumns={5}
          stylerow={{ gap: RF(10) }}
          contentContainerStyle={{ paddingVertical: RF(3) }}
          check={true}
        />
        <View style={styles.btnContainer}>
          <Text style={styles.labeltxt}>Shop</Text>
          <View style={{ ...GST.ROW, gap: RF(5) }}>
            <TouchableOpacity style={styles.clothtxtconatiner}>
              <Text style={{ ...GST.smallesttxt, color: colors.blue }}>
                Clothes
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.txtcontainer}>
              <Text style={{ ...GST.smallesttxt }}>shoes</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.filtercontainer}>
          {sizesData.map(item => (
            <TouchableOpacity
              style={select == item.label ? styles.selectbtn : null}
              onPress={() => setselect(item.label)}
            >
              <Text
                style={{
                  ...GST.description,
                  color: select == item.label ? colors.blue : colors.lightblue,
                }}
              >
                {item.value}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={{ ...styles.labeltxt, marginTop: RF(15) }}>Colors</Text>
      </View>
      <View style={{ height: RF(60) }}>
        <FlatList
          data={colorsData}
          horizontal
          contentContainerStyle={{
            paddingLeft: RF(15),
            marginTop: RF(10),
            gap: RF(15),
            height: RF(50),
          }}
          renderItem={({ item, i }) => (
            <TouchableOpacity
              style={{
                backgroundColor: colors.DarkWhite,
                padding: RF(3),
                height: RF(40),
                width: RF(40),
                borderRadius: RF(100),
                elevation: 5,
                borderWidth: slectcolor == item.name ? 1 : 0,
                borderColor: colors.blue,
              }}
              onPress={() => setselectcolor(item.name)}
            >
              {slectcolor == item.name && (
                <Select
                  height={RF(20)}
                  width={RF(20)}
                  style={{ position: 'absolute', top: 0, right: 0, zIndex: 11 }}
                />
              )}
              <View
                style={{
                  backgroundColor: item.hex,
                  width: '100%',
                  height: '100%',
                  borderRadius: RF(100),
                }}
              ></View>
            </TouchableOpacity>
          )}
        />
      </View>

      <RangeSliderComponent />
      <View style={{ paddingHorizontal: RF(15) }}>
        <FlatList
          data={sortOptions}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          renderItem={({ item, i }) => (
            <TouchableOpacity
              style={{
                ...GST.CENTER,
                backgroundColor: colors.grey,
                paddingVertical: RF(8),
                width: RF(100),
                borderRadius: RF(20),
                marginTop: RF(10),
              }}
            >
              <Text style={GST.smallesttxt}>{item.value}</Text>
            </TouchableOpacity>
          )}
        />
        <View style={{...GST.CENTERCONTAINER,marginTop:RF(15)}}>
            <View style={{width:"30%"}}>
            <CustomButton btnTitle={"clear"} style={{backgroundColor:colors.DarkWhite,borderWidth:1,borderColor:colors.blue,padding:RF(12)}} txtstyle={{color:colors.blue}}/>
            </View>
            <View style={{width:"65%",}}>
            <CustomButton btnTitle={"Apply"} style={{padding:RF(12)}}/>
            </View>
        </View>
      </View>
    </View>
  );
};

export default FilterScreen;
