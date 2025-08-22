import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
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
import StoriesCard from '../../../../Component/StoriesCard/index,';
import SectionHeader from '../../../../Component/SectionHeader';
import NewItem from '../../../../Component/NewItem';
import PopularCard from '../../../../Component/PopularCard';
import CategoriesList from '../../../../Component/CategoriesList';
import { FlatList } from 'react-native';
import FlashCard from '../../../../Component/FlashCard';
import styles from './style';

const Profile = () => {
  const { width, height } = Dimensions.get("window");
   const aspectRatio = height / width;
   const isTablet = aspectRatio < 1.6;
  
  return (
    <View style={{ ...styles.container, paddingTop: RF(15) }}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: RF(15), gap: RF(12) }}>
          <CustomHeader
            profilepic
            source={require('../../../../assets/Images/avatar.png')}
            icon
          />

          <Text style={GST.subHeading}>Hello, Romina!</Text>
          <View style={styles.announcementCard}>
            <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>Announcement</Text>
            <View style={GST.CENTERCONTAINER}>
              <Text style={GST.smallesttxt}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.{'\n'}
                Maecenas hendrerit luctus libero ac vulputate.
              </Text>

              <Button height={RF(30)} width={RF(30)} />
            </View>
          </View>
          <Text style={styles.sectionTitle}>Recently viewed</Text>
          <TopProduct data={topProductsData} style={{ marginTop: 0 }} />

          <Text style={styles.sectionTitle}>My Orders</Text>
          <View style={styles.ordersContainer}>
            {orderStatusData.map((order, index) => (
              <TouchableOpacity key={index} style={styles.orderButton}>
                <Text style={styles.orderButtonText}>{order.title}</Text>
                {order.hasNotification && (
                  <View style={styles.notificationDot} />
                )}
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.sectionTitle}>Stories</Text>
        </View>
        <StoriesCard data={topProductsData} />
        <View style={{ paddingLeft: RF(15) }}>
          <View style={{ paddingRight: RF(15) }}>
            <SectionHeader titile={'New Items'} />
          </View>
          <NewItem data={newItemsData} />
          <View style={{ paddingRight: RF(15) }}>
            <SectionHeader titile={'Most Popular'} />
          </View>
          <PopularCard data={hotPopularData} />
        </View>
        <View style={{ paddingHorizontal: RF(15) }}>
          <SectionHeader titile={'Categories'} />
          <FlatList
            data={categoriesData}
            renderItem={({ item }) => <CategoriesList item={item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={styles.categoryRow}
            contentContainerStyle={styles.categoriesList}
            scrollEnabled={false}
          />
          <SectionHeader titile={'Flash Sale'} clock />
          <FlashCard data={flashSaleData} />
          <Text style={{ ...styles.sectionTitle, marginTop: RF(10) }}>
            Top Products
          </Text>
          <TopProduct data={topProductsData} />
          <Text style={{ ...styles.sectionTitle }}>
            Just For You <Text style={{ color: colors.blue }}>★</Text>
          </Text>
                 {/* <NewItem data={newItemsData} justfor numofcolumn={2} contentContainerStyle={{marginTop:RF(12)}} rowstyle={{justifyContent:"space-between",paddingRight:RF(27)}} imgstyle={{width:RF(155)}} img={{height:RF(150),width:"100%",resizemode:"cover"}}/> */}
           <NewItem data={newItemsData} justfor numofcolumn={2} contentContainerStyle={{marginTop:RF(12)}} rowstyle={{justifyContent:"space-between",paddingRight:RF(1)}}style={{width:isTablet?RF(195):RF(155),marginLeft:RF(2),}} imgstyle={{width:"100%"}} img={{height:isTablet?RF(190):RF(150),width:"100%",resizemode:"cover"}}/>

        </View>
      </ScrollView>
    </View>
  );
};

export default Profile;
