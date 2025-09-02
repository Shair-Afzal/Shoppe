import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import TopProduct from '../../../../Component/TopProduct';
import { newItemsData, ProductsData, topProductsData } from '../../../../utils/Dummydata';
import Filter from '../../../../assets/SVG/Filter.svg';
import NewItem from '../../../../Component/NewItem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style'; // ⬅️ external stylesheet
import Model from '../../../../Component/ImageModel';

const ShopeScreen = ({ navigation, route }) => {
  const filters=route?.params?.filters||null;
  const Searchvalue = route?.params?.Searchvalue || '';
  const [search, setsearch] = useState(Searchvalue || '');
  const [filtered, setFiltered] = useState(newItemsData);
  const [show,setShow]=useState(false)

useEffect(() => {
  let newData = newItemsData;

  if (search) {
    newData = newData.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (filters?.name) {
    newData = newData.filter(item =>
      item.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  if (filters?.size) {
    newData = newData.filter(item => item.size.toUpperCase() === filters.size.toUpperCase());
  }

  if (filters?.color) {
    newData = newData.filter(item => item.color === filters.color);
  }

  if (filters?.range) {
    const { low, high } = filters.range;
    newData = newData.filter(item => item.price >= low && item.price <= high);
  }

  if (filters?.sort) {
    if (filters.sort === 'Low to High') {
      newData = [...newData].sort((a, b) => a.price - b.price);
    } else if (filters.sort === 'High to Low') {
      newData = [...newData].sort((a, b) => b.price - a.price);
    }
  }

  setFiltered(newData);
}, [search, filters]);


  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      <Model visible={show} onClose={() => setShow(false)} />
      <CustomHeader
        name={'Shop'}
        input
        placholder={'search'}
        value={search}
        onChangetxt={setsearch}
        containerStyle={{
          backgroundColor: search ? colors.lightblue : colors.grey,
        }}
       
        inputstyle={{color:colors.blue,width:search?"60%":"54%"}}

        filter={search||filters?true:false}
      onimagpicked={() => setShow(true)}
      />
      {
        !search&&!filters&&

      <View style={styles.topProductWrapper}>
        <TopProduct
          data={ProductsData}
          txt={true}
          numColumns={5}
          stylerow={styles.topProductRow}
          contentContainerStyle={styles.topProductContainer}
          onPress={() => navigation.navigate('Details')}
        />

        <View style={[GST.CENTERCONTAINER, styles.allItemsRow]}>
          <Text style={[GST.description, styles.allItemsText]}>All Items</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
            <Filter height={RF(25)} width={RF(25)} />
          </TouchableOpacity>
        </View>
      </View>
}

      {
        filtered.length===0&&
        <View style={{...GST.FLEX,...GST.CENTER}}>
        <Text style={GST.subHeading}>No items found</Text>
        </View>
      }
      <NewItem
        data={filtered}
        justfor
        numofcolumn={2}
        contentContainerStyle={styles.newItemContainer}
        rowstyle={styles.newItemRow}
        style={[styles.newItem, { width: "49%"}]}
        imgstyle={styles.newItemImg}
        img={{
          height: isTablet ? RF(190) : RF(150),
          width: '100%',
          resizemode: 'cover',
        }}
      />
    </View>
  );
};

export default ShopeScreen;
