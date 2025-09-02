import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;
const styles = StyleSheet.create({
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  container: {
    flexGrow: 1,
    paddingHorizontal: RF(15),
    paddingTop: RF(40),
    paddingBottom: RF(20),
  },
  imgcon: {
    marginTop: RF(20),
  },
  img: {
    height: isTablet ? RF(190) : RF(160),
    width: '100%',
    resizeMode: 'conatin',
  },
  discontcon: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(15),
    marginBottom:RF(12),
  },
  discounttxt: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
  },
  itemcontainer: {
    marginTop: RF(12),
  },
  rowstyle: {
    justifyContent: 'space-between',
    paddingRight: RF(1),
  },
  itemstyle: {
    width: "49%",
    // marginLeft: RF(2),
  },
  itemimgcon: {
    width: '100%',
  },
  imgconitem: {
    height: isTablet ? RF(190) : RF(150),
    width: '100%',
    resizemode: 'cover',
  },
});
export default styles;
