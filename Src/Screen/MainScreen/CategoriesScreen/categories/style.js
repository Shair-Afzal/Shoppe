import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF, fontFamily } from '../../../../Constant';

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;

const styles = StyleSheet.create({
  container: {
    ...GST.MAIN,
    paddingTop: RF(10),
  },
  btn: {
    width: isTablet ? RF(130) : RF(100),
    paddingVertical: RF(8),
    ...GST.CENTER,
    backgroundColor: colors.grey,
    borderRadius: RF(10),
  },
  btncontainer: {
    ...GST.mid_row,
    marginTop: RF(10),
    justifyContent: 'space-between',
  },
  onbtn: {
    width: "33%",
    paddingVertical: RF(8),
    ...GST.CENTER,
    backgroundColor: colors.lightblue,
    borderRadius: RF(10),
    borderWidth: 1,
    borderColor: colors.blue,
  },
  selectedtxt: {
    ...GST.subdescription,
    color: colors.blue,
  },
  selectbtn: {
    ...GST.CENTER,
    height: RF(40),
    width:"47%",
    borderRadius: RF(10),
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
    borderColor: colors.lightpink,
    marginTop: RF(5),
  },
  categoryWrapper: {
    marginTop: RF(10),
  },
  categoryRow: {
    justifyContent: 'space-between',
  },
  categoryTxt: {
    ...GST.subdescription,
    fontFamily: fontFamily.raleway,
  },
  justforcontainer: {
    height: RF(45),
    width: '98%',
    backgroundColor: colors.DarkWhite,
    paddingHorizontal: RF(5),
    borderRadius: RF(10),
    elevation: 5,
    marginTop: RF(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
  },
  justforRow: {
    ...GST.ROW,
    gap: RF(10),
    alignItems: 'center',
  },
  justforTxt: {
    ...GST.subdescription,
    fontFamily: fontFamily.raleway,
  },
  star: {
    color: colors.blue,
  },
  scrollcontainer: {
    flexGrow: 1,
    paddingBottom: RF(20),
  },
});

export default styles;
