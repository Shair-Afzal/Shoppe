import { StyleSheet, Text, View,Modal, Dimensions} from 'react-native'
import React from 'react'
import GST, { colors, RF } from '../../Constant'
import SectionHeader from '../SectionHeader'
import NewItem from '../NewItem';
import { newItemsData } from '../../utils/Dummydata';
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;  
const Model = ({visible,onClose}) => {
 
  return (
     <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={onClose}
          statusBarTranslucent={true}
        >
            <View style={{...GST.MODALMAIN,paddingTop:RF(100)}}>
             <View style={{flex:1,paddingTop:RF(20),backgroundColor:"rgba(248, 250, 255, 1)"}}>
                <View style={{paddingHorizontal:RF(15)}}>
            <SectionHeader titile={"Image Search"} txt img onpress={onClose}/>
            <View style={{...GST.mid_row,marginTop:RF(10),gap:RF(10)}}>
            <Text style={GST.subdescription}>Shoes </Text>
            <Text style={{...GST.subdescription,color:colors.blue}}>Is this what you meant?</Text>
            </View>
            </View>


          
             <NewItem
          data={newItemsData}
          justfor
          numofcolumn={2}
          contentContainerStyle={styles.itemcontainer}
          rowstyle={styles.rowstyle}
          style={styles.itemstyle}
          imgstyle={styles.itemimgcon}
          img={styles.imgconitem}
        //   discount={true}
        />
       
             </View>
            </View>
            </Modal>
  )
}
const styles = StyleSheet.create({
  itemcontainer: {
      marginTop: RF(12),
      paddingBottom:RF(20),
      backgroundColor:colors.DarkWhite,
      paddingHorizontal:RF(15),
      
    },
    rowstyle: {
      justifyContent: 'space-between',
      paddingRight: RF(1),
    },
    itemstyle: {
      width: isTablet? RF(195) : RF(155),
      marginLeft: RF(2),
    },
    itemimgcon: {
      width: '100%',
    },
    imgconitem: {
      height: isTablet? RF(190) : RF(150),
      width: '100%',
      resizemode: 'cover',
    },
})
export default Model

