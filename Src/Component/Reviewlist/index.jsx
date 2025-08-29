import React, { useState } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import StarRating from 'react-native-star-rating-widget'; // Make sure to import your StarRating component
import GST, { colors, RF } from '../../Constant';

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
 const dummyFunction = () => {
    // This function does nothing - makes the rating read-only
  };

  // Render each review item
  const renderReviewItem = ({ item }) => (
    
    <View style={{ ...GST.ROW, gap: RF(15),marginTop:RF(25)}}>
      <View style={{height:RF(50),width:RF(50),padding:RF(3),backgroundColor:colors.DarkWhite,elevation:5,borderRadius:RF(100)}}>
      <Image
        source={item.image}
        style={{ height:"100%",width:"100%",resizeMode:"cover" }}
      />
      </View>
      <View style={{ gap: RF(4),}}>
        <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
          {item.name}
        </Text>
        <StarRating rating={item.rating} starSize={20} onChange={dummyFunction}/>
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