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
 // Import the updated stylesheet

const ReviewModel = ({ visible, onclose, unsuccessful, Voucher, review, onPress }) => {
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
      <View style={styles.modalMain}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={[
              styles.modalTitle,
              !unsuccessful && !Voucher && !review && styles.modalTitleCenter
            ]}>
              {unsuccessful
                ? 'Delivery was not successful'
                : Voucher
                ? 'Active Vouchers'
                : review
                ? 'Review'
                : 'Which item you want to review?'}
            </Text>
          </View>
          <View style={unsuccessful ? styles.modalBodyNoHeight : styles.modalBody}>
            {!unsuccessful && !Voucher && !review && (
              <FlatList
                data={orderHistoryData}
                contentContainerStyle={styles.flatlistContainer}
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
                        <View style={{ ...GST.CENTERCONTAINER }}>
                          <View style={{ width: '50%' }}>
                            <CustomButton
                              style={styles.dateButton}
                              btnTitle={'April,06'}
                              txtstyle={{ ...GST.smallesttxt }}
                            />
                          </View>
                          <View style={{ width: '45%' }}>
                            <CustomButton
                              style={styles.reviewActionButton}
                              btnTitle={'Review'}
                              txtstyle={styles.reviewActionText}
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
                <Text style={styles.unsuccessfulText}>
                  What should I do?
                </Text>
                <Text style={styles.unsuccessfulDescription}>
                  Don't worry, we will shortly contact you to arrange more
                  suitable time for the delivery. You can also contact us by
                  using this number +00 000 000 000 or chat with our customer
                  care service
                </Text>
                <CustomButton
                  style={styles.chatButton}
                  btnTitle={'Chat Now'}
                  onPress={onclose}
                />
              </>
            )}
            {Voucher && (
              <>
                <View style={styles.voucherSpacing}>
                  <CustomTicket>
                    <View style={styles.voucherHeader}>
                      <Text style={styles.voucherTitle}>
                        Voucher
                      </Text>
                      <View style={styles.voucherValid}>
                        <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
                      </View>
                    </View>
                    <View style={styles.voucherRow}>
                      <Icon height={RF(15)} width={RF(15)} />
                      <Text style={styles.voucherTitle}>
                        First Purchase
                      </Text>
                    </View>
                    <View style={styles.voucherContent}>
                      <Text style={GST.smallesttxt}>
                        5% off for your next order
                      </Text>
                      <TouchableOpacity
                        style={styles.applyButton}
                        onPress={onclose}
                      >
                        <Text style={styles.applyButtonText}>
                          Apply
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </CustomTicket>
                </View>
                <View style={styles.voucherSpacing}>
                  <CustomTicket>
                    <View style={styles.voucherHeader}>
                      <Text style={styles.voucherTitle}>
                        Voucher
                      </Text>
                      <View style={styles.voucherValid}>
                        <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
                      </View>
                    </View>
                    <View style={styles.voucherRow}>
                      <Icon height={RF(15)} width={RF(15)} />
                      <Text style={styles.voucherTitle}>
                        First Purchase
                      </Text>
                    </View>
                    <View style={styles.voucherContent}>
                      <Text style={GST.smallesttxt}>
                        5% off for your next order
                      </Text>
                      <TouchableOpacity
                        style={styles.applyButton}
                        onPress={onclose}
                      >
                        <Text style={styles.applyButtonText}>
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
                <View style={styles.reviewContainer}>
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
                    <Text style={styles.reviewOrderText}>
                      Order #92287157
                    </Text>
                  </View>
                </View>
                <StarRating
                  rating={rating}
                  starSize={RF(40)}
                  onChange={(value) => {
                    setRating(value);
                  }}
                  style={{ marginTop: RF(5) }}
                  enableHalfStar={false}
                />
                <CustomInput
                  containerStyle={styles.reviewInputContainer}
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
                style={styles.reviewButton}
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
    ...GST.CENTERCONTAINER,
    borderRadius: RF(12),
    width: '100%',
    marginTop: RF(12),
  },
  imageContainer: {
    width: "38%",
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
  modalMain: {
    ...GST.MODALMAIN,
  },
  modalContainer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  modalHeader: {
    backgroundColor: colors.lightblue,
    padding: RF(15),
    width: '100%',
    paddingVertical: RF(25),
    borderTopLeftRadius: RF(10),
    borderTopRightRadius: RF(10),
  },
  modalTitle: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
  },
  modalTitleCenter: {
    textAlign: 'center',
  },
  modalBody: {
    backgroundColor: colors.DarkWhite,
    padding: RF(15),
    paddingVertical: RF(10),
    height: RF(300),
  },
  modalBodyNoHeight: {
    backgroundColor: colors.DarkWhite,
    padding: RF(15),
    paddingVertical: RF(10),
  },
  unsuccessfulText: {
    ...GST.subdescription,
    fontFamily: 'Raleway-Bold',
  },
  unsuccessfulDescription: {
    ...GST.smallesttxt,
    fontSize: RF(12),
    marginTop: RF(5),
  },
  voucherHeader: {
    ...GST.CENTERCONTAINER,
    width: '94%',
    padding: RF(5),
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  voucherTitle: {
    ...GST.subdescription,
    color: colors.blue,
    fontFamily: 'Raleway-Bold',
  },
  voucherValid: {
    backgroundColor: colors.lightpink,
    padding: RF(1),
    borderRadius: radius.radius2,
    paddingHorizontal: RF(5),
  },
  voucherRow: {
    ...GST.ROW,
    gap: RF(8),
    marginTop: RF(10),
    marginLeft: RF(20),
  },
  voucherContent: {
    ...GST.CENTERCONTAINER,
    width: '97%',
    padding: RF(2),
    paddingHorizontal: RF(15),
  },
  applyButton: {
    ...GST.CENTER,
    width: '30%',
    backgroundColor: colors.blue,
    padding: RF(8),
    borderRadius: RF(10),
  },
  applyButtonText: {
    ...GST.smallesttxt,
    color: colors.DarkWhite,
  },
  reviewContainer: {
    ...GST.ROW,
    alignItems: 'center',
    gap: RF(5),
  },
  reviewOrderText: {
    ...GST.subdescription,
    fontFamily: fontFamily.bold,
  },
  reviewInputContainer: {
    borderRadius: RF(10),
    paddingVertical: RF(0),
    marginTop: RF(5),
  },
  reviewButton: {
    paddingVertical: RF(15),
    position: 'absolute',
    bottom: RF(10),
    marginLeft: RF(15),
  },
  dateButton: {
    paddingVertical: RF(8),
    backgroundColor: colors.grey,
    borderRadius: RF(8),
  },
  reviewActionButton: {
    paddingVertical: RF(8),
    borderRadius: RF(8),
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  reviewActionText: {
    ...GST.smallesttxt,
    color: colors.blue,
  },
  chatButton: {
    marginTop: RF(10),
    paddingVertical: RF(15),
  },
  voucherSpacing: {
    marginTop: RF(15),
  },
  flatlistContainer: {
    paddingBottom: RF(10),
  },
});


