import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import styles from './style';
import CustomButton from '../../../../Component/Custombutton';
import { orderHistoryData } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomModel from '../../../../Component/CustomModel';
import ReviewModel from '../../../../Component/ReviewModel';
const OrderHistory = () => {
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
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
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
                <View style={{ ...GST.ROW, gap: RF(12) }}>
                  <View style={{ width: '50%' }}>
                    <CustomButton
                      style={{
                        paddingVertical: RF(8),
                        backgroundColor: colors.grey,
                        borderRadius: RF(8),
                      }}
                      btnTitle={'April,06'}
                      txtstyle={{ ...GST.smallesttxt }}
                    />
                  </View>
                  <View style={{ width: '45%' }}>
                    <CustomButton
                      style={{
                        paddingVertical: RF(8),
                        borderRadius: RF(8),
                        backgroundColor: colors.DarkWhite,
                        borderWidth: 1,
                        borderColor: colors.blue,
                      }}
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
