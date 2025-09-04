import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import CustomButton from '../../../../Component/Custombutton';
import Chart from '../../../../Component/Chart';
import Rightarrow from '../../../../assets/SVG/Rightarrow.svg';
import Leftarrow from '../../../../assets/SVG/Leftarrow.svg';
import styles from './style';
import { monthlyData } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ActivityScreen = ({ navigation }) => {
  const insert = useSafeAreaInsets();

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December'
  ];
  const currentMonthIndex = new Date().getMonth();
  const [monthIndex, setMonthIndex] = useState(currentMonthIndex);

  const handlePrevMonth = () => {
    setMonthIndex((prev) => (prev === 0 ? 11 : prev - 1));
  };

  const handleNextMonth = () => {
    setMonthIndex((prev) => (prev === 11 ? 0 : prev + 1));
  };

  const currentMonth = months[monthIndex];
  const monthData = monthlyData[currentMonth] || { total: 0, ordered: 0, received: 0, toReceive: 0, sales: [] };

  return (
    <View style={{ ...GST.MAIN, paddingTop: insert.top,paddingBottom:insert.bottom}}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/avatar.png')}
        btn
        txt={'My Activity'}
        icon
      />

      {/* Month Button */}
      <CustomButton
        btnTitle={currentMonth}
        style={styles.btn}
        txtstyle={{ color: colors.blue }}
      />

      {/* Chart with arrows */}
      <View style={styles.cartcontainer}>
        <TouchableOpacity style={styles.navButton} onPress={handlePrevMonth}>
          <Leftarrow />
        </TouchableOpacity>

        <View style={styles.Chartconatiner}>
          <View style={styles.chart}>
            <Chart data={monthData.sales} /> 
          </View>
          <View style={styles.innerconatiner}>
            <Text style={GST.description}>Total</Text>
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
              ${monthData.total}.00
            </Text>
          </View>
        </View>

        <TouchableOpacity style={styles.navButton} onPress={handleNextMonth}>
          <Rightarrow />
        </TouchableOpacity>
      </View>

      {/* Sales Section */}
      <View style={{ height: RF(100) }}>
        <FlatList
          data={monthData.sales}
          numColumns={2}
          columnWrapperStyle={{ gap: RF(10) }}
          contentContainerStyle={{ ...GST.CENTER }}
          renderItem={({ item, index }) => (
            <View
              style={{
                ...styles.productcontainer,
                backgroundColor:
                  index === 0
                    ? colors.blue
                    : index === 1
                    ? colors.green
                    : index === 2
                    ? colors.orange
                    : colors.pink,
              }}
            >
              <Text style={{ ...GST.subdescription, color: colors.DarkWhite }}>
                {item.category} {item.amount}.00
              </Text>
            </View>
          )}
        />
      </View>

      {/* Status Section */}
      <View style={styles.rowconatiner}>
        <View>
          <View style={styles.elipseconatiner}>
            <View style={styles.elipse}>
              <Text style={GST.subdescription}>{monthData.ordered}</Text>
            </View>
          </View>
          <Text style={styles.txt}>Ordered</Text>
        </View>

        <View>
          <View style={styles.elipseconatiner}>
            <View style={styles.elipse}>
              <Text style={GST.subdescription}>{monthData.received}</Text>
            </View>
          </View>
          <Text style={styles.txt}>Received</Text>
        </View>

        <View>
          <View style={styles.elipseconatiner}>
            <View style={styles.elipse}>
              <Text style={GST.subdescription}>{monthData.toReceive}</Text>
            </View>
          </View>
          <Text style={styles.txt}>To Receive</Text>
        </View>
      </View>

      {/* Order History Button */}
      <CustomButton
        btnTitle={'Order History'}
        style={styles.btnbottom}
        onPress={() => navigation.navigate('order')}
      />
    </View>
  );
};

export default ActivityScreen;
