import React from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating-widget'; // Make sure to import your StarRating component
import GST, { RF } from '../../Constant';

const ReviewList = () => {
  // Custom data array
  const reviewData = [
    {
      id: 1,
      name: "Veronika",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      image: require('../../assets/Images/Reviewimg.png')
    },
    {
      id: 2,
      name: "John Doe",
      rating: 5,
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      image: require('../../assets/Images/Reviewimg.png')
    },
    {
      id: 3,
      name: "Sarah Smith",
      rating: 3,
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      image: require('../../assets/Images/Reviewimg.png')
    },
    {
      id: 4,
      name: "Mike Johnson",
      rating: 4,
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      image: require('../../assets/Images/Reviewimg.png')
    },
    {
      id: 5,
      name: "Emily Wilson",
      rating: 2,
      comment: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum",
      image: require('../../assets/Images/Reviewimg.png')
    }
  ];

  // Render each review item
  const renderReviewItem = ({ item }) => (
    <View style={{ ...GST.ROW, gap: RF(15),marginTop:RF(25)}}>
      <Image
        source={item.image}
        style={{ height: RF(40), width: RF(40), }}
      />
      <View style={{ gap: RF(4),}}>
        <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
          {item.name}
        </Text>
        <StarRating rating={item.rating} starSize={20} />
        <Text style={{...GST.smallesttxt,maxWidth:RF(240)}}>
          {item.comment}
        </Text>
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

export default ReviewList;