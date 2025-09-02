import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  FlatList,
} from 'react-native';
import React, { useEffect, useState } from 'react';
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
import UnLike from '../../../../assets/SVG/UnLike.svg';
import Like from '../../../../assets/SVG/Like.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import VariationModal from '../../../../Component/VaritaionModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailsScreen = ({ navigation,route }) => {
  const { product } = route.params;
  const [rating, setRating] = useState(4);
  const [fav, setfav] = useState(false);
  const [model,setmodel]=useState(false)

  const { width, height } = Dimensions.get('window');
  const aspectRatio = height / width;
  const isTablet = aspectRatio < 1.6;
  const insert = useSafeAreaInsets();
  const arr=[1,2,3,4]

  const renderContent = () => (
    <>
      <View style={{ height: RF(370) }}>
        <Swiper
          loop={false}
          showsButtons={false}
          showsPagination={true}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
        >
          {arr.map((item, i) => (
            <Image
              key={i}
              source={product.img}
              style={{
                height: '100%',
                width: '100%',
                resizeMode: isTablet ? 'stretch' : 'cover',
              }}
            />
          ))}
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
        <SectionHeader titile={'Variations'} txt btn onpress={()=>setmodel(true)} />
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
            <Text style={GST.subdescription}>Standard</Text>
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
            <Text style={GST.subdescription}>Standard</Text>
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
          <StarRating rating={rating} starSize={RF(25)} onChange={()=>setRating(4)} />
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
            <StarRating rating={rating} starSize={20} onChange={()=>setRating(4)}/>
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
          onPress={() =>
            navigation.navigate('home', {
              screen: 'HomeTab',
              params: {
                screen: 'Review',
              },
            })
          }
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
    </>
  );
 const buyerfunction = () => {
  setmodel(false);
  navigation.navigate('home', {
    screen: 'CartTab',
    params: {
      screen: 'Payment',
      params: { product }, // ✅ pass product to payment screen
    },
  });
};
  const cartfunction = async () => {
    setmodel(false);

    // Get existing cart from storage
    const storedCart = await AsyncStorage.getItem("cartItems");
    let cart = storedCart ? JSON.parse(storedCart) : [];

    const existingIndex = cart.findIndex((item) => item.id === product.id);
    if (existingIndex !== -1) {
      cart[existingIndex].quantity =
        (cart[existingIndex].quantity || 1) + 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    await AsyncStorage.setItem("cartItems", JSON.stringify(cart));

    // Navigate to cart tab
    navigation.navigate("home", { screen: "CartTab" });
  };
 const toggleFavourite = async () => {
  const storedFav = await AsyncStorage.getItem("favouriteItems");
  let favItems = storedFav ? JSON.parse(storedFav) : [];

  if (!fav) {
    // ✅ Add product safely (store only serializable data)
    const exists = favItems.some((item) => item.id === product.id);
    if (!exists) {
      favItems.push({
        id: product.id,
        title: product.title,
        price: product.price,
        img: product.imgUri || product.img,
        size: product.size || 'M',     // ✅ add size
      color: product.color || 'Pink' // use a string path or remote URL, not require()
      });
    }
  } else {
    // Remove from favourites
    favItems = favItems.filter((item) => item.id !== product.id);
  }

  await AsyncStorage.setItem("favouriteItems", JSON.stringify(favItems));
  setfav(!fav);
};
useEffect(() => {
  const checkFav = async () => {
    const storedFav = await AsyncStorage.getItem("favouriteItems");
    if (storedFav) {
      const favItems = JSON.parse(storedFav);
      const exists = favItems.some((item) => item.id === product.id);
      setfav(exists);
    }
  };
  checkFav();
}, [product]);

  return (
    <View style={{ ...GST.FLEX }}>
      <StatusBar translucent backgroundColor={'transparent'}  />
      <VariationModal visible={model} buypress={buyerfunction} cartpress={cartfunction}/>
      <FlatList
        data={[]}
        renderItem={null}
        ListHeaderComponent={renderContent()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: RF(70) }}
        keyExtractor={() => 'dummy'}
      />
      <View
        style={{
          ...GST.CENTERCONTAINER,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          backgroundColor: colors.DarkWhite,
          paddingHorizontal: RF(15),
          paddingVertical: RF(10),
        }}
      >
        <TouchableOpacity onPress={toggleFavourite}>
          {!fav ? (
            <UnLike height={RF(40)} width={RF(40)} />
          ) : (
            <Like height={RF(40)} width={RF(40)} />
          )}
        </TouchableOpacity>
        <View style={{ width: '35%' }}>
          <CustomButton
            btnTitle={'Add to cart'}
            style={{
              padding: RF(10),
              borderRadius: RF(10),
              backgroundColor: colors.darkblack,
            }}
            txtstyle={{ ...GST.subdescription, color: colors.DarkWhite }}
            onPress={cartfunction}
          />
        </View>
        <View style={{ width: '35%', paddingHorizontal: RF(5) }}>
          <CustomButton
            btnTitle={'Buy now'}
            style={{ padding: RF(10), borderRadius: RF(10) }}
            txtstyle={{ ...GST.subdescription, color: colors.DarkWhite }}
            onPress={buyerfunction}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsScreen;
