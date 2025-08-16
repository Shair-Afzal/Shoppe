import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import CustomButton from '../Custombutton'
import Arrowbtn from '../../assets/SVG/Arrowbtn.svg'
import GST, { RF } from '../../Constant'

const BotttomButtons = ({onPress,arrowpress,txt,btnTitle,containerStyle,btnStyle,arrowbtn}) => {
  return (
     <View style={[styles.btntxtcontainer,containerStyle]}>
     <CustomButton btnTitle={btnTitle} onPress={onPress} style={btnStyle}/>
     <View style={styles.rowcontainer}>
        {txt&&
      <Text style={GST.subdescription}>{txt}</Text>
        }
      <TouchableOpacity onPress={arrowpress} >
       {arrowbtn ?<Arrowbtn height={RF(30)} width={RF(30)}/> : <Text style={{...GST.subdescription,textAlign:"center"}}>Cancel</Text>}
      </TouchableOpacity>
     </View>
       </View>
  )
}

export default BotttomButtons

const styles = StyleSheet.create({
     btntxtcontainer:{
    width:"100%",
    position:"absolute",
    bottom:RF(25),
    gap:RF(10)
  },
  rowcontainer:{
    ...GST.ROW,
    ...GST.CENTER,
    gap:10,
    
  }
})