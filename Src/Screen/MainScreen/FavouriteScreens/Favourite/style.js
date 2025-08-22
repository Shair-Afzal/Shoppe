import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';

const styles = StyleSheet.create({
  container: {
    ...GST.MAIN,
    paddingTop: RF(10),
  },
  listconatiner: {
    height: RF(80),
  },
  elipseconatiner: {
    position:"absolute",
    top:0,
    left:0,
    right:0,
    bottom:0,
    ...GST.CENTER
  },
  elipse: {
    ...GST.CENTER,
    backgroundColor: colors.DarkWhite,
    elevation: RF(5),
    borderRadius: RF(100),
    height: RF(120),
    width: RF(120),
  },
  bottomcontainer:{
    position:"absolute",
    bottom:10,
    paddingLeft:RF(15)
  },
  sectioncontainer:{
    paddingRight:RF(15)
  }
});
export default styles;
