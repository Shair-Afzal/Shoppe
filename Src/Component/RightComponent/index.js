import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import { useNavigation } from '@react-navigation/native'
import { wp,hp } from '../../Constant'
const RightComponent= ({name,descrip,profilepic,source,recimg,btn,txt}) => {
  const navigation=useNavigation()
  return (
    <View>
      {
            profilepic&&
            <View style={{...GST.mid_row,gap:"20%"}}>
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
         <TouchableOpacity style={styles.imgcontainer}
         onPress={()=>navigation.navigate("Settingprofile")}
         >
            <Image source={source} style={styles.img}/>
            </TouchableOpacity>
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
        height:wp(14),
        width:wp(14),
        backgroundColor:colors.DarkWhite,
        elevation:5,
        borderRadius:RF(100),
        ...GST.CENTER,
        padding:RF(3)
    },
    img:{
        height:"100%",
        width:"100%",
        resizeMode:"cover",
        borderRadius:RF(100),
    },
    btn:{
        padding:wp(3),
        backgroundColor:colors.blue,
        borderRadius:RF(20),
        ...GST.CENTER,
    }
})