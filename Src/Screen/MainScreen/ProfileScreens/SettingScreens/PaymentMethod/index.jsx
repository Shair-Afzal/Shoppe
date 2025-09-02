import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Mastercard from "../../../../../assets/SVG/Mastercard.svg";
import Settings from "../../../../../assets/SVG/Settings.svg";
import { transactionData } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ShippingAddressModal from '../../../../../Component/ShippingModel';
import styles from './style';

const PaymentMethod = () => {
  const [model, setmodel] = useState(false);
  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.FLEX, styles.main, { paddingTop: insert.top }]}>
      <ShippingAddressModal add visible={model} onclose={() => setmodel(false)} />

      <CustomHeader name={'Settings'} descrip={"Payment Methods"} />

      {/* Card Section */}
      <View style={[GST.ROW, styles.cardSection]}>
        <View style={styles.cardBox}>
          <View style={GST.CENTERCONTAINER}>
            <Mastercard height={RF(30)} width={RF(30)} />
            <TouchableOpacity>
              <Settings height={RF(30)} width={RF(30)} />
            </TouchableOpacity>
          </View>

          <View style={styles.cardDetails}>
            <View style={GST.CENTERCONTAINER}>
              <Text style={GST.subdescription}>****</Text>
              <Text style={GST.subdescription}>****</Text>
              <Text style={GST.subdescription}>****</Text>
              <Text style={GST.subdescription}>1593</Text>
            </View>

            <View style={GST.CENTERCONTAINER}>
              <Text style={GST.subdescription}>Amanda Morgan</Text>
              <Text style={GST.subdescription}>12/22</Text>
            </View>
          </View>
        </View>

        {/* Add Button */}
        <TouchableOpacity
          style={[GST.CENTER, styles.addButton]}
          onPress={() => setmodel(true)}
        >
          <Text style={[GST.description, styles.addText]}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Transactions */}
      <View style={styles.transactionList}>
        <FlatList
          data={transactionData}
          renderItem={({ item }) => (
            <View style={styles.transactionItem}>
              <View style={[GST.mid_row, styles.transactionRow]}>
                {item.icon}
                <View>
                  <Text style={[GST.smallesttxt, styles.transactionDate]}>{item.date}</Text>
                  <Text style={[GST.subdescription, styles.transactionBold]}>Order #92287157</Text>
                </View>
              </View>
              <Text style={[GST.subdescription, styles.transactionBold]}>{item.amount}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default PaymentMethod;
