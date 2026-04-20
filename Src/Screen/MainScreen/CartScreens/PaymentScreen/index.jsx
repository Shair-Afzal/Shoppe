import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
  InteractionManager,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { useStripe } from '@stripe/stripe-react-native';
import { showErrorToast } from '../../../../utils/Toast';

const PaymentScreen = ({ navigation, route }) => {
  const { orderId } = route.params || {};
  const dispatch = useDispatch();
  const { clientSecret, loading, error, cart, currentorder, allproducts, order } = useSelector((state) => state.product);
  const { user } = useSelector(state => state.user);
  const { initPaymentSheet, presentPaymentSheet } = useStripe();

  // ✅ Track mounted state to prevent state updates after unmount
  const isMounted = useRef(true);
  const [paymentInProgress, setPaymentInProgress] = useState(false);

  // ✅ Modal states — show pending animation → success animation → user taps to navigate
  const [pending, setpending] = useState(false);
  const [success, setsucces] = useState(false);

  const [model, setmodel] = useState(false);
  const [paymentmodel, setpaymentmodel] = useState(false);
  const [vouchermodel, setvouchermodel] = useState(false);
  const [select, setselct] = useState('standard');
  const insert = useSafeAreaInsets();

  const openPaymentSheet = async () => {
    // ✅ Prevent double tap
    if (paymentInProgress) return;

    try {
      if (!clientSecret) {
        showErrorToast("Payment not initialized yet");
        return;
      }

      if (!isMounted.current) return;
      setPaymentInProgress(true);

      // ✅ Handle initPaymentSheet errors
      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: "My Shop",
      });

      if (initError) {
        console.log("Init error:", initError);
        if (isMounted.current) setPaymentInProgress(false);
        return;
      }

      const { error: presentError } = await presentPaymentSheet();

      if (presentError) {
        console.log("Payment cancelled/failed:", presentError);
        if (isMounted.current) setPaymentInProgress(false);
        return;
      }

      console.log("✅ Payment success");

      // ✅ KEY FIX: Wait for Stripe's native Activity to fully close,
      // then show success modal instead of navigating directly.
      // This prevents the crash caused by navigating while Stripe UI is still dismissing.
      if (isMounted.current) {
        setpending(true);
        setsucces(false);

        // Show "pending" for 2 seconds, then show "success"
        setTimeout(() => {
          if (isMounted.current) {
            setpending(false);
            setsucces(true);
          }
        }, 2000);
      }

    } catch (e) {
      console.log("Payment Crash:", e);
      if (isMounted.current) {
        setPaymentInProgress(false);
        setpending(false);
        setsucces(false);
      }
    }
  };

  useEffect(() => {
    // ✅ OrderScreen already calls initializePaymentSheet before navigating here.
    // Removed the duplicate call that was creating 2 payment intents.
    // clientSecret is already set in Redux by the time this screen mounts.

    return () => {
      // ✅ Cleanup on unmount
      isMounted.current = false;
    };
  }, []);

  // ✅ Use currentorder as fallback
  const selectedOrder = order?.find(o => o._id === orderId) || currentorder;

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

  return (
    <View style={{ ...GST.FLEX, paddingTop: insert.top }}>
      {/* ✅ Success modal — shows after Stripe payment completes.
          User taps "Track My Order" button → THEN we navigate (no auto-navigation = no crash) */}
      <CustomModel
        visible={pending || success}
        onprogress={pending}
        onsuccess={success}
        onClose={() => {
          setsucces(false);
          setpending(false);
          // ✅ Wait for modal to close, then navigate safely
          InteractionManager.runAfterInteractions(() => {
            if (isMounted.current) {
              navigation.navigate('ProfileTab', {
                screen: "Track"
              });
            }
          });
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
      // renderItem={renderItem}
      // keyExtractor={(item, index) => index.toString()}
      // showsVerticalScrollIndicator={false}
      // contentContainerStyle={styles.flatlistContainer}
      />

      <PaymentFooter
        title={'Pay'}
        btnstyle={{ backgroundColor: colors.darkblack }}
        txtstyle={{ color: colors.DarkWhite }}
        onPress={openPaymentSheet}
        price={`$${selectedOrder?.total || 0}`}
      />
    </View>
  );
};

export default PaymentScreen;
