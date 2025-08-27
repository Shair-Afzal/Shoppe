import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import CustomButton from '../../../../Component/Custombutton';
import Chart from '../../../../Component/Chart';
import Rightarrow from '../../../../assets/SVG/Rightarrow.svg';
import Leftarrow from '../../../../assets/SVG/Leftarrow.svg';
import styles from './style';
import { Positions } from 'react-native-calendars/src/expandableCalendar';
import { sales } from '../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
const ActivityScreen = ({navigation}) => {
    const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:insert.top}}>
      <CustomHeader
        profilepic
        source={require('../../../../assets/Images/profilepic.png')}
        btn
        txt={'My Activity'}
        icon
      />
      <CustomButton
        btnTitle={'April'}
        style={{
          paddingVertical: RF(13),
          borderRadius: RF(100),
          backgroundColor: colors.darkgrey,
          marginTop: RF(10),
        }}
        txtstyle={{ color: colors.blue }}
      />
      <View style={{ ...GST.CENTERCONTAINER, marginTop: RF(20) }}>
        <TouchableOpacity style={styles.navButton}>
          <Leftarrow />
        </TouchableOpacity>
        <View style={styles.Chartconatiner}>
          <View style={styles.chart}>
            <Chart />
          </View>
          <View
            style={{
              ...GST.CENTER,
              height: RF(110),
              width: RF(110),
              backgroundColor: colors.DarkWhite,
              borderRadius: RF(100),
              elevation: 5,
            }}
          >
            <Text style={GST.description}>Total</Text>
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold' }}>
              $365,00
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.navButton}>
          <Rightarrow />
        </TouchableOpacity>
      </View>
      <View style={{ height: RF(100) }}>
        <FlatList
          data={sales}
          numColumns={2}
          columnWrapperStyle={{ gap: RF(10) }}
          contentContainerStyle={{ ...GST.CENTER }}
          renderItem={({ item, index }) => (
            <View
              style={{
                padding: RF(6),
                backgroundColor:
                  index === 0
                    ? colors.blue
                    : index === 1
                    ? colors.green
                    : index === 2
                    ? colors.orange
                    : colors.pink,
                borderRadius: RF(20),
                marginTop: RF(10),
              }}
            >
              <Text style={{ ...GST.subdescription, color: colors.DarkWhite }}>
                {item.category}
                {item.amount}.00
              </Text>
            </View>
          )}
        />
      </View>
      <View style={{ ...GST.mid_row, gap: RF(15), marginTop: RF(10) }}>
        <View>
          <View
            style={{
              ...GST.CENTER,
              height: RF(70),
              width: RF(70),
              backgroundColor: colors.DarkWhite,
              elevation: 5,
              borderRadius: RF(100),
            }}
          >
            <View
              style={{
                ...GST.CENTER,
                height: RF(45),
                width: RF(45),
                backgroundColor: colors.blue,
                borderRadius: RF(100),
              }}
            >
              <Text style={GST.subdescription}>12</Text>
            </View>
          </View>
          <Text
            style={{
              ...GST.subdescription,
              marginTop: RF(5),
              textAlign: 'center',
            }}
          >
            Ordered
          </Text>
        </View>
        <View>
          <View
            style={{
              ...GST.CENTER,
              height: RF(70),
              width: RF(70),
              backgroundColor: colors.DarkWhite,
              elevation: 5,
              borderRadius: RF(100),
            }}
          >
            <View
              style={{
                ...GST.CENTER,
                height: RF(45),
                width: RF(45),
                backgroundColor: colors.blue,
                borderRadius: RF(100),
              }}
            >
              <Text style={GST.subdescription}>12</Text>
            </View>
          </View>
          <Text
            style={{
              ...GST.subdescription,
              marginTop: RF(5),
              textAlign: 'center',
            }}
          >
            Recieved
          </Text>
        </View>
        <View>
          <View
            style={{
              ...GST.CENTER,
              height: RF(70),
              width: RF(70),
              backgroundColor: colors.DarkWhite,
              elevation: 5,
              borderRadius: RF(100),
            }}
          >
            <View
              style={{
                ...GST.CENTER,
                height: RF(45),
                width: RF(45),
                backgroundColor: colors.blue,
                borderRadius: RF(100),
              }}
            >
              <Text style={GST.subdescription}>12</Text>
            </View>
          </View>
          <Text
            style={{
              ...GST.subdescription,
              marginTop: RF(5),
              textAlign: 'center',
            }}
          >
            To Recieve
          </Text>
        </View>
      </View>
      <CustomButton
        btnTitle={'Order History'}
        style={{
          position: 'absolute',
          bottom: RF(10),
          left: RF(15),
          paddingVertical: RF(15),
        }}
        onPress={()=>navigation.navigate('order')}
      />
    </View>
  );
};

export default ActivityScreen;
