import { View, Text, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import SectionHeader from '../../../../Component/SectionHeader';
import TopProduct from '../../../../Component/TopProduct';
import { hotPopularData, topProductsData } from '../../../../utils/Dummydata';
import Empty from '../../../../assets/SVG/Empty.svg';
import PopularCard from '../../../../Component/PopularCard';
import styles from './style';
import CartItem from '../../../../Component/Cartitem';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavourite } from '../../../../Redux/slices/Action/Productaction';
import { showSuccessToast } from '../../../../utils/Toast';
import Loader from '../../../../Component/Loader/Loader';


const Favourite = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const dispatch=useDispatch()
  const {favourites,loading,allproducts}=useSelector((state)=>state.product)
  const insert = useSafeAreaInsets();
  const productswithfav=allproducts.filter((item)=>favourites?.includes(item._id))
  const handleFav = async (item) => {
        try{
           await dispatch(toggleFavourite({ productId:item._id })).unwrap();
           showSuccessToast('Product deleted to favourite !');
        }catch(err){
          showErrorToast(err || 'Failed to add product to favourites');
  
        }
   
  };

  // ✅ Load favorites function
  useEffect(() => {
    const loadFavourites = async () => {
      try {
        const storedFav = await AsyncStorage.getItem("favouriteItems");
        if (storedFav) {
          setCartItems(JSON.parse(storedFav));
        }
      } catch (err) {
        console.error("Error loading favourites", err);
      }
    };
    
    const unsubscribe = navigation.addListener('focus', loadFavourites);
    loadFavourites();
    
    return unsubscribe;
  }, [navigation]);

  // ✅ Delete function
  const handleDelete = async (id) => {
    const updated = cartItems.filter((it) => it._id !== _id);
    setCartItems(updated);
    await AsyncStorage.setItem("favouriteItems", JSON.stringify(updated));
  };

  return (
    <View style={{ ...GST.FLEX, paddingTop: insert.top,paddingBottom:insert.bottom }}>
      {loading&&<Loader/>}
      <View style={styles.container}>
        <Text style={GST.subHeading}>Wishlist</Text>
        
        <SectionHeader 
          titile={'Recently viewed'} 
          txt 
          onpress={() => navigation.navigate('RecenltyView')} 
        />
        
        <View style={styles.listconatiner}>
          <TopProduct 
            data={allproducts} 
            onPress={() => navigation.navigate('Home', { screen: 'Shop' })} 
          />
        </View>
        
        {productswithfav.length > 0 ? (
          <FlatList 
            data={productswithfav}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item._id}
            contentContainerStyle={{paddingBottom: RF(10)}}
            renderItem={({item}) => (
              <CartItem 
                title={item.name

                }
                productImage={{uri:item?.image?.[0]}}
                price={item?.price}
                onDelete={() =>handleFav(item)}
                color={item.color}
                size={item.size}
              />
            )}
          />
        ) : (
          <View style={styles.elipseconatiner}>
            <View style={styles.elipse}>
              <Empty height={RF(70)} width={RF(70)} />
            </View>
          </View>
        )}
      </View>
      
      {productswithfav.length === 0 && (
        <View style={styles.bottomcontainer}>
          <View style={styles.sectioncontainer}>
            <SectionHeader 
              titile={'Most Popular'} 
              onpress={() => navigation.navigate('Home', { screen: 'Shop' })} 
            />
          </View>
          <PopularCard data={allproducts} />
        </View>
      )}
    </View>
  );
};

export default Favourite;