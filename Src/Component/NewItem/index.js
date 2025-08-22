import { StyleSheet, Text, View,FlatList,Image, Touchable, TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';

const NewItem = ({data,style,justfor,numofcolumn,contentContainerStyle,imgstyle,rowstyle,img}) => {
  const navigation=useNavigation()
   const renderNewItem = ({ item}) => (
    <TouchableOpacity style={[styles.newItemContainer,style]}
    onPress={()=>navigation.navigate('Details')}
    >
     <View style={[styles.imgcontainer,imgstyle]}>
      <Image source={{ uri: item.uri }} style={[styles.newItemImage,img]} />
      </View>
      <Text style={{...GST.smallesttxt,fontSize:RF(12)}}>{item.desc}</Text>
      <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>{item.price}</Text>
    </TouchableOpacity>
  );
  return (
    <FlatList
              data={data}
              renderItem={renderNewItem}
              keyExtractor={item => item.id}
              horizontal={justfor?false:true}
              numColumns={numofcolumn}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={[styles.containerstyle,contentContainerStyle]}
              columnWrapperStyle={rowstyle}
            />
  )
}

export default NewItem

const styles = StyleSheet.create({
      newItemImage: {
    width:"100%",
    height: RF(120),
    borderRadius: RF(8),
    resizeMode:"cover"
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
     gap:RF(2),
     marginTop:RF(5),
   
  },
  containerstyle:{
    gap:RF(10)
  },
  imgcontainer:{
    backgroundColor:colors.DarkWhite,
    elevation:5,
    borderRadius:RF(10),
    width:RF(130),
    ...GST.CENTER,padding:5
  }
})