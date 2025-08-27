import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import CustomButton from '../Custombutton'
import { useNavigation } from '@react-navigation/native'

const PaymentFooter = ({title,price,btnstyle,txtstyle}) => {
  const navigation=useNavigation()
  return (
    <View style={{backgroundColor:colors.grey,padding:RF(10),paddingLeft:RF(15)}}>
        <View style={GST.CENTERCONTAINER}>
       <Text style={styles.totattxt}>Totat<Text style={GST.description}>$34,00</Text></Text>
          {/* <CustomButton btnTitle={title} style={[styles.btn,btnstyle]} txtstyle={colors.darkblack}/> */}
          <TouchableOpacity style={[styles.btn,btnstyle]}
          onPress={()=>navigation.navigate("Payment")}
          >
            <Text style={[GST.subdescription,txtstyle]}>{title}</Text>
          </TouchableOpacity>
       </View>
    </View>
  )
}

export default PaymentFooter

const styles = StyleSheet.create({
    totattxt:{
        fontSize:RF(20),
        fontFamily:"Raleway-Bold",
        color:colors.darkblack
    },
    btn:{
        height:RF(40),
        backgroundColor:colors.DarkWhite,
        width:RF(128),
        ...GST.CENTER,
        borderRadius:RF(10),
        elevation:2
    }
})