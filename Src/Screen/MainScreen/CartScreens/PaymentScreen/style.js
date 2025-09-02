import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../Constant";

const styles=StyleSheet.create({
  announcementCard: {
    backgroundColor: colors.grey,
    borderRadius: RF(10),
    padding: RF(12),
    marginTop: RF(10)
  },
  elipsecircle:{
    height: RF(25),
    width: RF(25),
    borderRadius: RF(100),
    ...GST.CENTER,
    backgroundColor: "#E5EBFC"
  },
  txtcontainer:{
    ...GST.ROW,
    alignItems:"center",
    gap: RF(5)
  },
  titletxt:{
    ...GST.description,
    fontFamily: "Raleway-Bold"
  },
  sectioncontainer:{
    paddingHorizontal: RF(15)
  },
  elipseconatiner:{
    ...GST.CENTER,
    paddingVertical: RF(50)
  },
  elipse:{
    ...GST.CENTER,
    backgroundColor: colors.DarkWhite,
    elevation: RF(5),
    borderRadius: RF(100),
    height: RF(120),
    width: RF(120),
  },
  deliverbottomcontainer:{
    ...GST.CENTERCONTAINER,
    padding: RF(10),
    borderRadius: RF(10),
    backgroundColor: colors.darkgrey,
    marginTop: RF(10)
  },
  deliverdtxtconatiner:{
    ...GST.ROW,
    gap: RF(10)
  },
  daysconatiner:{
    backgroundColor: "#F5F8FF",
    padding: RF(3),
    borderRadius: RF(5),
    paddingHorizontal: RF(8)
  },
  renderItemContainer:{
    ...GST.CENTERCONTAINER,
    marginTop: RF(10),
    paddingHorizontal: RF(15)
  },
  renderItemRow:{
    ...GST.mid_row,
    gap: RF(12)
  },
  itemImgWrapper:{
    height: RF(50),
    width: RF(50),
    borderRadius: RF(100),
    elevation: 5,
    backgroundColor: colors.DarkWhite,
    padding: 3
  },
  itemImg:{
    height: "100%",
    width: "100%",
    resizeMode: "cover",
    borderRadius: RF(100)
  },
  itemBadgeWrapper:{
    position: "absolute",
    top: 4,
    right: 0,
    height: RF(20),
    width: RF(20),
    borderRadius: RF(100),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    padding: RF(2)
  },
  itemBadge:{
    ...GST.CENTER,
    height: "100%",
    width: "100%",
    backgroundColor: "#E5EBFC",
    borderRadius: RF(100)
  },
  itemDesc:{
    ...GST.smallesttxt,
    fontSize: RF(12)
  },
  itemsContainer:{
    ...GST.CENTERCONTAINER,
    marginTop: RF(10)
  },
  voucherBtnWrapper:{
    width: "40%"
  },
  voucherBtn:{
    paddingVertical: RF(6),
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: RF(10),
  },
  voucherTxt:{
    ...GST.subdescription,
    color: colors.blue
  },
  shippingTitle:{
    ...GST.description,
    fontFamily: "Raleway-Bold",
    marginTop: RF(5)
  },
  radioOuter:{
    height: RF(25),
    width: RF(25),
    borderRadius: RF(100),
    backgroundColor: colors.DarkWhite,
    padding: 3
  },
  radioInnerGrey:{
    height: "100%",
    width: "100%",
    backgroundColor: colors.grey,
    borderRadius: RF(100)
  },
  daysTxt:{
    ...GST.subdescription,
    color: colors.blue
  },
  optionPrice:{
    ...GST.subdescription,
    fontFamily: "Raleway-Bold"
  },
  paymentMethodBox:{
    ...GST.CENTER,
    padding: RF(5),
    backgroundColor: colors.lightblue,
    width: RF(70),
    borderRadius: RF(10),
    marginBottom: RF(20)
  },
  paymentMethodTxt:{
    ...GST.subdescription,
    color: colors.blue
  },
  flatlistContainer:{
    paddingBottom: RF(10)
  }
});

export default styles;
