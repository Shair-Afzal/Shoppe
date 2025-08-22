import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  ImageBackground,
} from 'react-native'; 
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import BigSaleComponent from '../../../../Component/BigSaleComponent';
import Swiper from 'react-native-swiper';
import Button from '../../../../assets/SVG/Button.svg';
import {
  categoriesData,
  flashSaleData,
  hotPopularData,
  justForYouData,
  newItemsData,
  salesdata,
  topProductsData,
} from '../../../../utils/Dummydata';
import CategoriesList from '../../../../Component/CategoriesList';
import TopProduct from '../../../../Component/TopProduct';
import SectionHeader from '../../../../Component/SectionHeader';
import NewItem from '../../../../Component/NewItem';
import LinearGradient from 'react-native-linear-gradient';
import FlashCard from '../../../../Component/FlashCard';
import PopularCard from '../../../../Component/PopularCard';
import styles from './style' 

const Home = ({navigation}) => {
   const { width, height } = Dimensions.get("window");
 const aspectRatio = height / width;
 const isTablet = aspectRatio < 1.6;
 
  return (
    <View style={{ ...GST.FLEX, paddingTop: RF(15),paddingLeft:RF(15)}}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
      <View style={{paddingRight:RF(15)}}>
        <CustomHeader name={'shope'} input placholder={'Search'} focus={()=>navigation.navigate('Search')} />
        <View style={{ height: isTablet?RF(200):RF(170) }}>
          <Swiper
            loop={false}
            showsButtons={false}
            showsPagination={true}
            paginationStyle={{ bottom: 0 }}
            dotStyle={{ backgroundColor: 'rgba(0, 66, 224, 0.2)' }}
            activeDotStyle={{
              backgroundColor: colors.blue,
              paddingHorizontal: RF(13),
            }}
          >
            {salesdata.map(item => (
              <View style={styles.bannerContainer}>
                <ImageBackground source={item.image} style={styles.bannerImage}>
                  <BigSaleComponent
                    style={{ position: 'absolute', top: 0, right: 0 }}
                  />
                  <View style={styles.bannerTextContainer}>
                    <Text
                      style={{ ...GST.subHeading, color: colors.DarkWhite }}
                    >
                      {item.sales}
                    </Text>
                    <Text
                      style={{ ...GST.description, color: colors.DarkWhite }}
                    >
                      {item.upto}
                    </Text>
                  </View>
                  <Text style={styles.bannerBubbleText}>
                    Happening{'\n'}Now
                  </Text>
                </ImageBackground>
              </View>
            ))}
          </Swiper>
        </View>
        <SectionHeader titile={'Categories'} onpress={()=>navigation.navigate('Categories')}/>
        <FlatList
          data={categoriesData}
          renderItem={({ item }) => <CategoriesList item={item} />}
          keyExtractor={item => item.id}
          numColumns={2}
          columnWrapperStyle={styles.categoryRow}
          contentContainerStyle={styles.categoriesList}
          scrollEnabled={false}
          
        />
        <Text style={{ ...styles.sectionTitle, marginTop: RF(15) }}>
          Top Products
        </Text>
        <TopProduct data={topProductsData} />
        <SectionHeader titile={'New Items'} />
        </View>
        <NewItem data={newItemsData} />
        <View style={{paddingRight:RF(15)}}>
        {/* <View style={styles.flashSaleHeader}>
          <Text style={styles.sectionTitle}>Flash Sale</Text>
          <View style={styles.timerContainer}>
            <Text style={styles.timerIcon}>⏰</Text>
            <Text style={styles.timerText}>00 36 58</Text>
          </View>
        </View> */}
<SectionHeader titile={"Flash Sale"} clock={true}/>
        <FlashCard data={flashSaleData} />
        

        <SectionHeader titile={'Most Popular'} />
        </View>
        <PopularCard data={hotPopularData} />
        <Text style={{...styles.sectionTitle,marginTop:RF(15)}}>Just For You <Text style={{color:colors.blue}}>★</Text></Text>
        <NewItem data={newItemsData} justfor numofcolumn={2} contentContainerStyle={{marginTop:RF(12)}} rowstyle={{justifyContent:"space-between",paddingRight:RF(15)}}style={{width:isTablet?RF(195):RF(155),marginLeft:RF(2),}} imgstyle={{width:"100%"}} img={{height:isTablet?RF(190):RF(150),width:"100%",resizemode:"cover"}}/>
      </ScrollView>
    </View>
  );
};

export default Home;
