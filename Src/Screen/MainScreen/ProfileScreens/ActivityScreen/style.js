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
    height: RF(190),
    width: RF(190),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
    position: 'relative',
   
  },
  chart: {
    position:"absolute",// same as top:0,left:0,right:0,bottom:0
    top:0,
    left:0,
    right:0,
    bottom:0,
    ...GST.CENTER
  },
});
export default styles;
