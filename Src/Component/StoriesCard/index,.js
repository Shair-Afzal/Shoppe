import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import GST, { RF } from '../../Constant'
import Video from '../../assets/SVG/Video.svg'
import { useNavigation } from '@react-navigation/native'



const StoriesCard = ({data}) => {
  const navigation=useNavigation()
  return (
    <FlatList
    data={data}
    horizontal
    contentContainerStyle={{paddingLeft:RF(15)}}
    renderItem={({item,i})=>(
     <TouchableOpacity style={[styles.storyCard,]}
      activeOpacity={0.9}
     onPress={()=>navigation.navigate("Live")}
     >
          
            <Image 
              source={require("../../assets/Images/videoimg.png")} 
              style={styles.img} 
            />
            <View style={styles.overlay}>
    <Video height={RF(30)} width={RF(30)} />
  </View>
          
        </TouchableOpacity>
    )}
    />
  )
}

export default StoriesCard;

const styles = StyleSheet.create({
     storyCard: {
    // overflow: "hidden",
    position:"relative",
    marginTop:RF(8),
    // backgroundColor:"red",
    // paddingLeft:RF(15),
    // marginLeft:RF(5),
    borderRadius:RF(10),
  },
  img:{
   width: RF(90),
    height: RF(150),
    resizeMode:"cover",
  
  },
   overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center", // centers vertically
    alignItems: "center",     // centers horizontally
  },
})