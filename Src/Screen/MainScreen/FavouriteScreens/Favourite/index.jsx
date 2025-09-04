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

const Favourite = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const insert = useSafeAreaInsets();

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
    const updated = cartItems.filter((it) => it.id !== id);
    setCartItems(updated);
    await AsyncStorage.setItem("favouriteItems", JSON.stringify(updated));
  };

  return (
    <View style={{ ...GST.FLEX, paddingTop: insert.top,paddingBottom:insert.bottom }}>
      <View style={styles.container}>
        <Text style={GST.subHeading}>Wishlist</Text>
        
        <SectionHeader 
          titile={'Recently viewed'} 
          txt 
          onpress={() => navigation.navigate('RecenltyView')} 
        />
        
        <View style={styles.listconatiner}>
          <TopProduct 
            data={topProductsData} 
            onPress={() => navigation.navigate('Home', { screen: 'Shop' })} 
          />
        </View>
        
        {cartItems.length > 0 ? (
          <FlatList 
            data={cartItems}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{paddingBottom: RF(10)}}
            renderItem={({item}) => (
              <CartItem 
                title={item.title}
                productImage={item.img}
                price={item.price}
                onDelete={() => handleDelete(item.id)}
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
      
      {cartItems.length === 0 && (
        <View style={styles.bottomcontainer}>
          <View style={styles.sectioncontainer}>
            <SectionHeader 
              titile={'Most Popular'} 
              onpress={() => navigation.navigate('Home', { screen: 'Shop' })} 
            />
          </View>
          <PopularCard data={hotPopularData} />
        </View>
      )}
    </View>
  );
};

export default Favourite;