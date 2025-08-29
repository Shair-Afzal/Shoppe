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

const PaymentScreen = ({navigation}) => {
  const [model, setmodel] = useState(false);
  const [paymentmodel, setpaymentmodel] = useState(false);
  const [vouchermodel, setvouchermodel] = useState(false);
  const [select, setselct] = useState('standard');
  const insert = useSafeAreaInsets();
  const [pending,setpending]=useState(false);
  const [success,setsucces]=useState(false)

  const renderItem = ({ item }) => (
    <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10), paddingHorizontal: RF(15) }}>
      <View style={{ ...GST.mid_row, gap: RF(12) }}>
        <View
          style={{
            height: RF(50),
            width: RF(50),
            borderRadius: RF(100),
            elevation: 5,
            backgroundColor: colors.DarkWhite,
            padding: 3,
          }}
        >
          <Image
            style={{
              height: '100%',
              width: '100%',
              resizeMode: 'cover',
              borderRadius: RF(100),
            }}
            source={item.img}
          />

          <View
            style={{
              position: 'absolute',
              top: 4,
              right: 0,
              height: RF(20),
              width: RF(20),
              borderRadius: RF(100),
              backgroundColor: colors.DarkWhite,
              elevation: 5,
              padding: RF(2),
            }}
          >
            <View
              style={{
                ...GST.CENTER,
                height: '100%',
                width: '100%',
                backgroundColor: '#E5EBFC',
                borderRadius: RF(100),
              }}
            >
              <Text style={GST.smallesttxt}>1</Text>
            </View>
          </View>
        </View>
        <Text style={{ ...GST.smallesttxt, fontSize: RF(12) }}>
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
    navigation.navigate('Profile',{
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
            
            <View style={{ paddingHorizontal: RF(15) }}>
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
                  <TouchableOpacity
                  onPress={() => setmodel(true)}
                  >
                    <Buttonicon height={RF(30)} width={RF(30)} />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(10) }}>
                <View style={styles.txtcontainer}>
                  <Text style={styles.titletxt}>Items</Text>
                  <View style={styles.elipsecircle}>
                    <Text style={GST.subdescription}>0</Text>
                  </View>
                </View>
                <View style={{ width: '40%' }}>
                  <CustomButton
                    style={{
                      paddingVertical: RF(6),
                      backgroundColor: colors.DarkWhite,
                      borderWidth: 1,
                      borderColor: colors.blue,
                      borderRadius: RF(10),
                    }}
                    txtstyle={{ ...GST.subdescription, color: colors.blue }}
                    btnTitle={'Add Voucher'}
                    onPress={() => setvouchermodel(true)}
                  />
                </View>
              </View>
            </View>
          </>
        }
        ListFooterComponent={
          <View style={{ paddingHorizontal: RF(15) }}>
            <Text style={{ ...styles.titletxt, marginTop: RF(5) }}>
              Shipping Options
            </Text>
            <TouchableOpacity
              style={{
                ...styles.deliverbottomcontainer,
                backgroundColor:
                  select !== 'standard' ? colors.grey : colors.lightblue,
              }}
              onPress={() => setselct('standard')}
            >
              <View style={styles.deliverdtxtconatiner}>
                {select !== 'standard' ? (
                  <View
                    style={{
                      height: RF(25),
                      width: RF(25),
                      borderRadius: RF(100),
                      backgroundColor: colors.DarkWhite,
                      padding: 3,
                    }}
                  >
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: colors.grey,
                        borderRadius: RF(100),
                      }}
                    ></View>
                  </View>
                ) : (
                  <Select height={RF(25)} width={RF(25)} />
                )}
                <Text style={GST.subdescription}>Standard</Text>
                <View style={styles.daysconatiner}>
                  <Text style={{ ...GST.subdescription, color: colors.blue }}>
                    5-7 days
                  </Text>
                </View>
              </View>
              <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
                Free
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                ...styles.deliverbottomcontainer,
                backgroundColor:
                  select !== 'express' ? colors.grey : colors.lightblue,
              }}
              onPress={() => setselct('express')}
            >
              <View style={styles.deliverdtxtconatiner}>
                {select !== 'express' ? (
                  <View
                    style={{
                      height: RF(25),
                      width: RF(25),
                      borderRadius: RF(100),
                      backgroundColor: colors.DarkWhite,
                      padding: 3,
                    }}
                  >
                    <View
                      style={{
                        height: '100%',
                        width: '100%',
                        backgroundColor: colors.grey,
                        borderRadius: RF(100),
                      }}
                    ></View>
                  </View>
                ) : (
                  <Select height={RF(25)} width={RF(25)} />
                )}
                <Text style={GST.subdescription}>Express</Text>
                <View style={styles.daysconatiner}>
                  <Text style={{ ...GST.subdescription, color: colors.blue }}>
                    1-2 days
                  </Text>
                </View>
              </View>
              <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
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
            
            <View
              style={{
                ...GST.CENTER,
                padding: RF(5),
                backgroundColor: colors.lightblue,
                width: RF(70),
                borderRadius: RF(10),
                marginBottom: RF(20),
              }}
            >
              <Text style={{ ...GST.subdescription, color: colors.blue }}>
                Card
              </Text>
            </View>
          </View>
        }
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: RF(10),
        }}
      />
      
      <PaymentFooter
        title={'Pay'}
        btnstyle={{ backgroundColor: colors.darkblack }}
        txtstyle={{ color: colors.DarkWhite }}
        onPress={handlePayment}
      
      />
    </View>
  );
};

export default PaymentScreen;