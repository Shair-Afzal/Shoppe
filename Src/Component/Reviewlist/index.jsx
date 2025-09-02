import React, { useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import StarRating from 'react-native-star-rating-widget';
import GST, { colors, RF } from '../../Constant';

const ReviewList = () => {
  const reviewData = [
    {
      id: 1,
      name: 'Veronika',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      image: require('../../assets/Images/Reviewimg.png'),
    },
    {
      id: 2,
      name: 'John Doe',
      rating: 5,
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      image: require('../../assets/Images/Reviewimg.png'),
    },
    {
      id: 3,
      name: 'Sarah Smith',
      rating: 3,
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      image: require('../../assets/Images/Reviewimg.png'),
    },
    {
      id: 4,
      name: 'Mike Johnson',
      rating: 4,
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      image: require('../../assets/Images/Reviewimg.png'),
    },
    {
      id: 5,
      name: 'Emily Wilson',
      rating: 2,
      comment:
        'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum',
      image: require('../../assets/Images/Reviewimg.png'),
    },
  ];

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
