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
       {/* <View style={{ ...GST.ROW, gap: RF(15) }}>
          <Image
            source={require('../../../../assets/Images/Reviewimg.png')}
            style={{ height: RF(40), width: RF(40) }}
          />
          <View style={{ gap: RF(5) }}>
            <Text style={{ ...GST.subdescription, fontFamily: 'Raleway-Bold' }}>
              Veronika
            </Text>
            <StarRating rating={4} starSize={20} />
            <Text style={GST.smallesttxt}>
              Lorem ipsum dolor sit amet, consetetur sadipscing elitr,{'\n'} sed
              diam nonumy eirmod tempor invidunt ut labore et dolore{'\n'} magna
              aliquyam erat, sed ...
            </Text>
          </View>
        </View> */}
        <ReviewList/>
    </View>
  )
}

export default ReviewScreen