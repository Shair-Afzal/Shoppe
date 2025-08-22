import { StyleSheet, Text, View,FlatList,Image, Dimensions,TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';
 const { width, height } = Dimensions.get("window");
 const aspectRatio = height / width;
 const isTablet = aspectRatio < 1.6;
    
 const CategoriesList = ({ item,press }) => {
  const navigation=useNavigation()
  
  
  return(
    <TouchableOpacity style={styles.categoryItem}
    onPress={()=>navigation.navigate("Shop")}
    >
       <FlatList
       data={item.items}
       numColumns={2}
       renderItem={({item:subitem,i})=>(
        <Image key={i}source={subitem.image} style={styles.categoryImage} />
       )}
       />
        
      
      <View style={styles.categoryCount}>
      <Text style={styles.categoryName}>{item.name}</Text>
       <View style={{backgroundColor:"rgba(223, 233, 255, 1)",paddingTop:RF(0.5),paddingHorizontal:RF(6),borderRadius:RF(10)}}>
        <Text style={styles.categoryCountText}>{item.count}</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
   };

export default CategoriesList;

const styles = StyleSheet.create({
     categoriesList: {
    backgroundColor:colors.DarkWhite,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: RF(10),
    backgroundColor:colors.DarkWhite,
    paddingHorizontal:2,
    paddingTop:RF(2)

  },
  categoryItem: {
    padding:RF(2),
    // paddingBottom:RF(5),
    backgroundColor:colors.DarkWhite,
    elevation:5,
    borderRadius:RF(10),
    paddingVertical:RF(3)
    // margin:9
  },
  categoryImage: {
    width:isTablet?RF(95):RF(74),
    height:isTablet? RF(95):RF(70),
    borderRadius: RF(5),
    margin:RF(2),
    resizeMode:"cover",
  },
  categoryName: {
    fontSize: RF(14),
    fontWeight: '600',
    color: '#000000',
  },
  categoryCount: {
    ...GST.ROW,
    justifyContent:"space-between",
    paddingHorizontal:RF(4)
  },
  categoryCountText: {
    fontSize: RF(12),
    color:colors.darkblack,
  }, 
})