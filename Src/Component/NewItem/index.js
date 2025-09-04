import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const NewItem = ({
  data,
  style,
  justfor,
  numofcolumn,
  contentContainerStyle,
  imgstyle,
  rowstyle,
  img,
  discount,
  dstxt,
}) => {
  const navigation = useNavigation();
  const renderNewItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.newItemContainer, style]}
      activeOpacity={0.9}
      onPress={() => navigation.navigate('Details', { product: item })}
    >
      <View style={[styles.imgcontainer, imgstyle]}>
        <Image source={item.img} style={[styles.newItemImage, img]} />
        {discount && (
          <LinearGradient
            colors={['rgba(255, 87, 144, 1)', 'rgba(248, 17, 64, 1)']}
            style={styles.discountTag}
          >
            <Text style={styles.discountText}>-{item.discount}</Text>
          </LinearGradient>
        )}
      </View>
      <Text style={styles.desctxt}>{item.desc}</Text>
      <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
        {item.price}{' '}
        {dstxt && (
          <Text
            style={{
              ...GST.subdescription,
              color: colors.pink,
              textDecorationLine: 'line-through',
            }}
          >
            $50,00
          </Text>
        )}
      </Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data={data}
      renderItem={renderNewItem}
      keyExtractor={item => item.id}
      horizontal={justfor ? false : true}
      numColumns={numofcolumn}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.containerstyle, contentContainerStyle]}
      columnWrapperStyle={rowstyle}
    />
  );
};

export default NewItem;

const styles = StyleSheet.create({
  newItemImage: {
    width: '100%',
    height: RF(120),
    borderRadius: RF(8),
    resizeMode: 'cover',
  },
  newItemDesc: {
    fontSize: RF(12),
    color: '#6C757D',
    marginBottom: RF(4),
  },
  newItemPrice: {
    fontSize: RF(14),
    fontWeight: '600',
    color: '#000000',
  },
  newItemContainer: {
    width: RF(130),
    marginLeft: RF(1.5),
    gap: RF(2),
    marginTop: RF(5),
  },
  containerstyle: {
    gap: RF(10),
  },
  imgcontainer: {
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(10),
    width: RF(130),
    ...GST.CENTER,
    padding: RF(4),
  },
  discountTag: {
    position: 'absolute',
    top: RF(4),
    right: RF(4),
    // backgroundColor: '#DC3545',
    borderRadius: RF(5),
    paddingHorizontal: RF(8),
    paddingVertical: RF(2),
  },
  discountText: {
    fontSize: RF(12),
    color: '#FFFFFF',
    fontWeight: '600',
  },
  desctxt: {
    ...GST.smallesttxt,
    fontSize: RF(12),
  },
});
