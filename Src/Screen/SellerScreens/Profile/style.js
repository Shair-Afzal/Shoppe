import { StyleSheet } from 'react-native';
import GST, { wp, hp, colors, RF } from '../../../Constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkWhite,
     paddingHorizontal: wp('4%'), 
     
  },
  content: {
    padding: wp('5%'),
    alignItems: 'center',
  },
  logoContainer: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    backgroundColor: colors.grey,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp('2%'),
  },
  placeholderLogo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: RF(12),
    color: colors.dimBlack,
  },
  logo: {
    width: '100%',
    height: '100%',
    borderRadius: wp('15%'),
  },
  shopName: {
    fontSize: RF(18),
    fontWeight: '600',
    marginBottom: hp('1%'),
  },
  shopDescription: {
    fontSize: RF(14),
    textAlign: 'center',
    color: colors.dimBlack,
    marginBottom: hp('2%'),
  },
  editButton: {
    backgroundColor: colors.blue,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('8%'),
    borderRadius: wp('2%'),
  },
  editButtonText: {
    color: colors.white,
    fontSize: RF(14),
  },
});
