import { StyleSheet } from "react-native";
import GST, { RF } from "../../../Constant";


const styles = StyleSheet.create({
    curveicon:{
        position:"absolute",
        top:RF(-30),
        right:RF(-30),
        zIndex:22
    },
    cancelbtn:{
      alignSelf:"center",
      marginTop:RF(20),
    },
    containerWrapper:{
        // ...GST.MAIN,
        paddingTop:RF(45),
        width:"100%",
        paddingHorizontal:RF(15)
    },
    txtcontainer:{
       ...GST.ROW,
       alignItems:"center",
       gap:5,
       marginTop:RF(5) 
    },
    bgcontainer:{
      position:"absolute", 
      top:0,
       left:0
    },
    innerContainer:{
      position:"absolute",
      bottom:15,width:"100%"
    }
  })
  export default styles;