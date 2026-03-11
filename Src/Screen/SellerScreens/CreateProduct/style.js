import { StyleSheet } from 'react-native';
import GST, { wp, hp, colors, RF } from '../../../Constant';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkWhite,
    paddingHorizontal: wp('4%'),
  },
  content: {
    padding: wp('5%'),
  },
  input: {
    marginBottom: hp('2%'),
    // paddingVertical: hp('1%'),
    borderRadius:10

  },
  submitButton: {
    backgroundColor: colors.blue,
    paddingVertical: hp('2%'),
    borderRadius: wp('2%'),
    alignItems: 'center',
    marginTop: hp('2%'),
  },
  submitText: {
    color: colors.white,
    fontSize: RF(16),
  },
});
