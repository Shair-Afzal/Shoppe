import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../Constant';

const styles = StyleSheet.create({
  otpcontainer: {
    height: RF(20),
    width: RF(20),
    borderRadius: RF(100),
    backgroundColor: colors.grey,
    borderWidth: 0,
    marginTop: RF(4),
  },
  otpwarapper: {
    width: '60%',
    marginTop: RF(10),
  },
  container: {
    ...GST.CENTER,
    paddingTop: RF(25),
  },
  svgcontainer: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  profilecontainer: {
    height: RF(300),
  },
  rowcontainer: {
    ...GST.ROW,
    ...GST.CENTER,
    gap: RF(10),
    position: 'absolute',
    bottom: RF(20),
    alignSelf: 'center',
  },
  forgetcon: {
    marginTop: RF(10),
  },
  forgettxt: {
    ...GST.subdescription,
    textAlign: 'right',
  },
});

export default styles;
