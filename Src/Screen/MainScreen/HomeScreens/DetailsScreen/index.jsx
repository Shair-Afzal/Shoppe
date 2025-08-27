import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  Touchable,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import Swiper from 'react-native-swiper';
import {
  detailsdata,
  hotPopularData,
  newItemsData,
  storydata,
} from '../../../../utils/Dummydata';
import GST, { colors, RF } from '../../../../Constant';
import styles from './style';
import Share from '../../../../assets/SVG/Share.svg';
import SectionHeader from '../../../../Component/SectionHeader';
import RatingComponent from '../../../../Component/RatingComponent';
import { AirbnbRating, Rating } from 'react-native-ratings';
import TopProduct from '../../../../Component/TopProduct';
import PopularCard from '../../../../Component/PopularCard';
import NewItem from '../../../../Component/NewItem';
import StarRating from 'react-native-star-rating-widget';
import CustomButton from '../../../../Component/Custombutton';
import UnLike from "../../../../assets/SVG/UnLike.svg"
import Like from "../../../../assets/SVG/Like.svg"
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const DetailsScreen = ({navigation}) => {
  const [rating, setRating] = useState(0);
  const [fav,setfav]=useState(false)
  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.FLEX,}}>
      <StatusBar   translucent backgroundColor={"transparent"}/>
    <ScrollView contentContainerStyle={{...GST.FLEXGROW,paddingBottom:RF(50)}}
    showsVerticalScrollIndicator={false}
    >
      <View style={{ height: RF(370) }}>
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={true}
          //   paginationStyle={{ bottom: 10 }}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {detailsdata.map(
            (item, i) => (
              <Image
                source={item.img}
                style={{
                  height: '100%',
                  width: '100%',
                  resizeMode: isTablet ? 'stretch' : 'cover',
                }}
              />
            ),

            //   </View>
          )}
        </Swiper>
      </View>
      <View
        style={{
          paddingHorizontal: RF(15),
          gap: RF(10),
          backgroundColor: colors.DarkWhite,
        }}
      >
        <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10) }}>
          <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
            $17,00
          </Text>
          <Share height={RF(30)} width={RF(30)} />
        </View>
        <Text style={GST.subdescription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam arcu
          mauris, scelerisque eu mauris id, pretium pulvinar sapien.
        </Text>
        <SectionHeader titile={'Variations'} txt btn />
        <View style={{ ...GST.ROW, gap: RF(8) }}>
          <Image
            source={require('../../../../assets/Images/variationsimg.png')}
            style={styles.img}
          />
          <Image
            source={require('../../../../assets/Images/variationsimg.png')}
            style={styles.img}
          />
          <Image
            source={require('../../../../assets/Images/variationsimg.png')}
            style={styles.img}
          />
        </View>
        <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
          Specifications
        </Text>
        <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
          Material
        </Text>
        <View style={{ ...GST.ROW, gap: RF(5) }}>
          <View style={styles.txtconatiner}>
            <Text style={GST.smallesttxt}>Cotton 95%</Text>
          </View>
          <View style={styles.txtconatiner}>
            <Text style={GST.smallesttxt}>Cotton 95%</Text>
          </View>
        </View>
        <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
          Origin
        </Text>
        <View style={styles.euconatiner}>
          <Text style={GST.smallesttxt}>EU</Text>
        </View>
        <SectionHeader
          titile={'Size guide'}
          txtstyle={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}
          txt
        />
        <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
          Delivery
        </Text>
        <View style={styles.deliverbottomcontainer}>
          <View style={styles.deliverdtxtconatiner}>
            <Text style={GST.subdescription}>Standart</Text>
            <View style={styles.daysconatiner}>
              <Text style={{ ...GST.subdescription, color: colors.blue }}>
                5-7 days
              </Text>
            </View>
          </View>
          <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
            $3,00
          </Text>
        </View>
        <View style={styles.deliverbottomcontainer}>
          <View style={styles.deliverdtxtconatiner}>
            <Text style={GST.subdescription}>Standart</Text>
            <View style={styles.daysconatiner}>
              <Text style={{ ...GST.subdescription, color: colors.blue }}>
                5-7 days
              </Text>
            </View>
          </View>
          <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
            $3,00
          </Text>
        </View>
        <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
          Rating & Reviews
        </Text>
        <View style={{ ...GST.ROW }}>
          <StarRating rating={4} starSize={RF(25)} />
          <View
            style={{
              backgroundColor: colors.lightblue,
              padding: 5,
              borderRadius: RF(5),
            }}
          >
            <Text style={GST.smallesttxt}>4/5</Text>
          </View>
        </View>
        <View style={{ ...GST.ROW, gap: RF(15) }}>
          <Image
            source={require('../../../../assets/Images/Reviewimg.png')}
            style={{ height: RF(40), width: RF(40) }}
          />
          <View style={{ gap: RF(5) }}>
            <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
              Veronika
            </Text>
            <StarRating rating={4} starSize={20} />
            <Text style={GST.smallesttxt}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,{'\n'} sed
              diam nonumy eirmod tempor invidunt ut labore et dolore{'\n'} magna
              aliquyam erat, sed ...
            </Text>
          </View>
        </View>
        <CustomButton
          btnTitle={'View All Reviews'}
          style={{ paddingVertical: RF(15), marginTop: RF(10) }}
          onPress={()=> navigation.navigate('home', { 
      screen: 'Home', 
      params: { 
        screen: 'Review' 
      }
    })}
        />
        <SectionHeader titile={'Most Popular'} />
      </View>
      <View style={{ paddingLeft: RF(15), backgroundColor: colors.DarkWhite }}>
        <PopularCard data={hotPopularData} />
        <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
          You might like
        </Text>
        <View style={{ paddingRight: RF(15) }}>
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
      </View>
    </ScrollView>
    <View style={{...GST.CENTERCONTAINER,position:"absolute",bottom:0,width:"100%",backgroundColor:colors.DarkWhite,paddingHorizontal:RF(15),paddingVertical:RF(10)}}>
<TouchableOpacity
onPress={()=>setfav(!fav)}
>
  {!fav?
  <UnLike height={RF(40)} width={RF(40)}/>:
  <Like height={RF(40)} width={RF(40)}/>}
</TouchableOpacity>
<View style={{width:"35%"}}>
  <CustomButton btnTitle={"Add to cart"} style={{padding:RF(10),borderRadius:RF(10),backgroundColor:colors.darkblack}} txtstyle={{...GST.subdescription,color:colors.DarkWhite}}/>
</View>
<View style={{width:"35%",paddingHorizontal:RF(5)}}>
  <CustomButton btnTitle={"Buy now"} style={{padding:RF(10),borderRadius:RF(10),}} txtstyle={{...GST.subdescription,color:colors.DarkWhite}}/>
</View>
    </View>
    </View>
  );
};

export default DetailsScreen;
