import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../Constant";
const styles = StyleSheet.create({
    bg:{
        position: "absolute",
         top: 0, 
         right: 0 
    },
    txt:{
         ...GST.subdescription,
          textAlign: "center" 
    },
    btncontainer:{
         alignSelf: "center", 
         marginTop: RF(20),
          gap: RF(10)
    },
    btn:{
      padding: 8,
       backgroundColor: colors.lightblue,
        width: RF(140),
         ...GST.CENTER, 
         borderRadius: RF(20)
    },
    escape:{
        left: RF(25),
         borderWidth: 2, 
         borderColor: colors.DarkWhite, 
         borderRadius: RF(20), 
         width: RF(20), 
         height: RF(20)
    },
    smstxt:{
        ...GST.subdescription, 
        color: colors.blue
    },
    emailtxt:{
         ...GST.subdescription,
          color: colors.Black
    },
    otpwarapper:{
        width:"30%",
        alignSelf:"center"
    },
    otpcontainer:{
        height:RF(20),
        width:RF(20),
        marginTop:RF(10),
        borderRadius:RF(90),
        backgroundColor:colors.grey,
        ...GST.CENTER
    },
     custombtn:{
    width:"70%",
    backgroundColor:colors.pink,
    alignSelf:"center"
  },
  errortxt:{
    ...GST.subdescription,
    color:"red",
    alignSelf:"center",
    marginTop:RF(5)
  }
})
export default styles;