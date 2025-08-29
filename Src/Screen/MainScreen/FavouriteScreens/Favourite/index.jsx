import { View, Text } from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../../../Constant'
import SectionHeader from '../../../../Component/SectionHeader'
import TopProduct from '../../../../Component/TopProduct'
import { hotPopularData, topProductsData } from '../../../../utils/Dummydata'
import Empty from "../../../../assets/SVG/Empty.svg"
import PopularCard from '../../../../Component/PopularCard'
import styles from './style'
import CartItem from '../../../../Component/Cartitem'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const Favourite = ({navigation}) => {
  const insert=useSafeAreaInsets()
  return (
    <View style={{...GST.FLEX,paddingTop:insert.top}}>
      <View style={styles.container}>
        <Text style={GST.subHeading}>Wishlist</Text>
        <SectionHeader titile={"Recently viewed"} txt onpress={()=>navigation.navigate("RecenltyView")}/>
        <View style={styles.listconatiner}>
        <TopProduct data={topProductsData} onPress={()=>navigation.navigate("Home",{
          screen:"Shop"
        })}/>
        </View>
        <View style={styles.elipseconatiner}>
        <View style={styles.elipse}>
         <Empty height={RF(70) } width={RF(70)}/>
       </View>
       </View>
      
        {/* <CartItem/> */}
       
       
       
      </View>
      <View style={styles.bottomcontainer}>
        <View style={styles.sectioncontainer}>
        <SectionHeader titile={"Most Popular"} onpress={()=>navigation.navigate("Home",{
          screen:"Shop"
        })}/>
        </View>
       <PopularCard data={hotPopularData}/>
       </View>
    </View>
  )
}

export default Favourite