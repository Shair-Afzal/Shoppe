import { View, Text,FlatList,Image} from 'react-native'
import React from 'react'
import GST, { RF } from '../../../../Constant'
import StarRating from 'react-native-star-rating-widget'
import ReviewList from '../../../../Component/Reviewlist'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ReviewScreen = () => {
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
        <Text style={{...GST.subHeading}}>Reviews</Text>
     
        <ReviewList/>
    </View>
  )
}

export default ReviewScreen