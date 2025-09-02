import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const styles = StyleSheet.create({
  navButton: {
    width: RF(30),
    height: RF(30),
    ...GST.CENTER,
    backgroundColor: colors.lightblue,
    borderRadius: RF(100),
  },
  Chartconatiner: {
    ...GST.CENTER,
    height: RF(185),
    width: RF(185),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
    position: 'relative',
  },
  chart: {
    position: 'absolute', // same as top:0,left:0,right:0,bottom:0
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    ...GST.CENTER,
  },
  btn: {
    paddingVertical: RF(13),
    borderRadius: RF(100),
    backgroundColor: colors.darkgrey,
    marginTop: RF(10),
  },
  cartcontainer: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(35),
  },
  innerconatiner: {
    ...GST.CENTER,
    height: RF(110),
    width: RF(110),
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(100),
    elevation: 5,
  },
  productcontainer: {
    borderRadius: RF(20),
    marginTop: RF(10),
    padding: RF(5),
    paddingHorizontal: RF(12),
  },
  rowconatiner: {
    ...GST.mid_row,
    gap: RF(15),
    marginTop: RF(10),
  },
  elipseconatiner: {
    ...GST.CENTER,
    height: RF(60),
    width: RF(60),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
  },
  elipse: {
    ...GST.CENTER,
    height: RF(40),
    width: RF(40),
    backgroundColor: colors.blue,
    borderRadius: RF(100),
  },
  txt: {
    ...GST.subdescription,
    marginTop: RF(5),
    textAlign: 'center',
  },
  btnbottom: {
    position: 'absolute',
    bottom: RF(10),
    left: RF(15),
    paddingVertical: RF(15),
  },
});
export default styles;
