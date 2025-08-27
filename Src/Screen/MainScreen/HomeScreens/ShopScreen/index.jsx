import { View, Text, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import GST, { RF } from '../../../../Constant'
import CustomHeader from '../../../../Component/CustomHeader'
import TopProduct from '../../../../Component/TopProduct'
import { newItemsData, topProductsData } from '../../../../utils/Dummydata'
import Filter from '../../../../assets/SVG/Filter.svg'
import NewItem from '../../../../Component/NewItem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const ShopeScreen = ({navigation}) => {
    const { width, height } = Dimensions.get("window");
       const aspectRatio = height / width;
       const isTablet = aspectRatio < 1.6;
       const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
        
        <CustomHeader name={"Shop"} input placholder={"search"}/>
        <View style={{marginTop:RF(10)}}>
        <TopProduct data={topProductsData} txt={true} numColumns={5} stylerow={{gap:RF(10)}} contentContainerStyle={{paddingVertical:RF(10)}}/>
        <View style={{...GST.CENTERCONTAINER,marginTop:RF(15)}}>
        <Text style={{...GST.description,fontFamily:"Raleway-Bold"}}>All Items</Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate('Filter')}
        >
          <Filter height={RF(25)} width={RF(25)}/>
        </TouchableOpacity>
      </View>
        </View>
                 <NewItem data={newItemsData} justfor numofcolumn={2} contentContainerStyle={{marginTop:RF(12),paddingBottom:RF(20)}} rowstyle={{justifyContent:"space-between",paddingRight:RF(1)}}style={{width:isTablet?RF(195):RF(155),marginLeft:RF(2),}} imgstyle={{width:"100%"}} img={{height:isTablet?RF(190):RF(150),width:"100%",resizemode:"cover"}}/>

    </View>
  )
}

export default ShopeScreen