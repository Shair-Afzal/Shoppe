import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  FlatList,
  Dimensions,
} from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import BigSaleComponent from '../../../../Component/BigSaleComponent';
import Swiper from 'react-native-swiper';
import {
  categoriesData,
  ecommerceData,
  flashSaleData,
  hotPopularData,
  newItemsData,
  ProductsData,
  salesdata,
} from '../../../../utils/Dummydata';
import CategoriesList from '../../../../Component/CategoriesList';
import TopProduct from '../../../../Component/TopProduct';
import SectionHeader from '../../../../Component/SectionHeader';
import NewItem from '../../../../Component/NewItem';
import FlashCard from '../../../../Component/FlashCard';
import PopularCard from '../../../../Component/PopularCard';
import styles from './style';
import Model from '../../../../Component/ImageModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const Home = ({ navigation }) => {
  const [show, setShow] = useState(false);
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insets = useSafeAreaInsets();

  return (
    <View style={{ ...styles.maincontainer, paddingTop: insets.top }}>
      <Model visible={show} onClose={() => setShow(false)} />

      <FlatList
        data={[]} // no main data, just sections
        keyExtractor={(item, index) => index.toString()}
        renderItem={null}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingRight: RF(15) }}>
            {/* Header */}
            <CustomHeader
              name={'shope'}
              input
              placholder={'Search'}
              focus={() => navigation.navigate('Search')}
              onimagpicked={() => setShow(true)}
            />

            {/* Swiper Banner */}
            <View style={styles.slidercontainer}>
              <Swiper
                loop={false}
                showsButtons={false}
                showsPagination={true}
                paginationStyle={{ bottom: 0 }}
                dotStyle={styles.dot}
                activeDotStyle={styles.activedot}
              >
                {salesdata.map((item, index) => (
                  <View key={item.id || index} style={styles.bannerContainer}>
                    <ImageBackground
                      source={item.image}
                      style={styles.bannerImage}
                    >
                      <BigSaleComponent style={styles.bg} />
                      <View style={styles.bannerTextContainer}>
                        <Text
                          style={{ ...GST.subHeading, color: colors.DarkWhite }}
                        >
                          {item.sales}
                        </Text>
                        <Text
                          style={{
                            ...GST.description,
                            color: colors.DarkWhite,
                          }}
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

            {/* Categories */}
            <SectionHeader
              titile={'Categories'}
              onpress={() => navigation.navigate('CategoriesTab')}
            />
            <FlatList
              data={categoriesData}
              renderItem={({ item }) => <CategoriesList item={item} />}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              numColumns={2}
              columnWrapperStyle={styles.categoryRow}
              contentContainerStyle={styles.categoriesList}
              scrollEnabled={false}
            />

            {/* Top Products */}
            <Text style={[styles.producttxtstyle, styles.sectionTitle]}>
              Top Products
            </Text>
            <TopProduct
              data={ProductsData}
              onPress={() => navigation.navigate('Details')}
            />

            {/* New Items */}
            <SectionHeader
              titile={'New Items'}
              onpress={() => navigation.navigate('Shop')}
            />
            <NewItem data={newItemsData} />

            {/* Flash Sale */}
            <SectionHeader titile={'Flash Sale'} clock={true} />
            <FlashCard data={flashSaleData} />

            {/* Most Popular */}
            <SectionHeader
              titile={'Most Popular'}
              onpress={() => navigation.navigate('Shop')}
            />
            <PopularCard data={newItemsData} />

            {/* Just For You */}
            <Text style={{ ...styles.sectionTitle, marginTop: RF(15) }}>
              Just For You <Text style={styles.starstyle}>★</Text>
            </Text>
            <NewItem
              data={newItemsData}
              justfor
              numofcolumn={2}
              contentContainerStyle={styles.concontainer}
              rowstyle={styles.rowstyle}
              style={styles.con}
              imgstyle={styles.imgcon}
              img={styles.img}
            />
          </View>
        }
      />
    </View>
  );
};

export default Home;
