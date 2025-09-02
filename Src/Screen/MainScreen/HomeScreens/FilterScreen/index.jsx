import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import SectionHeader from '../../../../Component/SectionHeader';
import TopProduct from '../../../../Component/TopProduct';
import {
  colorsData,
  ProductsData,
  sizesData,
  sortOptions,
  topProductsData,
} from '../../../../utils/Dummydata';
import styles from './style';
import RangeSliderComponent from '../../../../Component/RangeSlider';
import Select from '../../../../assets/SVG/Select.svg';
import CustomButton from '../../../../Component/Custombutton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FilterScreen = ({ navigation }) => {
  const [select, setselect] = useState('XS');
  const [slectcolor, setselectcolor] = useState('Light Gray');
  const [option, setoption] = useState('');
  const insert = useSafeAreaInsets();
   const [low, setLow] = useState(10);
    const [high, setHigh] = useState(90);
    const [name,setname]=useState('shoe')

  // ✅ Clear button logic
  const handleClear = () => {
    setselect('XS');
    setselectcolor('Light Gray');
    setoption('');
  };

  return (
    <View style={[GST.FLEXGROW, { paddingTop: insert.top, backgroundColor: colors.white }]}>
      <View style={styles.maincontainer}>
        <View style={styles.sectionWrapper}>
          <SectionHeader
            titile={'Filter'}
            txt
            img
            txtstyle={GST.subHeading}
            onpress={() => navigation.goBack()}
          />

          <TopProduct
            data={ProductsData}
            txt={true}
            numColumns={5}
            stylerow={styles.row}
            contentContainerStyle={styles.container}
            check={true}
            onPress={(item)=>setname(item.name)}
          />

          {/* Shop Buttons */}
          <View style={styles.btnContainer}>
            <Text style={styles.labeltxt}>Shop</Text>
            <View style={styles.shopRow}>
              <TouchableOpacity style={styles.clothtxtconatiner}>
                <Text style={[GST.smallesttxt, { color: colors.blue }]}>Clothes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.txtcontainer}>
                <Text style={GST.smallesttxt}>shoes</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Sizes */}
          <View style={styles.filtercontainer}>
            {sizesData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={select == item.label ? styles.selectbtn : null}
                onPress={() => setselect(item.label)}
              >
                <Text
                  style={[
                    GST.description,
                    { color: select == item.label ? colors.blue : '#AAC3FF' },
                  ]}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Text style={[styles.labeltxt, styles.colorLabel]}>Colors</Text>
        </View>

        {/* FlatList Container */}
        <FlatList
          data={[]}
          ListHeaderComponent={
            <>
              {/* Colors */}
              <View style={styles.colorListWrapper}>
                <FlatList
                  data={colorsData}
                  horizontal
                  contentContainerStyle={styles.colorListContainer}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.colorCircle,
                        { borderWidth: slectcolor == item.name ? 1 : 0 },
                      ]}
                      onPress={() => setselectcolor(item.name)}
                    >
                      {slectcolor == item.name && (
                        <Select height={RF(30)} width={RF(30)} style={styles.selectIcon} />
                      )}
                      <View style={[styles.innerColor, { backgroundColor: item.hex }]}></View>
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              {/* Range Slider */}
              <RangeSliderComponent  low={low} high={high} setHigh={setHigh} setLow={setLow}/>

              {/* Sort Options */}
              <View style={styles.sectionWrapper}>
                <FlatList
                  data={sortOptions}
                  numColumns={2}
                  columnWrapperStyle={styles.columnWrapper}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.sortOption,
                        { backgroundColor: option == item.value ? colors.lightblue : colors.grey },
                      ]}
                      onPress={() => setoption(item.value)}
                    >
                      <Text
                        style={[
                          GST.smallesttxt,
                          { color: option == item.value ? colors.blue : colors.darkblack },
                        ]}
                      >
                        {item.value}
                      </Text>
                      {option == item.value && (
                        <Select height={RF(20)} width={RF(20)} style={styles.sortSelectIcon} />
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </>
          }
          ListFooterComponent={
            <View style={styles.footerWrapper}>
              <View style={styles.clearBtnWrapper}>
                <CustomButton
                  btnTitle={'Clear'}
                  style={styles.clearBtn}
                  txtstyle={styles.clearBtnText}
                  onPress={handleClear}
                />
              </View>
              <View style={styles.applyBtnWrapper}>
                <CustomButton
  btnTitle={'Apply'}
  style={styles.applyBtn}
  onPress={() =>{
    navigation.navigate('home', {
      screen: 'HomeTab',
      params: {
        screen: 'Shop',
        params: {
          filters: {
            size: select,
            color: slectcolor,
            sort: option,
            range: { low, high },
            name:name
          },
        },
      },
    })
    console.log("name",name)
  }
  }
/>
                
              </View>
            </View>
          }
          renderItem={null}
          keyExtractor={() => 'dummy'}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FilterScreen;
