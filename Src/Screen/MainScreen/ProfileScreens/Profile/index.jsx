import React, { useEffect } from 'react';
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
  ProductsData,
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
import { useSelector,useDispatch } from 'react-redux';
import { GetAllProducts,GetAllCategories } from '../../../../Redux/slices/Action/Productaction';
import { showErrorToast,showSuccessToast } from '../../../../utils/Toast';
import Loader from '../../../../Component/Loader/Loader';

const Profile = ({ navigation }) => {
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();
    const dispatch=useDispatch();
    const {allproducts,loading,allcategories}=useSelector(state=>state.product)

    const FetchProducts= async ()=>{
     try{
       await dispatch(GetAllProducts({page:1,limit:3})).unwrap();
       showSuccessToast('Products fetched successfully!');
     }catch(err){
       console.log('Error fetching products:',err);
       showErrorToast(err || 'Failed to fetch products');
     }
    }
    const FetchCategories= async ()=>{
     try{
       await dispatch(GetAllCategories()).unwrap();
        showSuccessToast('Categories fetched successfully!');
      }catch(err){
        console.log('Error fetching categories:',err);
        showErrorToast(err || 'Failed to fetch categories');
      }
    }

    useEffect(()=>{
      FetchProducts()
      FetchCategories()
    },[])
     const categoryWithProducts = allcategories.map(cat => {
  const relatedProducts = allproducts.filter(
    prod => prod.categoryId === cat._id
  );
  return {
    ...cat,
    products: relatedProducts,
    count: relatedProducts.length,
  };
});
  

  const sumbit = index => {
    if (index === 1) {
      navigation.navigate('Chat');
    } else if(index==0){
      navigation.navigate('CartTab',{screen:'Payment'})
    }else{
      navigation.navigate('order')
    }
  };

  return (
    <View style={{ ...styles.container, paddingTop: insert.top }}>
      {loading && <Loader />}
      <FlatList
        data={[]} // no list data, only using header for scroll
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headercontainer}>
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
              data={allproducts.slice(0,4)}
              style={{ marginTop: 0 }}
              onPress={() =>
                navigation.navigate('FavouriteTab', {
                  screen: 'RecenltyView',
                })
              }
            />

            {/* <Text style={styles.sectionTitle}>My Orders</Text>
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
            </View> */}

            {/* <Text style={styles.sectionTitle}>Stories</Text> */}
          </View>
        }
        // Render footer (rest of the page) so components that expect full width work fine
        ListFooterComponent={
          <>
            {/* <StoriesCard data={topProductsData} /> */}
            <View style={{ paddingLeft: RF(15) }}>
              <View style={styles.rightcontainer}>
                <SectionHeader
                  titile={'New Items'}
                  onpress={() =>
                    navigation.navigate('HomeTab', {
                      screen: 'Shop',
                    })
                  }
                />
              </View>

              <NewItem data={allproducts} />

              <View style={styles.rightcontainer}>
                <SectionHeader
                  titile={'Most Popular'}
                  onpress={() =>
                    navigation.navigate('HomeTab', {
                      screen: 'Shop',
                    })
                  }
                />
              </View>

              <PopularCard data={allproducts} />
            </View>

            <View style={{ paddingHorizontal: RF(15) }}>
              <SectionHeader
                titile={'Categories'}
                onpress={() => navigation.navigate('CategoriesTab')}
              />

              <FlatList
                data={categoryWithProducts}
                renderItem={({ item }) => <CategoriesList item={item} press />}
                keyExtractor={item => String(item.id)}
                numColumns={2}
                columnWrapperStyle={styles.categoryRow}
                contentContainerStyle={styles.categoriesList}
                scrollEnabled={false} // make inner list non-scrollable
              />

              {/* <SectionHeader titile={'Flash Sale'} clock />
              <FlashCard data={flashSaleData} onPress={()=>navigation.navigate("HomeTab",{
                screen:"FlashSales"
              })}/> */}

              <Text style={{ ...styles.sectionTitle, marginTop: RF(10) }}>
                Top Products
              </Text>
              <TopProduct
                data={allproducts.slice(0,4)}
                onPress={() =>
                  navigation.navigate('HomeTab', {
                    screen: 'Shop',
                  })
                }
              />

              <Text style={{ ...styles.sectionTitle }}>
                Just For You <Text style={{ color: colors.blue }}>★</Text>
              </Text>

              <NewItem
                data={allproducts}
                justfor
                numofcolumn={2}
                contentContainerStyle={{ marginTop: RF(12) }}
                rowstyle={styles.rowcontainer}
                style={styles.con}
                imgstyle={{ width: '100%' }}
                img={styles.conimg}
              />
            </View>
          </>
        }
      />
    </View>
  );
};

export default Profile;
