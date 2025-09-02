import { StyleSheet } from 'react-native';
import { colors, RF } from '../../../../../Constant';

 const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingHorizontal: RF(15),
    backgroundColor: colors.DarkWhite,
  },
  countryRow: {
    marginTop: RF(15),
  },
  countryName: {
    color: colors.blue,
  },
  inputBlock: {
    marginTop: RF(15),
  },
  inputContainer: {
    borderRadius: RF(15),
    backgroundColor: colors.lightblue,
    paddingVertical: RF(3),
  },
  saveButton: {
    position: 'absolute',
    bottom: RF(10),
    left: RF(15),
    paddingVertical: RF(15),
  },
});

export default styles
