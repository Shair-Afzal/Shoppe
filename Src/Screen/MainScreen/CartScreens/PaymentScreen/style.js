import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../Constant";
const styles=StyleSheet.create({
  announcementCard: {
    backgroundColor:colors.grey,
    borderRadius: RF(10),
    padding: RF(12),
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
    ...GST.description,
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
  deliverbottomcontainer:{
        ...GST.CENTERCONTAINER,
        // borderWidth:1,
        padding:RF(10),
        borderRadius:RF(10),
        // borderColor:colors.darkgrey
        backgroundColor:colors.darkgrey,
        marginTop:RF(10)
    },
    deliverdtxtconatiner:{
        ...GST.ROW,
        gap:RF(10)
    },
    daysconatiner:{
        backgroundColor:"#F5F8FF",
        padding:RF(3),
        borderRadius:RF(5),
        paddingHorizontal:RF(8)
    }
})
export default styles