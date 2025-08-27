import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import { useNavigation } from '@react-navigation/native'
const RightComponent= ({name,descrip,profilepic,source,recimg,btn,txt}) => {
  const navigation=useNavigation()
  return (
    <View>
      {
            profilepic&&
            <View style={{...GST.mid_row,gap:RF(10)}}>
             <TouchableOpacity style={styles.imgcontainer}
             onPress={()=>navigation.navigate("Settingprofile")}
             >
            <Image source={source} style={styles.img}/>
            </TouchableOpacity>
            {!btn?
            <TouchableOpacity style={styles.btn}
            onPress={()=>navigation.navigate('Activity')}
            >
              <Text style={{...GST.subdescription,color:colors.DarkWhite}}>My Activity</Text>
            </TouchableOpacity>:
            <Text style={GST.description}>{txt}</Text>
}
            </View>
        }
        <View style={{...GST.ROW,gap:RF(8)}}>
        {recimg&&
         <View style={styles.imgcontainer}>
            <Image source={source} style={styles.img}/>
            </View>
}
        <View>
     {

        name&&
        
          
        <Text style={recimg?GST.description:GST.subHeading}>{name}</Text>
      
     }
     {
            descrip&&
            <Text style={recimg?GST.smallesttxt:GST.subdescription}>{descrip}</Text>
        }
        </View>
        </View>
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