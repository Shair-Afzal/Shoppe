import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../Constant";
const styles=StyleSheet.create({
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
        
        
    },
    img:{
        height:RF(70),
        width:RF(70),
        resizeMode:"cover"
    },
    txtconatiner:{
        ...GST.CENTER,
        width:RF(70),
        paddingVertical:RF(8),
        backgroundColor:colors.
        lightpink,borderRadius:RF(5)
    },
    euconatiner:{
         ...GST.CENTER,
        width:RF(50),
        paddingVertical:RF(8),
        backgroundColor:colors.lightblue,
        borderRadius:RF(5)
    },
    deliverbottomcontainer:{
        ...GST.CENTERCONTAINER,
        borderWidth:1,
        padding:RF(10),
        borderRadius:10,
        borderColor:colors.blue
    },
    deliverdtxtconatiner:{
        ...GST.ROW,
        gap:RF(10)
    },
    daysconatiner:{
        backgroundColor:colors.lightblue,
        padding:RF(3),
        borderRadius:RF(10),
        paddingHorizontal:RF(8)
    },
    
})
export default styles