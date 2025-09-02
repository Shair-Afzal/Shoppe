import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, fontSize, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import CategoriesList from '../../../../Component/CategoriesList';
import { categoriesData } from '../../../../utils/Dummydata';
import ReviewModel from '../../../../Component/ReviewModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const ReciveScreen = ({ navigation }) => {
  const [modal, setmodal] = useState(false);
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }, styles.main]}>
      <CustomHeader
        name={'To Recieve'}
        descrip={'My Orders'}
        icon
        recimg={true}
        source={require('../../../../assets/Images/Reviewimg.png')}
      />

      <ReviewModel visible={modal} onclose={() => setmodal(false)} />

      <FlatList
        data={categoriesData}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
        renderItem={({ item, index }) => (
          <View style={[GST.CENTERCONTAINER, styles.card]}>
            <CategoriesList
              item={item}
              catimg={styles.catImg}
              style={styles.catStyle}
              txt
              num
              disabled={true}
            />

            <View style={styles.detailsContainer}>
              <View style={styles.orderInfo}>
                <View style={styles.orderRow}>
                  <View style={styles.orderLeft}>
                    <Text style={styles.orderNumber}>Order #92287157</Text>
                    <Text style={GST.smallesttxt}>Standard Delivery</Text>
                  </View>
                  <View style={styles.itemBox}>
                    <Text style={styles.itemText}>3 items</Text>
                  </View>
                </View>

                <View style={GST.CENTERCONTAINER}>
                  <Text style={styles.shippedText}>Shipped</Text>

                  <TouchableOpacity
                    style={[
                      styles.trackBtn,
                      index > 2 ? styles.trackBtnReview : styles.trackBtnTrack,
                    ]}
                    onPress={() => {
                      if (index > 2) {
                        setmodal(true);
                      } else {
                        navigation.navigate('Track');
                      }
                    }}
                  >
                    <Text
                      style={[
                        GST.smallesttxt,
                        index > 2 ? styles.reviewText : styles.trackText,
                      ]}
                    >
                      {index > 2 ? 'Review' : 'Track'}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default ReciveScreen;
