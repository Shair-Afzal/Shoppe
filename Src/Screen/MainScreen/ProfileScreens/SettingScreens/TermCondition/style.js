import { StyleSheet } from 'react-native';
import GST, { colors, fontFamily, RF } from '../../../../../Constant';

const styles = StyleSheet.create({
  main: {
    paddingTop: RF(10),
  },
  iconContainer: {
    height: RF(270),
  },
  appIcon: {
    marginTop: RF(10),
    alignSelf: 'center',
  },
  section: {
    gap: RF(10),
    marginTop: RF(10),
  },
  boldText: {
    fontFamily: fontFamily.bold,
  },
});
export default styles
