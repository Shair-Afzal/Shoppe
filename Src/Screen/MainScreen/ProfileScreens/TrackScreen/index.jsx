import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Progress1 from '../../../../assets/SVG/Progress1.svg';
import Copy from '../../../../assets/SVG/Copy.svg';
import { TrackData } from '../../../../utils/Dummydata';
import UncompleteProgress from "../../../../assets/SVG/UncompleteProgress.svg";
import Progress from "../../../../assets/SVG/Progress.svg";
import Check from "../../../../assets/SVG/Check.svg";
import ReviewModel from '../../../../Component/ReviewModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style';

const TrackScreen = ({ navigation }) => {
  const [step, setstep] = useState(1);
  const [model, setmodel] = useState(false);

  const sumbit = () => {
    navigation.navigate("Chat");
    setmodel(false);
  };

  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, { paddingTop: insert.top }]}>
      <ReviewModel unsuccessful visible={model} onclose={sumbit} />
      <CustomHeader
        name={'To Recieve'}
        descrip={'Track Your Order'}
        icon
        recimg={true}
        source={require('../../../../assets/Images/Reviewimg.png')}
      />

      <TouchableOpacity onPress={() => setstep(step + 1)}>
        {step == 1 ? (
          <Progress1 height={RF(38)} width={'100%'} style={styles.progressIcon} />
        ) : step == 2 ? (
          <UncompleteProgress height={RF(38)} width={'100%'} style={styles.progressIcon} />
        ) : (
          <Progress height={RF(38)} width={'100%'} style={styles.progressIcon} />
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.trackingContainer}
      onPress={()=>navigation.navigate("Chat")}
      activeOpacity={0.9}
      >
        <View>
          <Text style={styles.trackingTitle}>Tracking Number</Text>
          <Text style={styles.trackingNumber}>LGS-i92927839300763731</Text>
        </View>
        <Copy height={RF(15)} width={RF(15)} />
      </TouchableOpacity>

      <View style={styles.flatlistWrapper}>
        <FlatList
          data={TrackData}
          contentContainerStyle={styles.flatlistContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.trackItem}>
              <View style={GST.CENTERCONTAINER}>
                <Text
                  style={[
                    GST.subdescription,
                    styles.itemTitle,
                    step == 1 && index > 2 ? { color: colors.lightblue } : null,
                  ]}
                >
                  {item.titile}
                </Text>
                <View
                  style={[
                    styles.dateBox,
                    step == 1 && index > 2 ? { backgroundColor: colors.lightblue } : null,
                  ]}
                >
                  <Text style={GST.smallesttxt}>{item.date}</Text>
                </View>
              </View>
              <Text
                style={[
                  GST.smallesttxt,
                  styles.itemText,
                  step == 1 && index > 2 ? { color: colors.lightblue } : null,
                ]}
              >
                {item.txt}
              </Text>
            </View>
          )}
        />
      </View>

      {step > 1 && (
        <>
          <Text style={styles.outForDelivery}>Out for Delivery</Text>
          <Text style={styles.outForDeliveryDesc}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
          </Text>

          {step < 3 && (
            <TouchableOpacity
              style={styles.unsuccessBox}
              onPress={() => setmodel(true)}
            >
              <Text style={styles.unsuccessText}>
                Attempt to deliver your parcel{"\n"}was not successful
              </Text>
              <View style={styles.unsuccessDateBox}>
                <Text style={styles.unsuccessDateText}>April,19 12:50</Text>
              </View>
            </TouchableOpacity>
          )}
        </>
      )}

      {step >= 3 && (
        <>
          <View style={styles.deliveredRow}>
            <Text style={styles.deliveredText}>Delivered</Text>
            <Check height={RF(20)} width={RF(20)} />
          </View>
          <Text style={styles.deliveredDesc}>
            Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.
          </Text>
        </>
      )}
    </View>
  );
};

export default TrackScreen;
