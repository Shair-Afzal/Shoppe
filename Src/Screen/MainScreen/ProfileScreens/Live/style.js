import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const { width, height } = Dimensions.get("window");
 const aspectRatio = height / width;
 const isTablet = aspectRatio < 1.6;
const styles = StyleSheet.create({
  imgcontainer: {
    paddingVertical: RF(20),
    paddingBottom: RF(35),
  },
  img: {
    height: '100%',
    width: '100%',
    resizeMode: isTablet?"stretch":"cover",
  },
  bottomconatiner: {
    ...GST.CENTERCONTAINER,
    position: 'absolute',
    bottom: 5,
    alignSelf: 'center',
  },
  innercontainer: {
    ...GST.mid_row,
    gap: RF(15),
  },
  txticoncontainer: {
    ...GST.mid_row,
    gap: RF(3),
  },
  livecontainer:{
    ...GST.mid_row,
    padding:RF(4),
    backgroundColor:colors.green,
    gap:RF(2),
    borderRadius:RF(5)
  },
  circleconatiner:{
    height:RF(5),
    width:RF(5),
    borderRadius:RF(100),
    backgroundColor:colors.white
  }
});
export default styles;
