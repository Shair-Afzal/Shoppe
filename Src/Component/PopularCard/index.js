import { StyleSheet, Text, View,FlatList,Image} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Blueheart from '../../assets/SVG/Blueheart.svg'

const PopularCard = ({data}) => { 
    const renderHotPopularItem = ({ item }) => (
    <View style={styles.hotItemContainer}>
      <Image source={{ uri: item.uri }} style={styles.hotItemImage} />
      <View style={GST.CENTERCONTAINER}>
      <View style={GST.ROW}>
      <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>
        {item.likes}
      </Text>
      <Blueheart/>
      </View>
      <Text style={GST.subdescription}>{item.tag}</Text>
      </View>
    </View>
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
  )
}

export default PopularCard

const styles = StyleSheet.create({
      hotPopularList: {
    // paddingHorizontal: RF(16),
    gap:RF(3),
  },
  hotItemContainer: {
    width: RF(100),
   backgroundColor:colors.DarkWhite,
   padding:RF(5),
   borderRadius:RF(10),
   margin:RF(3),
   elevation:5,
  
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
})