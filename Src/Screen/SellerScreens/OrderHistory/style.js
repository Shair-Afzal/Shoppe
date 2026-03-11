import { StyleSheet } from 'react-native';
import GST, { wp, hp, colors, RF } from '../../../Constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkWhite,
     paddingHorizontal: wp('4%'),
  },
  list: {
    padding: wp('4%'),
  },
  orderRow: {
    padding: wp('4%'),
    borderBottomWidth: 1,
    borderColor: colors.grey,
  },
  orderText: {
    fontSize: RF(16),
    marginBottom: hp('0.5%'),
  },
  orderDate: {
    fontSize: RF(12),
    color: colors.dimBlack,
  },
});
