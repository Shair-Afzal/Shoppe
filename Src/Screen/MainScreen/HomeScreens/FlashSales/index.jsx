import {
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
  Dimensions,
  FlatList,
} from 'react-native';
import React from 'react';
import GST, { RF } from '../../../../Constant';
import RightBubble from '../../../../Component/RightBubblecomponent';
import CustomHeader from '../../../../Component/CustomHeader';
import FilterBar from '../../../../Component/Filterbar';
import Filter from '../../../../assets/SVG/Filter.svg';
import NewItem from '../../../../Component/NewItem';
import { hotPopularData, newItemsData } from '../../../../utils/Dummydata';
import SectionHeader from '../../../../Component/SectionHeader';
import PopularCard from '../../../../Component/PopularCard';
import styles from "./style"
import { Screen } from 'react-native-screens';

const FlashSales = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;

  const renderContent = () => (
    <>
      <CustomHeader
        name={'Flash Sale'}
        descrip={'Choose Your Discount'}
        Time={true}
      />
      <FilterBar />
      <TouchableOpacity
        style={styles.imgcon}
        onPress={() => navigation.navigate("Profile",{
          screen:"Live"

        })}
         activeOpacity={0.9}
      >
        <Image
          source={require('../../../../assets/Images/Live.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.discontcon}>
        <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
          20% Discount
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Filter')}>
          <Filter height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>
      <NewItem
        data={newItemsData}
        justfor
        numofcolumn={2}
        contentContainerStyle={styles.itemcontainer}
        rowstyle={styles.rowstyle}
        style={styles.itemstyle}
        imgstyle={styles.itemimgcon}
        img={styles.imgconitem}
        discount={true}
      />
      <Image 
        source={require('../../../../assets/Images/bigsalecard.png')}
        style={{width:"100%",height:RF(130),resizeMode:"contain",marginTop:RF(10)}}
      />
      <SectionHeader titile={'Most Popular'} />
      <PopularCard data={hotPopularData} />
    </>
  );

  return (
    <View style={GST.FLEX}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="light-content"
      />
      <RightBubble style={styles.bg} />
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={renderContent()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.container}
        keyExtractor={() => "dummy"}
      />
    </View>
  );
};

export default FlashSales;