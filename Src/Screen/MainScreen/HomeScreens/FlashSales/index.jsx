import { View, Text, StatusBar, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native'
import React from 'react'
import GST, { RF } from '../../../../Constant'
import RightBubble from '../../../../Component/RightBubblecomponent'
import CustomHeader from '../../../../Component/CustomHeader'
import FilterBar from '../../../../Component/Filterbar'
import Filter from "../../../../assets/SVG/Filter.svg"
import NewItem from '../../../../Component/NewItem'
import { hotPopularData, newItemsData } from '../../../../utils/Dummydata'
import SectionHeader from '../../../../Component/SectionHeader'
import PopularCard from '../../../../Component/PopularCard'

const  FlashSales= ({navigation}) => {
  const { width, height } = Dimensions.get("window");
   const aspectRatio = height / width;
   const isTablet = aspectRatio < 1.6;
  return (
    <View style={GST.FLEX}>
      <StatusBar  translucent backgroundColor="transparent" 
        barStyle="light-content" />
      <RightBubble style={{position:"absolute",top:0,right:0,}}/>
      <ScrollView contentContainerStyle={{flexGrow:1,paddingHorizontal:RF(15),paddingTop:RF(40),paddingBottom:RF(20)}}
      showsVerticalScrollIndicator={false}
      >
      <CustomHeader 
      name={"Flash Sale"}
      descrip={"Choose Your Discount"}
      Time={true}
      />
     <FilterBar/>
     <TouchableOpacity style={{marginTop:RF(20)}}
     onPress={()=>navigation.navigate("Live")}
     >
     <Image source={require("../../../../assets/Images/Live.png")} style={{height:isTablet?RF(190):RF(160),width:"100%",resizeMode:"conatin"}}/>
      </TouchableOpacity>
      <View style={{...GST.CENTERCONTAINER,marginTop:RF(15)}}>
        <Text style={{...GST.description,fontFamily:"Raleway-Bold"}}>20% Discount</Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate("Filter")}
        >
          <Filter height={RF(25)} width={RF(25)}/>
        </TouchableOpacity>
      </View>
        <NewItem data={newItemsData} justfor numofcolumn={2} contentContainerStyle={{marginTop:RF(12)}} rowstyle={{justifyContent:"space-between",paddingRight:RF(1)}}style={{width:isTablet?RF(195):RF(155),marginLeft:RF(2),}} imgstyle={{width:"100%"}} img={{height:isTablet?RF(190):RF(150),width:"100%",resizemode:"cover"}}/>
        <SectionHeader titile={"Most Popular"}/>
        <PopularCard data={hotPopularData}/>
      </ScrollView>
    </View>
  )
}

export default FlashSales