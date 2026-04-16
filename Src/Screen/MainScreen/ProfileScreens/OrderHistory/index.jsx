import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import styles from './style';
import CustomButton from '../../../../Component/Custombutton';
import { orderHistoryData } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomModel from '../../../../Component/CustomModel';
import ReviewModel from '../../../../Component/ReviewModel';
import { useDispatch,useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import {GetCart,MyordersGet} from '../../../../Redux/slices/Action/Productaction';
import { showErrorToast,showSuccessToast } from '../../../../utils/Toast';

const OrderHistory = () => {
  const dispatch = useDispatch();
    const { clientSecret,loading,error,cart,currentorder,allproducts,order} = useSelector((state) => state.product);
    const {user}= useSelector(state => state.user);
    const Fetchorder = async () => {
      try {
        const res = await dispatch(MyordersGet(user?._id)).unwrap();
        console.log(user?._id);
        console.log("API RESPONSE:", res); 
        showSuccessToast('Orders fetched successfully!');
        return res;
      } catch (err) {
        console.log('Error fetching orders:', err);
        showErrorToast(err || 'Failed to fetch orders');
      }
    };
    useEffect(() => {
      Fetchorder();
    }, []);
  const [done,setdone]=useState(false)
  const [modal,setmodal]=useState(false)
    const insert=useSafeAreaInsets()
    const handlereview=()=>{
      setmodal(false)
      setdone(true)
      setTimeout(()=>{
      setdone(false)
      },3000)
    
    }
  return (
    <View style={{...styles.maincontainer,paddingTop:insert.top}}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/avatar.png')}
        btn
        txt={'History'}
        icon
      />
      <CustomModel visible={done} onreviewdone  />
      <ReviewModel visible={modal} review  onclose={handlereview}/>
      <FlatList
        data={orderHistoryData}
        contentContainerStyle={{ paddingBottom: RF(10) }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.cartItemContainer}>
            <View style={styles.imageContainer}>
              <Image
                source={item.image}
                style={styles.productImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.productDetails}>
              <Text style={styles.productTitle}>{item.title}</Text>
              <Text style={styles.productPrice}>order{item.orderNumber}</Text>
              <View style={styles.optionsContainer}>
                <View style={styles.rowconatiner}>
                  <View style={{ width: '50%' }}>
                    <CustomButton
                      style={styles.dateconatiner}
                      btnTitle={'April,06'}
                      txtstyle={{ ...GST.smallesttxt }}
                    />
                  </View>
                  <View style={styles.btncontainer}>
                    <CustomButton
                      style={styles.btn}
                      btnTitle={'Review'}
                      txtstyle={{ ...GST.smallesttxt, color: colors.blue }}
                      onPress={()=>setmodal(true)}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default OrderHistory;
