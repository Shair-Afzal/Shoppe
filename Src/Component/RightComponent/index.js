import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
const RightComponent= ({name,descrip,profilepic,source}) => {
  return (
    <View>
     {
        name&&
        <Text style={GST.subHeading}>{name}</Text>
        
     }
     {
            descrip&&
            <Text style={GST.subdescription}>{descrip}</Text>
        }
        {
            profilepic&&
            <View style={{...GST.mid_row,gap:RF(10)}}>
             <View style={styles.imgcontainer}>
            <Image source={source} style={styles.img}/>
            </View>
            <TouchableOpacity style={styles.btn}>
              <Text style={{...GST.subdescription,color:colors.DarkWhite}}>My Activity</Text>
            </TouchableOpacity>
            </View>
        }
    </View>
  )
}

export default RightComponent

const styles = StyleSheet.create({
    imgcontainer:{
        height:RF(50),
        width:RF(50),
        backgroundColor:colors.DarkWhite,
        elevation:5,
        borderRadius:RF(100),
        ...GST.CENTER
    },
    img:{
        height:RF(44),
        width:RF(44),
        resizeMode:"cover",
        borderRadius:RF(100),
    },
    btn:{
        paddingHorizontal:RF(15),
        backgroundColor:colors.blue,
        borderRadius:RF(20),
        ...GST.CENTER,
        height:RF(40)
    }
})