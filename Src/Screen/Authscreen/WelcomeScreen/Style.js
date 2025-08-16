import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../Constant";

const styles = StyleSheet.create({
  container: {
    ...GST.MAIN,
    ...GST.CENTER
  },
  ScreenContentWrapper:{
    width:"100%",
    ...GST.CENTER,
    gap:RF(10),
    flex:1
  },
  text:{
    ...GST.description,
    textAlign:"center",
  },
  btntxtcontainer:{
    width:"100%",
    position:"absolute",
    bottom:RF(25),
    gap:RF(10)
  },
  rowcontainer:{
    ...GST.ROW,
    ...GST.CENTER,
    gap:10,
    
  },
 
})

  export default styles