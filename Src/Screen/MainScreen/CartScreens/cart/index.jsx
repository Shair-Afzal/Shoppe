import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GST, { colors, RF } from '../../../../Constant';
import styles from './style';
import Buttonicon from '../../../../assets/SVG/Buttonicon.svg';
import PopularCard from '../../../../Component/PopularCard';
import SectionHeader from '../../../../Component/SectionHeader';
import { hotPopularData, newItemsData } from '../../../../utils/Dummydata';
import Logo from "../../../../assets/SVG/Logo.svg";
import PaymentFooter from '../../../../Component/PaymentFooter';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ShippingAddressModal from '../../../../Component/ShippingModel';
import CartItem from '../../../../Component/Cartitem';

const STORAGE_KEY = "cartItems";   // key for AsyncStorage

const Cart = ({ navigation, route }) => {
  const [model, setmodel] = useState(false);
  const newProduct = route?.params?.product;
  const [cartItems, setCartItems] = useState([]);
  const insert = useSafeAreaInsets();

  // ✅ Load cart from storage on mount
useEffect(() => {
  const loadCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem(STORAGE_KEY);
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (err) {
      console.error("Error loading cart", err);
    }
  };
  loadCart();
}, []);

// Save cart whenever it changes
useEffect(() => {
  const saveCart = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (err) {
      console.error("Error saving cart", err);
    }
  };
  saveCart();
}, [cartItems]);

// Add product from route.params (with quantity support)
useEffect(() => {
  if (newProduct) {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === newProduct.id);
      if (existingIndex !== -1) {
        const updated = [...prev];
        updated[existingIndex].quantity =
          (updated[existingIndex].quantity || 1) + 1;
        return updated;
      }
      return [...prev, { ...newProduct, quantity: 1 }];
    });
  }
}, [newProduct]);
  // ✅ Delete function
  const handleDelete = (id) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };
  const handleQuantityChange = (id, newQuantity) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    )
  );
};
const calculateTotal = () => {
  return cartItems.reduce((total, item) => {
    const price = Number(item.price) || 0; // ensure number
    return total + price * item.quantity;
  }, 0);
};

  return (
    <View style={GST.FLEX}>
      <ShippingAddressModal add visible={model} onclose={() => setmodel(false)} />
      <View style={{ ...GST.MAIN, paddingTop: insert.top }}>
        <View style={styles.txtcontainer}>
          <Text style={GST.subHeading}>Cart</Text>
          <View style={styles.elipsecircle}>
            <Text style={GST.subdescription}>{cartItems.length}</Text>
          </View>
        </View>

        <View style={styles.announcementCard}>
          <Text style={styles.titletxt}>Shipping Address</Text>
          <View style={GST.CENTERCONTAINER}>
            <Text style={GST.smallesttxt}>
              26, Duong So 2, Thao Dien Ward, An Phu, District 2,{"\n"}Ho Chi Minh city
            </Text>
            <TouchableOpacity onPress={() => setmodel(true)}>
              <Buttonicon height={RF(30)} width={RF(30)} />
            </TouchableOpacity>
          </View>
        </View>

        {cartItems.length !== 0 ? (
         <FlatList
  data={cartItems}
  showsVerticalScrollIndicator={false}
  keyExtractor={(item) => item.id.toString()}
  contentContainerStyle={{ paddingBottom: RF(66) }}
  renderItem={({ item }) => (
    <CartItem
      addcart={true}
      productImage={item.img}
      title={item.title}   // ✅ keep title normal
      price={item.price}
      quantity={item.quantity}  // ✅ pass quantity
      onDelete={() => handleDelete(item.id)}
      onQuantityChange={(newQty) => handleQuantityChange(item.id, newQty)} // ✅ update parent state
      size={item.size}
      color={item.color}
    />
  )}
/>
          
        ) : (
          <>
            <View style={styles.elipseconatiner}>
              <View style={styles.elipse}>
                <Logo height={RF(60)} width={RF(60)} />
              </View>
            </View>

            <View style={styles.bottomcontainer}>
              <View style={styles.sectioncontainer}>
                <SectionHeader
                  titile={"Most Popular"}
                  onpress={() =>
                    navigation.navigate("HomeTab", { screen: "Shop" })
                  }
                />
              </View>
              <View>
                <PopularCard data={newItemsData} />
              </View>
            </View>
          </>
        )}
      </View>

      <PaymentFooter
        title={"Checkout"}
        onPress={() => navigation.navigate("Payment", { cartItems })}
        disbale={cartItems.length==0?true:false}
        style={styles.Paymentfooter}
        btnstyle={{
          backgroundColor: cartItems.length !== 0 ? colors.blue : colors.DarkWhite,
        }}
        txtstyle={{
          color: cartItems.length !== 0 ? colors.DarkWhite : colors.darkblack,
        }}
        price={`$${calculateTotal().toFixed(2)}`}
      />
    </View>
  );
};

export default Cart;
