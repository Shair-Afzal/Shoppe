import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Touchable,
} from 'react-native';
import React from 'react';
import GST, { colors, fontFamily, RF } from '../../Constant';
import Blueheart from '../../assets/SVG/Blueheart.svg';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const PopularCard = ({ data, onpress }) => {
  const navigation = useNavigation();
  const renderHotPopularItem = ({ item }) => (
    <TouchableOpacity
      style={styles.hotItemContainer}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Details', { product: item })}
    >
      <Image source={item.img} style={styles.hotItemImage} />
      <View style={GST.CENTERCONTAINER}>
        <View style={GST.ROW}>
          <Text style={styles.txt}>
            {item.likes}
          </Text>
          <Blueheart />
        </View>
        <Text style={GST.subdescription}>{item.tag}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderHotPopularItem}
      keyExtractor={item => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.hotPopularList}
    />
  );
};

export default PopularCard;

const styles = StyleSheet.create({
  hotPopularList: {
    // paddingHorizontal: RF(16),
    gap: RF(3),
  },
  hotItemContainer: {
    width: RF(100),
    backgroundColor: colors.DarkWhite,
    padding: RF(5),
    borderRadius: RF(10),
    margin: RF(3),
    elevation: 5,
  },
  hotItemImage: {
    width: '100%',
    height: RF(105),
    borderRadius: RF(4),
    marginBottom: RF(4),
  },
  hotItemText: {
    fontSize: RF(12),
    color: '#000000',
  },
  txt: {
    ...GST.subdescription,
    fontFamily: fontFamily.bold,
  },
});
