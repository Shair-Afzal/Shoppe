import { StyleSheet, Text, View,Image,FlatList,TouchableOpacity, Dimensions} from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import GST, { colors, RF } from '../../Constant'
import { useNavigation } from '@react-navigation/native'
const { width, height } = Dimensions.get("window");
 const aspectRatio = height / width;
 const isTablet = aspectRatio < 1.6;

const FlashCard = ({data,onPress}) => {
  const navigation=useNavigation()
  const handlepress=()=>{
    if(!onPress){
    navigation.navigate('FlashSales')
    }else{
    onPress()
    }
  }
  
  return (
    <View style={styles.flashSaleGrid}
    
  
    >
          <FlatList
          data={data}
          numColumns={3}
          contentContainerStyle={{justifyContent:"space-between"}}
          columnWrapperStyle={{justifyContent:"space-between",paddingHorizontal:RF(2)}}
          renderItem={({item,i})=>{
            return(
                 <TouchableOpacity
              key={item.id}
              style={[
                styles.flashItemContainer,
                
              ]}
              onPress={handlepress}
               activeOpacity={0.9}
            >
              <Image source={item.img} style={styles.flashItemImage} />
              <LinearGradient
              colors={['rgba(255, 87, 144, 1)', 'rgba(248, 17, 64, 1)']}
              style={styles.discountTag}
              >
                <Text style={styles.discountText}>{item.discount}</Text>
              </LinearGradient>
            </TouchableOpacity>
            
        
            )

          }}
          />
           
      </View>
  )
}

export default FlashCard

const styles = StyleSheet.create({
    flashSaleGrid: {
    marginBottom:RF(5)
  },
  flashItemContainer: {
    width:"32%",
    padding:RF(4),
    marginBottom: RF(2),
    position: 'relative',
    elevation:5,
    backgroundColor:colors.DarkWhite,
    marginTop:RF(5),
    borderRadius:RF(10)
  },
  flashItemImage: {
    width: "100%",
    height: isTablet?RF(110):RF(95),
    borderRadius: RF(8),
    backgroundColor: '#FFC0CB',
  },
  discountTag: {
    position: 'absolute',
    top:RF(4),
    right: RF(4),
    // backgroundColor: '#DC3545',
    borderRadius: RF(4),
    paddingHorizontal: RF(5),
    paddingVertical: RF(2),
  },
  discountText: {
    fontSize: RF(12),
    color: '#FFFFFF',
    fontWeight: '600',
  },
})