import { StyleSheet } from 'react-native';
import { RF, colors } from '../../../../Constant';

export default StyleSheet.create({
  scrollContainer: {
    paddingHorizontal: RF(20),
    backgroundColor: colors.DarkWhite,
    paddingBottom: RF(10),
  },
  heading: {
    marginTop: RF(5),
  },
  section: {
    marginTop: RF(18),
  },
  sectionTitle: {
    fontFamily: 'Raleway-Bold',
  },
  menuItem: {
    marginTop: RF(15),
    borderBottomWidth: 1,
    borderColor: colors.grey,
    paddingVertical: RF(12),
  },
  menuRight: {
    gap: RF(5),
  },
  menuRightText: {
    fontSize: RF(12),
  },
  deleteText: {
    color: colors.pink,
    marginTop: RF(15),
    fontSize: RF(12),
  },
  footerTitle: {
    fontFamily: 'Raleway-Bold',
    marginTop: RF(15),
  },
});
