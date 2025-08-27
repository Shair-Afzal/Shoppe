import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Categories from '../../CategoriesScreen/categories';
import CategoriesList from '../../../../Component/CategoriesList';
import { categoriesData } from '../../../../utils/Dummydata';
import CustomButton from '../../../../Component/Custombutton';
import { Touchable } from 'react-native';
import ReviewModel from '../../../../Component/ReviewModel';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ReciveScreen = ({navigation}) => {
    const [modal,setmodal]=useState(false)
    const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
      <CustomHeader
        name={'To Recieve'}
        descrip={'My Orders'}
        icon
        recimg={true}
        source={require('../../../../assets/Images/Reviewimg.png')}
      />
      <ReviewModel visible={modal} onclose={()=>setmodal(false)}/>
      <FlatList
      data={categoriesData}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{paddingBottom:RF(20)}}
      renderItem={({ item,index }) => (
    <View style={{...GST.CENTERCONTAINER,marginTop:RF(10)}}>
    <View style={{...GST.ROW,gap:RF(10)}}>
      <CategoriesList item={item} catimg={{height:RF(45),width:RF(45),resizemode:"cover"}} style={{padding:RF(5)}} txt num/>
        <View style={{justifyContent:"space-between"}}>
            <View>
                <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold",fontSize:RF(14)}}>Order #92287157</Text>
                <Text style={GST.smallesttxt}>Standard Delivery</Text>
                </View>
                <Text style={{...GST.subdescription,fontFamily:"Raleway-Bold"}}>Shipped</Text>
        </View>
      </View>
      <View style={{justifyContent:"space-between",height:RF(100),}}>
        <View style={{padding:RF(6),backgroundColor:colors.lightblue,borderRadius:RF(5),width:"60%",alignSelf:"flex-end"}}>
        <Text style={GST.smallesttxt}>3 items</Text>
        </View>
         <TouchableOpacity style={{backgroundColor:index>2?colors.DarkWhite:colors.blue,padding:RF(7),paddingHorizontal:RF(27),borderRadius:RF(10),borderWidth:index>2?1:0,borderColor:colors.blue}}
         onPress={()=>{
            if(index>2){
                setmodal(true)
            }else {
                navigation.navigate("Track")
            }
         }

         }
         >
           <Text style={{...GST.smallesttxt,color:index>2?colors.blue:colors.DarkWhite}}>{index>2?"Review":"Track"}</Text>
            </TouchableOpacity>
        </View>
       
      </View>
    )}
      />

    </View>
  );
};

export default ReciveScreen;
