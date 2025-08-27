import { View, Text } from 'react-native'
import React from 'react'
import GST, { RF } from '../../../../Constant'
import styles from './style'
import Buttonicon from '../../../../assets/SVG/Buttonicon.svg'
import PopularCard from '../../../../Component/PopularCard'
import SectionHeader from '../../../../Component/SectionHeader'
import { hotPopularData } from '../../../../utils/Dummydata'
import Logo from "../../../../assets/SVG/Logo.svg"
import PaymentFooter from '../../../../Component/PaymentFooter'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const Cart = () => {
   const insert=useSafeAreaInsets()
  return (
    <View style={GST.FLEX}>
      <View style={{...GST.MAIN,paddingTop:RF(10),paddingTop:insert.top}}>
        <View style={styles.txtcontainer}>
        <Text style={GST.subHeading}>Cart</Text>
        <View style={styles.elipsecircle}>
          <Text style={GST.subdescription}>0</Text>
        </View>
        </View>
       <View style={styles.announcementCard}>
            <Text style={styles.titletxt}>Shipping Address</Text>
            <View style={GST.CENTERCONTAINER}>
              <Text style={GST.smallesttxt}>
                26, Duong So 2, Thao Dien Ward, An Phu, District 2,{'\n'} Ho Chi Minh city
              </Text>

              <Buttonicon height={RF(30)} width={RF(30)} />
            </View>
          </View>
            <View style={styles.elipseconatiner}>
        <View style={styles.elipse}>
         <Logo height={RF(60) } width={RF(60)}/>
       </View>
       </View>
          </View>
          <View style={styles.bottomcontainer}>
        <View style={styles.sectioncontainer}>
        <SectionHeader titile={"Most Popular"}/>
        </View>
        <View style={{paddingLeft:RF(15)}}>
       <PopularCard data={hotPopularData} />
       </View>
       <PaymentFooter title={"Checkout"}/>
       </View>
    </View>
  )
}

export default Cart