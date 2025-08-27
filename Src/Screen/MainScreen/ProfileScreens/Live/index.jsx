import { View, Text,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../../../Constant'
import Liveicon from "../../../../assets/SVG/Liveicon.svg"
import ForwardIcon from "../../../../assets/SVG/ForwardIcon.svg"
import styles from './style'
import { useSafeAreaInsets } from 'react-native-safe-area-context'


const Live = ({navigation}) => {
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:insert.top}}>
        <View style={styles.imgcontainer}>
        <Image source={require("../../../../assets/Images/liveimg.png")}
         style={styles.img}
        />
        </View>
    <View style={styles.bottomconatiner}>
        <View style={styles.innercontainer}>
        <View style={styles.txticoncontainer}>
        <Liveicon height={RF(25)} width={RF(25)}/>
        <Text style={GST.smallesttxt}>2930</Text>
        </View>
        <View style={styles.livecontainer}>
            <View style={styles.circleconatiner}>

            </View>
         <Text style={{...GST.smallesttxt,color:colors.DarkWhite}}>liVE</Text>
        </View>
        <TouchableOpacity
         onPress={()=>navigation.navigate("Story")}
        >
        <ForwardIcon height={RF(25)} width={RF(25)}/>
        </TouchableOpacity>
    </View>
    <TouchableOpacity style={{...GST.CENTER,padding:RF(12),backgroundColor:colors.blue,borderRadius:RF(10),paddingHorizontal:RF(40)}}
     onPress={()=>navigation.navigate("Shop")}
    >
        <Text style={{...GST.smallesttxt,color:colors.DarkWhite}}>Shop</Text>
    </TouchableOpacity>
    </View>
    </View>
  )
}

export default Live