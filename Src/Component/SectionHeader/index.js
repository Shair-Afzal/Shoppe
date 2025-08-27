import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import Button from "../../assets/SVG/Button.svg"
import Clock from "../../assets/SVG/Clock.svg"
import Close from "../../assets/SVG/Close.svg"
import  Buttonicon from "../../assets/SVG/Buttonicon.svg"

const  SectionHeader = ({titile,clock,txt,img,txtstyle,onpress,btn,select}) => {
  return (
     <View style={styles.sectionHeader}>
      <View style={{...GST.mid_row,gap:RF(5)}}>
          <Text style={[styles.sectionTitle,txtstyle]}>{titile}</Text>
          {
            btn&&(
              <View style={{...GST.ROW,gap:RF(2)}}>
            <View style={{...GST.CENTER,padding:RF(4),backgroundColor:colors.darkgrey,width:RF(35),borderRadius:RF(5)}}>
              <Text style={GST.smallesttxt}>Pink</Text>
            </View>
            <View style={{...GST.CENTER,padding:RF(4),backgroundColor:colors.darkgrey,width:RF(35),borderRadius:RF(5)}}>
              <Text style={GST.smallesttxt}>M</Text>
            </View>
          </View>
            )
          }
          </View>
          {!clock?
          <TouchableOpacity style={{...GST.mid_row,gap:RF(5)}} onPress={onpress}>
               {!txt?
            <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>See All </Text>
            :null
               }{
                !img?
            <Button height={RF(30)}  width={RF(30)}/>:!select?<Close height={RF(15)} width={RF(15)}/>:<Buttonicon/>
               }
          </TouchableOpacity>:
          <View style={{...GST.mid_row,gap:RF(3)}}>
          <Clock height={RF(20)} width={RF(20)}/>
          <View style={styles.box}>
         <Text style={GST.smallesttxt}>00</Text>
          </View>
          <View style={styles.box}>
         <Text style={GST.smallesttxt}>36</Text>
          </View>
          <View style={styles.box}>
         <Text style={GST.smallesttxt}>57</Text>
          </View>
          </View>
}
        </View>
  )
}

export default SectionHeader

const styles = StyleSheet.create({
      sectionHeader: {
 ...GST.CENTERCONTAINER,
    marginTop: RF(13),
    marginBottom: RF(12),
  },
  sectionTitle: {
    fontSize: RF(20),
    color:colors.darkblack,
    fontFamily:"Raleway-Bold"
  },
  seeAll: {
    fontSize: RF(14),
    color: '#4C6EF5',
    fontWeight: '600',
  },
  box:{
    ...GST.CENTER,
    padding:RF(5),
    borderRadius:RF(5),
    backgroundColor:colors.lightpink,
    margin:1
  }
})