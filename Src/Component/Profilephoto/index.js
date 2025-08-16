import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant';
import ProfilePic from "../../assets/SVG/ProfilePic.svg";
const ProfilePhoto = ({style,title}) => {
  return (
    <View style={[styles.container,style]}>
    <View style={styles.escape}>
     <Image source={require("../../assets/Images/profilepic.png")}
     style={styles.img}
     />
     
    </View>
    <Text style={GST.subHeading}>{title}</Text>
    </View>
  )
}

export default ProfilePhoto;

const styles = StyleSheet.create({
    escape:{
        width:RF(110),
        borderRadius:RF(120),
        backgroundColor:colors.DarkWhite,
        elevation:5,
        ...GST.CENTER,
        padding:RF(10),
        
    },
    img:{
        width: RF(90),
         height: RF(90), 
         borderRadius: RF(100) 
    },
    container:{
        gap:RF(20),
        width:"100%",
        ...GST.CENTER,
        position:"absolute",
        bottom:0

    }
})