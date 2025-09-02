import {
  View,
  Text,
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
import styles from './style';

const VoucherScreen = () => {
  const [select, setselect] = useState('Active');
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }]}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/avatar.png')}
        btn
        txt={'Vouchers'}
        icon
        ActiveVourcher
      />

      <View style={[GST.CENTERCONTAINER, styles.tabContainer]}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            { backgroundColor: select == 'Active' ? colors.lightblue : colors.grey },
          ]}
          onPress={() => setselect('Active')}
        >
          <Text
            style={[
              GST.smallesttxt,
              styles.tabText,
              { color: select == 'Active' ? colors.blue : null },
            ]}
          >
            Active Rewards
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.tabButtonAlt,
            { backgroundColor: select != 'Active' ? colors.lightblue : colors.grey },
          ]}
          onPress={() => setselect('Progress')}
        >
          <Text
            style={[
              GST.smallesttxt,
              styles.tabText,
              { color: select != 'Active' ? colors.blue : null },
            ]}
          >
            Progress
          </Text>
        </TouchableOpacity>
      </View>

      {select == 'Active' ? (
        <>
          <View style={styles.ticketWrapper}>
            <CustomTicket>
              <View style={[GST.CENTERCONTAINER, styles.ticketHeader]}>
                <Text style={[GST.subdescription, styles.ticketHeaderText]}>
                  Voucher
                </Text>
                <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
              </View>

              <View style={[GST.ROW, styles.ticketRow]}>
                <Icon height={RF(15)} width={RF(15)} />
                <Text style={[GST.subdescription, styles.ticketTitle]}>
                  First Purchase
                </Text>
              </View>

              <View style={[GST.CENTERCONTAINER, styles.ticketFooter]}>
                <Text style={GST.smallesttxt}>5% off for your next order</Text>
                <TouchableOpacity style={[GST.CENTER, styles.collectButton]}>
                  <Text style={[GST.smallesttxt, styles.collectText]}>
                    Collected
                  </Text>
                </TouchableOpacity>
              </View>
            </CustomTicket>
          </View>

          <View style={styles.ticketWrapper}>
            <CustomTicket>
              <View style={[GST.CENTERCONTAINER, styles.ticketHeader]}>
                <Text style={[GST.subdescription, styles.ticketHeaderText]}>
                  Voucher
                </Text>
                <Text style={GST.smallesttxt}>Valid Until 5.16.20</Text>
              </View>

              <View style={[GST.ROW, styles.ticketRow]}>
                <Icon height={RF(15)} width={RF(15)} />
                <Text style={[GST.subdescription, styles.ticketTitle]}>
                  First Purchase
                </Text>
              </View>

              <View style={[GST.CENTERCONTAINER, styles.ticketFooter]}>
                <Text style={GST.smallesttxt}>5% off for your next order</Text>
                <TouchableOpacity style={[GST.CENTER, styles.collectButton]}>
                  <Text style={[GST.smallesttxt, styles.collectText]}>
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
          columnWrapperStyle={styles.progressColumn}
          contentContainerStyle={styles.progressList}
          renderItem={({ item }) => (
            <View style={[GST.CENTER, styles.progressItem]}>
              <View style={styles.progressCircleWrapper}>
                <View style={styles.progressCircle}>
                  <Icon height={RF(20)} width={RF(20)} />
                  <Check height={RF(20)} width={RF(20)} style={styles.checkIcon} />
                </View>
              </View>
              <Text style={[GST.subdescription, styles.progressTitle]}>
                {item.title}
              </Text>
              <Text style={[GST.smallesttxt, styles.progressDesc]}>
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
