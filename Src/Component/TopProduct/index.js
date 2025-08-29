import { StyleSheet, Text, View,FlatList,Image, Dimensions, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import GST, { colors, RF } from '../../Constant';
import Select from '../../assets/SVG/Select.svg'
const { width, height } = Dimensions.get("window");
 const aspectRatio = height / width;
 const isTablet = aspectRatio < 1.6;

  const TopProduct=({data,style,contentContainerStyle,txt,numColumns,stylerow,check,onPress})=>{
    const sumbit=(item)=>{
    setSetlect(item.id)
  }
    const [select, setSetlect]=useState(null)
     const renderTopProductItem = ({ item,i}) => (
    <TouchableOpacity style={[styles.imgconatiner,style]}
     activeOpacity={0.9}
    onPress={() => {
        sumbit(item);   
        if (onPress) {  
          onPress(item);
        }
      }}
    >
      
    <Image source={item.image} style={styles.topProductImage} />
     {check && select === item.id && (
      
    <Select height={RF(20)} width={RF(20)} style={{position:"absolute",top:0,right:0}}/>
     )
      }
    {txt&&
      <Text style={{...GST.smallesttxt,marginTop:RF(6),textAlign:"center"}}>{item.name}</Text>
    }
    </TouchableOpacity>
  );
    return (
<FlatList
          data={data}
          renderItem={renderTopProductItem}
          keyExtractor={item => item.id}
          numColumns={numColumns}
          horizontal={numColumns?false:true}
          columnWrapperStyle={stylerow}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={[styles.topProductsList,contentContainerStyle]}
        />
    )
  }
export default TopProduct

const styles = StyleSheet.create({
     topProductImage: {
    width: "100%",
    height: "100%",
    borderRadius: RF(100),
  },
  topProductsList:{
    gap:RF(10),
    backgroundColor:colors.DarkWhite
    
  },
  imgconatiner:{
    backgroundColor:colors.DarkWhite,
    padding:RF(4),
    elevation:5,
    borderRadius:RF(100),
    marginTop:RF(10),
    marginLeft:RF(2),
    marginBottom:RF(10),
     width:isTablet?RF(70): RF(55),
    height:isTablet?RF(70):RF(55),
    // backgroundColor:"red"
  }
})