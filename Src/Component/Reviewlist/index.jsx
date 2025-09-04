import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import GST, { colors, RF } from '../../Constant';
import { reviewData } from '../../utils/Dummydata';

const ReviewList = () => {


  const dummyFunction = () => {
    // This function does nothing - makes the rating read-only
  };

  const renderReviewItem = ({ item }) => (
    <View style={[GST.ROW, styles.reviewRow]}>
      <View style={styles.avatarContainer}>
        <Image source={item.image} style={styles.avatarImage} />
      </View>
      <View style={styles.reviewContent}>
        <Text style={[GST.subdescription, styles.nameText]}>{item.name}</Text>
        <StarRating rating={item.rating} starSize={20} onChange={dummyFunction} />
        <Text style={[GST.smallesttxt, styles.commentText]}>{item.comment}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviewData}
      renderItem={renderReviewItem}
      keyExtractor={item => item.id.toString()}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  reviewRow: {
    gap: RF(15),
    marginTop: RF(25),
  },
  avatarContainer: {
    height: RF(50),
    width: RF(50),
    padding: RF(3),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
  },
  avatarImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  reviewContent: {
    gap: RF(4),
  },
  nameText: {
    fontFamily: 'Raleway-Bold',
  },
  commentText: {
    maxWidth: RF(240),
  },
});

export default ReviewList;
