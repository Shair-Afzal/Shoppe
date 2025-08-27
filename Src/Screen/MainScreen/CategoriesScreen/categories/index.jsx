import { View, Text, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import SectionHeader from '../../../../Component/SectionHeader';
import styles from './style';
import CustomSelector from '../../../../Component/CustomSelector';
import { categories } from '../../../../utils/Dummydata';
import Dropimg from '../../../../assets/SVG/Dropimg.svg';
import Button from '../../../../assets/SVG/Button.svg';

const Categories = ({ navigation }) => {
  const [select, setselect] = useState('all');

  return (
    <View style={styles.container}>
      <SectionHeader
        titile={'All Categories'}
        txt
        img
        txtstyle={GST.subHeading}
        onpress={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: RF(20) }}>
        {/* Top Buttons */}
        <View style={styles.btncontainer}>
          <TouchableOpacity
            style={select === 'all' ? styles.onbtn : styles.btn}
            onPress={() => setselect('all')}>
            <Text style={select === 'all' ? styles.selectedtxt : GST.subdescription}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={select === 'Female' ? styles.onbtn : styles.btn}
            onPress={() => setselect('Female')}>
            <Text style={select === 'Female' ? styles.selectedtxt : GST.subdescription}>Female</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={select === 'Male' ? styles.onbtn : styles.btn}
            onPress={() => setselect('Male')}>
            <Text style={select === 'Male' ? styles.selectedtxt : GST.subdescription}>Male</Text>
          </TouchableOpacity>
        </View>

        {/* Selector */}
        <CustomSelector />

        {/* Category Grid */}
        <View style={{ marginTop: RF(10) }}>
          <FlatList
            data={categories}
            numColumns={2}
            scrollEnabled={false}   // ✅ disables nested scroll & removes warning
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{ justifyContent: 'space-between' }}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.selectbtn}>
                <Text style={{ ...GST.subdescription, fontFamily: 'Raleway' }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* More Selectors */}
        <CustomSelector />
        <CustomSelector />
        <CustomSelector />
        <CustomSelector />

        {/* Just For You */}
        <TouchableOpacity
          style={{
            height: RF(45),
            width: '100%',
            backgroundColor: colors.DarkWhite,
            paddingHorizontal: RF(5),
            borderRadius: RF(10),
            elevation: 5,
            marginTop: RF(10),
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{ ...GST.ROW, gap: RF(10), alignItems: 'center' }}>
            <Dropimg height={RF(35)} width={RF(35)} />
            <Text style={{ ...GST.subdescription, fontFamily: 'Raleway' }}>
              Just For You <Text style={{ color: colors.blue }}>★</Text>
            </Text>
          </View>
          <Button height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default Categories;
