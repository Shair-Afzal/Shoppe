import { View, Text, FlatList, Touchable, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../../Constant';
import CustomHeader from '../../../../Component/CustomHeader';
import Progress1 from '../../../../assets/SVG/Progress1.svg';
import Copy from '../../../../assets/SVG/Copy.svg';
import { TrackData } from '../../../../utils/Dummydata';
import UncompleteProgress from "../../../../assets/SVG/UncompleteProgress.svg"
import Progress from "../../../../assets/SVG/Progress.svg"
import Check from  "../../../../assets/SVG/Check.svg"
import ReviewModel from '../../../../Component/ReviewModel';
import { useSafeAreaFrame, useSafeAreaInsets } from 'react-native-safe-area-context';
const TrackScreen = ({navigation}) => {
    const [step,setstep]=useState(1)
    const [model,setmodel]=useState(false)
    const sumbit=()=>{
        navigation.navigate("Chat")
        setmodel(false)
    }
   const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.MAIN,paddingTop:RF(15),paddingTop:insert.top}}>
        <ReviewModel unsuccessful visible={model} onclose={sumbit}/>
      <CustomHeader
        name={'To Recieve'}
        descrip={'My Orders'}
        icon
        recimg={true}
        source={require('../../../../assets/Images/Reviewimg.png')}
      />
      <TouchableOpacity
      onPress={()=>setstep(step+1)}
      >
        {step==1?
      <Progress1 height={RF(38)} width={'100%'} style={{ marginTop: RF(20) }} />:step==2?
      <UncompleteProgress height={RF(38)} width={'100%'} style={{ marginTop: RF(20) }}/>:<Progress height={RF(38)} width={'100%'} style={{ marginTop: RF(20) }}/>
      }
      
      </TouchableOpacity>
      <View
        style={{
          ...GST.CENTERCONTAINER,
          backgroundColor: colors.grey,
          borderRadius: RF(15),
          padding: RF(8),
          paddingHorizontal: RF(15),
          marginTop:RF(20),
        }}
      >
        <View>
          <Text
            style={{ ...GST.smallesttxt, fontSize: RF(12), fontWeight: '700' }}
          >
            Tracking Number
          </Text>
          <Text style={{ ...GST.smallesttxt, fontSize: RF(12) }}>
            LGS-i92927839300763731
          </Text>
        </View>
        <Copy height={RF(15)} width={RF(15)} />
      </View>
      <View style={{height:RF(300)}}>
      <FlatList data={TrackData} 
      contentContainerStyle={{marginTop:RF(10),}}
      renderItem={({item,index})=>(
        <View style={{marginTop:RF(15)}}>
          <View style={GST.CENTERCONTAINER}>
            <Text style={{...GST.subdescription,fontWeight:"700", color:step==1&&index>2?colors.lightblue:null}}>{item.titile}</Text>
            <View style={{padding:RF(5),backgroundColor:step==1&&index>2?colors.lightblue:colors.grey,borderRadius:RF(5)}}>
            <Text style={{...GST.smallesttxt}}>{item.date}</Text>
            </View>
            
          </View>
          <Text style={{...GST.smallesttxt,fontSize:RF(12),color:step==1&&index>2?colors.lightblue:null,marginTop:RF(5)}}>{item.txt}</Text>
            </View>
      )}
      />
      </View>
      {
        step>1&&(
            <>
        <Text style={{...GST.subdescription,fontWeight:"700",marginTop:RF(12)}}>Out for Delivery</Text>
        <Text style={{...GST.smallesttxt,fontSize:RF(12),marginTop:RF(5)}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</Text>
        {
            step<3&&
        
        <TouchableOpacity style={{...GST.CENTERCONTAINER,marginTop:RF(15)}}
        onPress={()=>setmodel(true)}
        >
            <Text style={{...GST.subdescription,color:colors.blue,fontSize:RF(17)}}>Attempt to deliver your parcel{"\n"}
was not successful</Text>
         <View style={{backgroundColor:"#F63C3C",padding:RF(5),borderRadius:RF(10)}}>
        <Text style={{...GST.smallesttxt,color:colors.DarkWhite}}>April,19 12:50</Text>
         </View>
        </TouchableOpacity>
}
        </>
        )
      }
      {
        step==3&&
        <>
        <View style={{...GST.ROW,gap:RF(5),marginTop:RF(12)}}>
        <Text style={{...GST.subdescription,fontWeight:"700",}}>Delivered</Text>
        <Check height={RF(20)} width={RF(20)}/>
        </View>
        <Text style={{...GST.smallesttxt,fontSize:RF(12),marginTop:RF(5)}}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore.</Text>
        </>
      }

    </View>

  );
};

export default TrackScreen;
