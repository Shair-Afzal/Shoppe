import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../Constant";
const styles=StyleSheet.create({
  announcementCard: {
    backgroundColor:colors.grey,
    borderRadius: RF(10),
    padding: RF(16),
    marginTop:RF(10)
  },
elipsecircle:{
    height:RF(25),
    width:RF(25),
    borderRadius:RF(100),
    ...GST.CENTER,
    backgroundColor:"#E5EBFC"
},
txtcontainer:{
    ...GST.ROW,
    alignItems:"center",
    gap:RF(5)
},
titletxt:{
    ...GST.subdescription,
    fontFamily:"Raleway-Bold"
},
bottomcontainer:{
    position:"absolute",
    bottom:0,
    // paddingLeft:RF(15)
  },
  sectioncontainer:{
    paddingHorizontal:RF(15)
  },
  elipseconatiner: {
    
    ...GST.CENTER,
    paddingVertical:RF(50)
  },
  elipse: {
    ...GST.CENTER,
    backgroundColor: colors.DarkWhite,
    elevation: RF(5),
    borderRadius: RF(100),
    height: RF(120),
    width: RF(120),
  },
})
export default styles