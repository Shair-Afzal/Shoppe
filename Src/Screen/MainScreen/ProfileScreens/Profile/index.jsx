import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Button from '../../../../assets/SVG/Button.svg';
import TopProduct from '../../../../Component/TopProduct';
import {
  categoriesData,
  flashSaleData,
  hotPopularData,
  newItemsData,
  orderStatusData,
  topProductsData,
} from '../../../../utils/Dummydata';
 // fixed import
import SectionHeader from '../../../../Component/SectionHeader';
import NewItem from '../../../../Component/NewItem';
import PopularCard from '../../../../Component/PopularCard';
import CategoriesList from '../../../../Component/CategoriesList';
import FlashCard from '../../../../Component/FlashCard';
import styles from './style';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import StoriesCard from '../../../../Component/StoriesCard/index,';

const Profile = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();

  const sumbit = index => {
    if (index === 1) {
      navigation.navigate('Recive');
    }
  };

  // Outer FlatList is used only for scrolling. We render everything in ListHeaderComponent.
  return (
    <View style={{ ...styles.container, paddingTop: insert.top }}>
      <FlatList
        data={[]} // no list data, only using header for scroll
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={{ paddingHorizontal: RF(15), gap: RF(12) }}>
            <CustomHeader
              profilepic
              source={require('../../../../assets/Images/avatar.png')}
              icon
            />

            <Text style={GST.subHeading}>Hello, Romina!</Text>

            <View style={styles.announcementCard}>
              <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
                Announcement
              </Text>
              <View style={GST.CENTERCONTAINER}>
                <Text style={GST.smallesttxt}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
                  Maecenas hendrerit luctus libero ac vulputate.
                </Text>

                <Button height={RF(30)} width={RF(30)} />
              </View>
            </View>

            <Text style={styles.sectionTitle}>Recently viewed</Text>
            <TopProduct
              data={topProductsData}
              style={{ marginTop: 0 }}
              onPress={() =>
                navigation.navigate('Favourite', {
                  screen: 'RecenltyView',
                })
              }
            />

            <Text style={styles.sectionTitle}>My Orders</Text>
            <View style={styles.ordersContainer}>
              {orderStatusData.map((order, index) => (
                <TouchableOpacity
                  key={order.id ?? index}
                  style={styles.orderButton}
                  onPress={() => sumbit(index)}
                >
                  <Text style={styles.orderButtonText}>{order.title}</Text>
                  {order.hasNotification && <View style={styles.notificationDot} />}
                </TouchableOpacity>
              ))}
            </View>

            <Text style={styles.sectionTitle}>Stories</Text>
          </View>
        }
        // Render footer (rest of the page) so components that expect full width work fine
        ListFooterComponent={
          <>
            <StoriesCard data={topProductsData} />
            <View style={{ paddingLeft: RF(15) }}>
              <View style={{ paddingRight: RF(15) }}>
                <SectionHeader
                  titile={'New Items'}
                  onpress={() =>
                    navigation.navigate('Home', {
                      screen: 'Shop',
                    })
                  }
                />
              </View>

              <NewItem data={newItemsData} />

              <View style={{ paddingRight: RF(15) }}>
                <SectionHeader
                  titile={'Most Popular'}
                  onpress={() =>
                    navigation.navigate('Home', {
                      screen: 'Shop',
                    })
                  }
                />
              </View>

              <PopularCard data={hotPopularData} />
            </View>

            <View style={{ paddingHorizontal: RF(15) }}>
              <SectionHeader
                titile={'Categories'}
                onpress={() => navigation.navigate('Categories')}
              />

              <FlatList
                data={categoriesData}
                renderItem={({ item }) => <CategoriesList item={item} press />}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.categoryRow}
                contentContainerStyle={styles.categoriesList}
                scrollEnabled={false} // make inner list non-scrollable
              />

              <SectionHeader titile={'Flash Sale'} clock />
              <FlashCard data={flashSaleData} />

              <Text style={{ ...styles.sectionTitle, marginTop: RF(10) }}>
                Top Products
              </Text>
              <TopProduct
                data={topProductsData}
                onPress={() =>
                  navigation.navigate('Home', {
                    screen: 'Shop',
                  })
                }
              />

              <Text style={{ ...styles.sectionTitle }}>
                Just For You <Text style={{ color: colors.blue }}>★</Text>
              </Text>

              <NewItem
                data={newItemsData}
                justfor
                numofcolumn={2}
                contentContainerStyle={{ marginTop: RF(12) }}
                rowstyle={{ justifyContent: 'space-between', paddingRight: RF(1) }}
                style={{ width: isTablet ? RF(195) : RF(155), marginLeft: RF(2) }}
                imgstyle={{ width: '100%' }}
                img={{
                  height: isTablet ? RF(190) : RF(150),
                  width: '100%',
                  resizemode: 'cover',
                }}
              />
            </View>
          </>
        }
      />
    </View>
  );
};

export default Profile;
