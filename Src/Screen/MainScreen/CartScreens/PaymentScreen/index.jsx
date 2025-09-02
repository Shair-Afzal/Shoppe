import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import SectionHeader from '../../../../Component/SectionHeader';
import styles from './style';
import Buttonicon from '../../../../assets/SVG/Buttonicon.svg';
import CustomButton from '../../../../Component/Custombutton';
import { detailsdata } from '../../../../utils/Dummydata';
import Select from '../../../../assets/SVG/Select.svg';
import PaymentFooter from '../../../../Component/PaymentFooter';
import ShippingAddressModal from '../../../../Component/ShippingModel';
import PaymentModel from '../../../../Component/PaymentModel';
import ReviewModel from '../../../../Component/ReviewModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import CustomModel from '../../../../Component/CustomModel';

const PaymentScreen = ({navigation,route}) => {
  const { product,cartItems} = route.params || {};
  const [model, setmodel] = useState(false);
  const [paymentmodel, setpaymentmodel] = useState(false);
  const [vouchermodel, setvouchermodel] = useState(false);
  const [select, setselct] = useState('standard');
  const insert = useSafeAreaInsets();
  const [pending,setpending]=useState(false);
  const [success,setsucces]=useState(false)
  const calculateTotal = () => {
    if (cartItems) {
      return cartItems.reduce((total, item) => {
        const price = Number(item.price) || 0;
        return total + price * item.quantity;
      }, 0);
    }
    return Number(product?.price) || 0;
  };

  const renderItem = ({ item }) => (
    <View style={styles.renderItemContainer}>
      <View style={styles.renderItemRow}>
        <View style={styles.itemImgWrapper}>
          <Image
            style={styles.itemImg}
            source={item.img}
          />
          <View style={styles.itemBadgeWrapper}>
            <View style={styles.itemBadge}>
              <Text style={GST.smallesttxt}>1</Text>
            </View>
          </View>
        </View>
        <Text style={styles.itemDesc}>
          Lorem ipsum dolor sit amet{'\n'} consectetur.
        </Text>
      </View>
      <Text style={styles.titletxt}>$17,00</Text>
    </View>
  );
 
  const handlePayment = () => {
    setpending(true);
    setsucces(false);
    setTimeout(() => {
      setpending(false);
      setsucces(true);
    }, 2000);
  };

  return (
    <View style={{ ...GST.FLEX, paddingTop: insert.top }}>
      <CustomModel
        visible={pending || success}
        onprogress={pending}
        onsuccess={success}
        onClose={() => {
          setsucces(false);
          setpending(false);
          navigation.navigate('ProfileTab',{
            screen:"Track"
          })
        }}
      />
      <FlatList
        data={detailsdata}
        ListHeaderComponent={
          <>
            <ReviewModel
              Voucher
              visible={vouchermodel}
              onclose={() => setvouchermodel(false)}
            />
            <PaymentModel
              visible={paymentmodel}
              onclose={() => setpaymentmodel(false)}
            />
            <ShippingAddressModal visible={model} onclose={() => setmodel(false)} />
            
            <View style={styles.sectioncontainer}>
              <Text style={GST.subHeading}>Payment</Text>
              <View style={styles.announcementCard}>
                <Text style={styles.titletxt}>Shipping Address</Text>
                <View style={GST.CENTERCONTAINER}>
                  <Text style={GST.smallesttxt}>
                    26, Duong So 2, Thao Dien Ward, An Phu, District 2,{'\n'} Ho Chi
                    Minh city
                  </Text>
                  <TouchableOpacity onPress={() => setmodel(true)}>
                    <Buttonicon height={RF(30)} width={RF(30)} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.announcementCard}>
                <Text style={styles.titletxt}>Contact Information</Text>
                <View style={GST.CENTERCONTAINER}>
                  <Text style={GST.smallesttxt}>
                    26, Duong So 2, Thao Dien Ward, An Phu, District 2,{'\n'} Ho Chi
                    Minh city
                  </Text>
                  <TouchableOpacity onPress={() => setmodel(true)}>
                    <Buttonicon height={RF(30)} width={RF(30)} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.itemsContainer}>
                <View style={styles.txtcontainer}>
                  <Text style={styles.titletxt}>Items</Text>
                  <View style={styles.elipsecircle}>
                    <Text style={GST.subdescription}>0</Text>
                  </View>
                </View>
                <View style={styles.voucherBtnWrapper}>
                  <CustomButton
                    style={styles.voucherBtn}
                    txtstyle={styles.voucherTxt}
                    btnTitle={'Add Voucher'}
                    onPress={() => setvouchermodel(true)}
                  />
                </View>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={styles.sectioncontainer}>
            <Text style={styles.shippingTitle}>
              Shipping Options
            </Text>
            <TouchableOpacity
              style={[
                styles.deliverbottomcontainer,
                { backgroundColor: select !== 'standard' ? colors.grey : colors.lightblue }
              ]}
              onPress={() => setselct('standard')}
            >
              <View style={styles.deliverdtxtconatiner}>
                {select !== 'standard' ? (
                  <View style={styles.radioOuter}>
                    <View style={styles.radioInnerGrey}></View>
                  </View>
                ) : (
                  <Select height={RF(25)} width={RF(25)} />
                )}
                <Text style={GST.subdescription}>Standard</Text>
                <View style={styles.daysconatiner}>
                  <Text style={styles.daysTxt}>
                    5-7 days
                  </Text>
                </View>
              </View>
              <Text style={styles.optionPrice}>
                Free
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.deliverbottomcontainer,
                { backgroundColor: select !== 'express' ? colors.grey : colors.lightblue }
              ]}
              onPress={() => setselct('express')}
            >
              <View style={styles.deliverdtxtconatiner}>
                {select !== 'express' ? (
                  <View style={styles.radioOuter}>
                    <View style={styles.radioInnerGrey}></View>
                  </View>
                ) : (
                  <Select height={RF(25)} width={RF(25)} />
                )}
                <Text style={GST.subdescription}>Express</Text>
                <View style={styles.daysconatiner}>
                  <Text style={styles.daysTxt}>
                    1-2 days
                  </Text>
                </View>
              </View>
              <Text style={styles.optionPrice}>
                $12,00
              </Text>
            </TouchableOpacity>
            
            <SectionHeader
              titile={'Payment Method'}
              txt
              img
              select
              onpress={() => setpaymentmodel(true)}
            />
            
            <View style={styles.paymentMethodBox}>
              <Text style={styles.paymentMethodTxt}>
                Card
              </Text>
            </View>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatlistContainer}
      />
      
      <PaymentFooter
        title={'Pay'}
        btnstyle={{ backgroundColor: colors.darkblack }}
        txtstyle={{ color: colors.DarkWhite }}
        onPress={handlePayment}
        price={`$${calculateTotal().toFixed(2)}`} 
      />
    </View>
  );
};

export default PaymentScreen;
