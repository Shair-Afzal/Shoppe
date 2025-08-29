import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, fontFamily, radius, RF } from '../../Constant';
import DisableButton from '../../assets/SVG/DisableButton.svg';
import CustomInput from '../Custominput';
import CustomButton from '../Custombutton';
import { orderHistoryData } from '../../utils/Dummydata';
import { useNavigation } from '@react-navigation/native';
import CustomTicket from '../TicketComponent';
import Icon from '../.../../../assets/SVG/Icon.svg';
import RatingComponent from '../RatingComponent';
import StarRating from 'react-native-star-rating-widget';

const ReviewModel = ({ visible, onclose, unsuccessful, Voucher, review,onPress}) => {
   const [rating, setRating] = useState(0);
  const navigation = useNavigation();
  const sumbit = () => {
    navigation.navigate('Track');
    onclose();
  };
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onclose}
      statusBarTranslucent={true}
    >
      <View style={GST.MODALMAIN}>
        <View style={{ width: '100%', position: 'absolute', bottom: 0 }}>
          <View
            style={{
              backgroundColor: colors.lightblue,
              padding: RF(15),
              width: '100%',
              paddingVertical: RF(25),
              borderTopLeftRadius: RF(10),
              borderTopRightRadius: RF(10),
            }}
          >
            <Text
              style={{
                ...GST.description,
                fontFamily: 'Raleway-Bold',
                textAlign: unsuccessful || Voucher || review ? null : 'center',
              }}
            >
              {unsuccessful
                ? 'Delivery was not successful'
                : Voucher
                ? 'Active Vouchers'
                : review
                ? 'Review'
                : 'Which item you want to review?'}
            </Text>
          </View>
          <View
            style={{
              backgroundColor: colors.DarkWhite,
              padding: RF(15),
              paddingVertical: RF(10),
              height: unsuccessful ? null : RF(300),
            }}
          >
            {!unsuccessful && !Voucher && !review && (
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
                      <Text style={styles.productPrice}>
                        order{item.orderNumber}
                      </Text>
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
                              txtstyle={{
                                ...GST.smallesttxt,
                                color: colors.blue,
                              }}
                              onPress={sumbit}
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                )}
              />
            )}
            {unsuccessful && (
              <>
                <Text
                  style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}
                >
                  What should I do?
                </Text>
                <Text
                  style={{
                    ...GST.smallesttxt,
                    fontSize: RF(12),
                    marginTop: RF(5),
                  }}
                >
                  Don't worry, we will shortly contact you to arrange more
                  suitable time for the delivery. You can also contact us by
                  using this number +00 000 000 000 or chat with our customer
                  care service
                </Text>
                <CustomButton
                  style={{ marginTop: RF(10), paddingVertical: RF(15) }}
                  btnTitle={'Chat Now'}
                  onPress={onclose}
                />
              </>
            )}
            {Voucher && (
              <>
                <View style={{ marginTop: RF(15) }}>
                  <CustomTicket>
                    <View
                      style={{
                        ...GST.CENTERCONTAINER,
                        width: '94%',
                        padding: RF(5),
                        borderBottomWidth: 1,
                        borderStyle: 'dashed',
                        alignSelf: 'center',
                      }}
                    >
                      <Text
                        style={{
                          ...GST.subdescription,
                          color: colors.blue,
                          fontFamily: 'Raleway-Bold',
                        }}
                      >
                        Voucher
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.lightpink,
                          padding: RF(1),
                          borderRadius: radius.radius2,
                          paddingHorizontal: RF(5),
                        }}
                      >
                        <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...GST.ROW,
                        gap: RF(8),
                        marginTop: RF(10),
                        marginLeft: RF(20),
                      }}
                    >
                      <Icon height={RF(15)} width={RF(15)} />
                      <Text
                        style={{
                          ...GST.subdescription,
                          fontFamily: 'Raleway-Bold',
                        }}
                      >
                        First Purchase
                      </Text>
                    </View>
                    <View
                      style={{
                        ...GST.CENTERCONTAINER,
                        width: '97%',
                        padding: RF(2),
                        paddingHorizontal: RF(15),
                      }}
                    >
                      <Text style={GST.smallesttxt}>
                        5% off for your next order
                      </Text>

                      <TouchableOpacity
                        style={{
                          ...GST.CENTER,
                          width: '30%',
                          backgroundColor: colors.blue,
                          padding: RF(8),
                          borderRadius: RF(10),
                        }}
                        onPress={onclose}
                      >
                        <Text
                          style={{
                            ...GST.smallesttxt,
                            color: colors.DarkWhite,
                          }}
                        >
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CustomTicket>
                </View>
                <View style={{ marginTop: RF(15) }}>
                  <CustomTicket>
                    <View
                      style={{
                        ...GST.CENTERCONTAINER,
                        width: '94%',
                        padding: RF(5),
                        borderBottomWidth: 1,
                        borderStyle: 'dashed',
                        alignSelf: 'center',
                      }}
                    >
                      <Text
                        style={{
                          ...GST.subdescription,
                          color: colors.blue,
                          fontFamily: 'Raleway-Bold',
                        }}
                      >
                        Voucher
                      </Text>
                      <View
                        style={{
                          backgroundColor: colors.lightpink,
                          padding: RF(1),
                          borderRadius: radius.radius2,
                          paddingHorizontal: RF(5),
                        }}
                      >
                        <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
                      </View>
                    </View>
                    <View
                      style={{
                        ...GST.ROW,
                        gap: RF(8),
                        marginTop: RF(10),
                        marginLeft: RF(20),
                      }}
                    >
                      <Icon height={RF(15)} width={RF(15)} />
                      <Text
                        style={{
                          ...GST.subdescription,
                          fontFamily: 'Raleway-Bold',
                        }}
                      >
                        First Purchase
                      </Text>
                    </View>
                    <View
                      style={{
                        ...GST.CENTERCONTAINER,
                        width: '97%',
                        padding: RF(2),
                        paddingHorizontal: RF(15),
                      }}
                    >
                      <Text style={GST.smallesttxt}>
                        5% off for your next order
                      </Text>

                      <TouchableOpacity
                        style={{
                          ...GST.CENTER,
                          width: '30%',
                          backgroundColor: colors.blue,
                          padding: RF(8),
                          borderRadius: RF(10),
                        }}
                        onPress={onclose}
                      >
                        <Text
                          style={{
                            ...GST.smallesttxt,
                            color: colors.DarkWhite,
                          }}
                        >
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CustomTicket>
                </View>
              </>
            )}
            {review && (
              <View>
                <View style={{ ...GST.ROW, alignItems: 'center', gap: RF(5) }}>
                  <View style={styles.reviewimgcontainer}>
                    <Image
                      source={require('../../assets/Images/Reviewimg.png')}
                      style={styles.reviewimg}
                    />
                  </View>
                  <View>
                    <Text style={GST.smallesttxt}>
                      Lorem ipsum dolor sit amet consectetur.
                    </Text>
                    <Text
                      style={{
                        ...GST.subdescription,
                        fontFamily: fontFamily.bold,
                      }}
                    >
                      Order #92287157
                    </Text>
                  </View>
                </View>
                <StarRating
                  rating={rating}
                  starSize={RF(40)}
                  onChange={(value) => {
    setRating(value)}}
                  style={{ marginTop: RF(5) }}
                  enableHalfStar={false}
                />
                <CustomInput
                  containerStyle={{
                    borderRadius: RF(10),
                    paddingVertical: RF(0),
                    marginTop: RF(5),
                  }}
                  multiline={true}
                  numberOfLines={5}
                  inputStyle={{ textAlignVertical: 'top' }}
                  placeholder={'Your comment'}
                />
              </View>
            )}
            {review && (
              <CustomButton
                btnTitle={'Say it!'}
                style={{
                  paddingVertical: RF(15),
                  position: 'absolute',
                  bottom: RF(10),
                  marginLeft: RF(15),
                }}
                onPress={onclose}
              />
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ReviewModel;

const styles = StyleSheet.create({
  cartItemContainer: {
    ...GST.ROW,
    borderRadius: RF(12),
    gap: RF(15),
    width: '100%',
    marginTop: RF(12),
  },
  imageContainer: {
    width: RF(120),
    height: RF(110),
    padding: RF(3),
    borderRadius: RF(12),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: RF(10),
    backgroundColor: colors.lightpink,
  },
  deleteButton: {
    position: 'absolute',
    bottom: RF(22),
    left: RF(15),
    width: RF(32),
    height: RF(32),
    borderRadius: RF(16),
    backgroundColor: colors.DarkWhite,
    ...GST.CENTER,
  },

  productDetails: {
    height: RF(110),
    width: RF(180),
    justifyContent: 'space-between',
    borderRadius: RF(12),
  },
  productTitle: {
    ...GST.smallesttxt,
    color: colors.darkblack,
    fontSize: RF(12),
  },
  productPrice: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
  },
  optionsContainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
  },
  optionButton: {
    paddingHorizontal: RF(15),
    paddingVertical: RF(4),
    borderRadius: RF(8),
    ...GST.CENTER,
  },
  colorOption: {
    backgroundColor: colors.lightblue,
  },
  sizeOption: {
    backgroundColor: colors.darkgrey,
  },
  selectedOption: {
    backgroundColor: colors.lightblue,
  },
  optionText: {
    ...GST.subdescription,
    fontFamily: 'NunitoSans-Regular',
    color: colors.darkblack,
  },
  selectedOptionText: {
    color: colors.darkblack,
    fontFamily: 'NunitoSans-SemiBold',
  },
  reviewimgcontainer: {
    height: RF(50),
    width: RF(50),
    borderRadius: RF(100),
    backgroundColor: colors.DarkWhite,
    padding: RF(3),
    elevation: 5,
  },
  reviewimg: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});
