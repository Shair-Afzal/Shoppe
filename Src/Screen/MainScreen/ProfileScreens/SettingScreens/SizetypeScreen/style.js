// styles.js
import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../../Constant';

 const styles = StyleSheet.create({
  main: {
    ...GST.MAIN,
    paddingTop: RF(15), // safeAreaInsets will be added dynamically in component
  },
  container: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(10),
    backgroundColor: colors.lightblue,
    padding: RF(10),
    borderRadius: RF(10),
  },
  text: {
    ...GST.subdescription,
    color: colors.blue,
  },
  unselectedOuter: {
    height: RF(20),
    width: RF(20),
    backgroundColor: colors.DarkWhite,
    padding: RF(2),
    borderRadius: RF(100),
  },
  unselectedInner: {
    backgroundColor: colors.lightpink,
    height: '100%',
    width: '100%',
    borderRadius: RF(100),
  },
});
export default styles
