import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../Constant";
const styles = StyleSheet.create({
    dot:{
        height:RF(10),
        width:RF(10),
        borderRadius:RF(100),
        backgroundColor:colors.lightblue
    },
    activeDot:{
      height:RF(10),
        width:RF(10),
        borderRadius:RF(100),
        backgroundColor:colors.blue,
        paddingHorizontal:RF(15),
        
        
    }
})
export default styles