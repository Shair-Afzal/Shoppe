import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image} from 'react-native'
import React from 'react'
import GST, { RF } from '../../Constant'
import Video from '../../assets/SVG/Video.svg'



const StoriesCard = ({data}) => {
  return (
    <FlatList
    data={data}
    horizontal
    renderItem={({item,i})=>(
     <TouchableOpacity style={[styles.storyCard,]}>
          
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
    
    overflow: "hidden",
    position:"relative",
    marginTop:RF(8),
    // backgroundColor:"red",
    // paddingLeft:RF(15),
    marginLeft:RF(5),
    borderRadius:RF(10),
  },
  img:{
   width: RF(110),
    height: RF(165),
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