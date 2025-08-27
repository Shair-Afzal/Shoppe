import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import styles from './style';
import CustomButton from '../../../../Component/Custombutton';
import { orderHistoryData } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const OrderHistory = () => {
    const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/profilepic.png')}
        btn
        txt={'History'}
        icon
      />
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
