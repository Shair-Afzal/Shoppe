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
import RangeSliderComponent from '../../../../Component/RangeSlider';
import Select from '../../../../assets/SVG/Select.svg';
import CustomButton from '../../../../Component/Custombutton';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const FilterScreen = ({navigation}) => {
  const [select, setselect] = useState('XS');
  const [slectcolor, setselectcolor] = useState('Light Gray');
  const [option,setoption]=useState('');
  const insert=useSafeAreaInsets();

  return (
    <View style={{...GST.FLEXGROW, paddingTop:insert.top}}>
      <View style={styles.maincontainer}>
        <View style={{ paddingHorizontal: RF(15) }}>
          <SectionHeader 
            titile={'Filter'} 
            txt img 
            txtstyle={GST.subHeading} 
            onpress={()=>navigation.goBack()}
          />
          <TopProduct
            data={topProductsData}
            txt={true}
            numColumns={5}
            stylerow={styles.row}
            contentContainerStyle={styles.container}
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
            {sizesData.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={select == item.label ? styles.selectbtn : null}
                onPress={() => setselect(item.label)}
              >
                <Text
                  style={{
                    ...GST.description,
                    color: select == item.label ? colors.blue : "#AAC3FF",
                  }}
                >
                  {item.value}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={{ ...styles.labeltxt, marginTop: RF(15) }}>Colors</Text>
        </View>
        
        <FlatList
          data={[]} // Empty data to use as a scroll container
          ListHeaderComponent={
            <>
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
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
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
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>

              <RangeSliderComponent />
              
              <View style={{ paddingHorizontal: RF(15) }}>
                <FlatList
                  data={sortOptions}
                  numColumns={2}
                  columnWrapperStyle={{ justifyContent: 'space-between' }}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity
                      key={index}
                      style={{
                        ...GST.CENTER,
                        backgroundColor: option==item.value?colors.lightblue: colors.grey,
                        paddingVertical: RF(5),
                        width: RF(115),
                        borderRadius: RF(20),
                        marginTop: RF(10),
                      }}
                      onPress={()=>setoption(item.value)}
                    >
                      <Text style={{...GST.smallesttxt,color:option==item.value?colors.blue:colors.darkblack}}>
                        {item.value}
                      </Text>
                      {option==item.value && (
                        <Select 
                          height={RF(20)} 
                          width={RF(20)} 
                          style={{position:"absolute",right:0}}
                        />
                      )}
                    </TouchableOpacity>
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              </View>
            </>
          }
          ListFooterComponent={
            <View style={{...GST.CENTERCONTAINER,paddingHorizontal:RF(15),marginTop:RF(15), marginBottom: RF(20)}}>
              <View style={{width:"30%"}}>
                <CustomButton 
                  btnTitle={"clear"} 
                  style={{
                    backgroundColor:colors.DarkWhite,
                    borderWidth:1,
                    borderColor:colors.blue,
                    padding:RF(12),
                  }} 
                  txtstyle={{color:colors.blue}}
                />
              </View>
              <View style={{width:"65%"}}>
                <CustomButton 
                  btnTitle={"Apply"} 
                  style={{padding:RF(12)}} 
                  onPress={()=>navigation.navigate('Shop')}
                />
              </View>
            </View>
          }
          renderItem={null}
          keyExtractor={() => "dummy"}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default FilterScreen;