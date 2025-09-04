import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';
import * as Ratings from 'react-native-ratings';


const RatingComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.container}>
      <Ratings.AirbnbRating />
      <Ratings.Rating
        type='star'
        ratingCount={5}
        imageSize={40}
        showRating
        style={styles.rating}
      />
    </View>inishRating={this.ratingCompleted}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // take full height
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: "red", // optional just for visibility
  },
  rating:{
    marginTop: 20 
  }
});

export default RatingComponent;
