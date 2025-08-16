import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../Constant";

const styles = StyleSheet.create({
  otpcontainer: {
    height:RF(45),
           width:RF(45),
           borderRadius:10,
           backgroundColor:colors.grey,
           borderWidth:0,
           marginTop:RF(10)
  },
  otpwarapper:{
    width:"60%",
    marginTop:RF(10)
  },
  container:{
    ...GST.CENTER,
    paddingTop:RF(25),
  },
  svgcontainer:{
    position: "absolute",
    top: 0,
    left: 0,
  },
  profilecontainer:{
    height:RF(300)
  },
  rowcontainer:{
    ...GST.ROW,
    ...GST.CENTER,
    gap:RF(10),
    position:"absolute",
    bottom:RF(20),
    alignSelf:"center"

  }
});

export default styles;