import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;
const styles = StyleSheet.create({
  selectbtn: {
    ...GST.CENTER,
    backgroundColor: colors.DarkWhite,
    height: RF(35),
    width: RF(35),
    borderRadius: RF(100),
    elevation: 5,
  },
  labeltxt: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
  },
  filtercontainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
    backgroundColor: '#F4F6FE',
    height: RF(30),
    paddingHorizontal: RF(20),
    marginTop: RF(15),
    borderRadius: RF(20),
  },
  txtcontainer: {
    ...GST.CENTER,
    backgroundColor: colors.lightpink,
    width: RF(60),
    borderRadius: RF(5),
    paddingVertical: RF(10),
  },
  clothtxtconatiner: {
    ...GST.CENTER,
    backgroundColor: colors.lightblue,
    width: RF(60),
    borderWidth: 1,
    borderColor: colors.lightblue,
    borderRadius: RF(5),
    paddingVertical: RF(3),
  },
  btnContainer: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(25),
  },
  maincontainer: {
    ...GST.FLEX,
    paddingTop: RF(25),
  },
  row:{
    gap: RF(10) 
  },
  container:{
    paddingVertical: RF(3) 
  }
});
export default styles;
