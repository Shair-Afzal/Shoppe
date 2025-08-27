import { View, Text, Touchable, TouchableOpacity, FlatList, TouchableHighlight } from 'react-native'
import React, { useState } from 'react'
import GST, { colors, RF } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import Mastercard from "../../../../../assets/SVG/Mastercard.svg";
import Settings from "../../../../../assets/SVG/Settings.svg"
import CustomButton from '../../../../../Component/Custombutton';
import { transactionData } from '../../../../../utils/Dummydata';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ShippingAddressModal from '../../../../../Component/ShippingModel';

const PaymentMethod = () => {
    const [model,setmodel]=useState(false)
    const insert=useSafeAreaInsets();
  return (
    <View style={{...GST.FLEX,paddingLeft:RF(15),paddingTop:RF(15),paddingTop:insert.top}}>
         <ShippingAddressModal add visible={model} onclose={()=>setmodel(false)}/>
        <CustomHeader
        name={'Settings'}
        descrip={"Payment Methods"}
        />
       
        <View style={{...GST.ROW,gap:RF(10),marginTop:RF(10)}}>
        <View style={{backgroundColor:colors.lightblue,width:"80%",padding:RF(10),paddingBottom:RF(20),height:RF(150),justifyContent:"space-between",borderRadius:RF(10)}}>
            <View style={GST.CENTERCONTAINER}>
                <Mastercard height={RF(30)} width={RF(30)}/>
                <TouchableOpacity>
                    <Settings height={RF(30)} width={RF(30)}/>
                </TouchableOpacity>
            </View>
            <View style={{gap:RF(13)}}>
            <View style={GST.CENTERCONTAINER}>
            <Text style={GST.subdescription}>****</Text>
             <Text style={GST.subdescription}>****</Text>
              <Text style={GST.subdescription}>****</Text>
              <Text style={GST.subdescription}>1593</Text>
              </View>
              <View style={GST.CENTERCONTAINER}>
                <Text style={GST.subdescription}>Amanda Morgan</Text>
                <Text style={GST.subdescription}>12/22</Text>
              </View>
              </View>
        </View>
        <TouchableOpacity style={{...GST.CENTER,height:RF(150),backgroundColor:colors.blue,width:RF(50),borderRadius:RF(10)}}
        onPress={()=>setmodel(true)}
        >
           <Text style={{...GST.description,color:colors.DarkWhite}}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={{paddingRight:RF(15)}}>
      <FlatList
      data={transactionData}
      renderItem={({item})=>(
        <View style={{...GST.CENTERCONTAINER,padding:RF(8),backgroundColor:colors.lightblue,borderRadius:RF(10),marginTop:RF(10)}}>
            <View style={{...GST.mid_row,gap:RF(15)}}>
          {item.icon}
          <View>
            <Text style={{...GST.smallesttxt,fontSize:RF(12)}}>{item.date}</Text>
            <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>Order #92287157</Text>
            </View>
            </View>
             <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>{item.amount}</Text>
        </View>
       
      )}
      />
      </View>
    </View>
  )
}

export default PaymentMethod;
