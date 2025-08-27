import {
  View,
  Text,
  Touchable,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import CustomTicket from '../../../../Component/TicketComponent';
import Icon from '../../../.../../../assets/SVG/Icon.svg';
import { porgressdata } from '../../../../utils/Dummydata';
import Check from '../../../../assets/SVG/Check.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const VoucherScreen = () => {
  const [select, setselect] = useState('Active');
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/avatar.png')}
        btn
        txt={'Vouchers'}
        icon
        // ActiveVourcher={true}
        ActiveVourcher
      />
      <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(15) }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              select == 'Active' ? colors.lightblue : colors.grey,
            padding: RF(5),
            borderRadius: RF(20),
            paddingHorizontal: RF(30),
          }}
          onPress={() => setselect('Active')}
        >
          <Text
            style={{
              ...GST.smallesttxt,
              fontSize: RF(12),
              color: select == 'Active' ? colors.blue : null,
            }}
          >
            Active Rewards
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              select != 'Active' ? colors.lightblue : colors.grey,
            padding: RF(5),
            paddingHorizontal: RF(45),
            borderRadius: RF(20),
          }}
          onPress={() => setselect('Progress')}
        >
          <Text
            style={{
              ...GST.smallesttxt,
              fontSize: RF(12),
              color: select != 'Active' ? colors.blue : null,
            }}
          >
            Progress
          </Text>
        </TouchableOpacity>
      </View>
      {select == 'Active' ? (
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
                <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
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
                  style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}
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
                <Text style={GST.smallesttxt}>5% off for your next order</Text>

                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    width: '30%',
                    backgroundColor: colors.blue,
                    padding: RF(8),
                    borderRadius: RF(10),
                  }}
                >
                  <Text style={{ ...GST.smallesttxt, color: colors.DarkWhite }}>
                    Collected
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
                <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
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
                  style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}
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
                <Text style={GST.smallesttxt}>5% off for your next order</Text>

                <TouchableOpacity
                  style={{
                    ...GST.CENTER,
                    width: '30%',
                    backgroundColor: colors.blue,
                    padding: RF(8),
                    borderRadius: RF(10),
                  }}
                >
                  <Text style={{ ...GST.smallesttxt, color: colors.DarkWhite }}>
                    Collected
                  </Text>
                </TouchableOpacity>
              </View>
            </CustomTicket>
          </View>
        </>
      ) : (
        <FlatList
          data={porgressdata}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: 'space-between' }}
          contentContainerStyle={{
            alignSelf: 'center',
            gap: RF(10),
            marginTop: RF(10),
            width: '100%',
          }}
          renderItem={({ item }) => (
            <View style={{ ...GST.CENTER, gap: RF(10) }}>
              <View
                style={{
                  height: RF(80),
                  width: RF(80),
                  backgroundColor: colors.DarkWhite,
                  elevation: 5,
                  borderRadius: RF(100),
                  padding: RF(4),
                  marginTop: RF(20),
                }}
              >
                <View
                  style={{
                    ...GST.CENTER,
                    borderWidth: 2,
                    height: '100%',
                    width: '100%',
                    borderRadius: RF(100),
                    borderColor: colors.blue,
                  }}
                >
                  <Icon height={RF(20)} width={RF(20)} />
                  <Check
                    height={RF(20)}
                    width={RF(20)}
                    style={{ position: 'absolute', top: 2, right: 0 }}
                  />
                </View>
              </View>
              <Text
                style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}
              >
                {item.title}
              </Text>
              <Text
                style={{
                  ...GST.smallesttxt,
                  maxWidth: RF(150),
                  fontSize: RF(12),
                }}
              >
                {item.txt}
              </Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

export default VoucherScreen;
