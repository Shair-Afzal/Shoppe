import { StyleSheet } from 'react-native';
import { colors, RF, fontSize } from '../../../../Constant';

const styles = StyleSheet.create({
  main: {
    paddingTop: RF(25),
  },
  flatlistContainer: {
    paddingBottom: RF(20),
  },
  card: {
    marginTop: RF(10),
    width: '100%',
  },
  catImg: {
    height: RF(40),
    width: '48%',
    resizemode: 'cover',
  },
  catStyle: {
    width: '30%',
  },

  detailsContainer: {
    height: RF(90),
    width: '67%',
  },
  orderInfo: {
    justifyContent: 'space-between',
    height: '100%',
    width: '100%',
  },
  orderRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  orderLeft: {
    width: '60%',
  },
  orderNumber: {
    fontFamily: 'Raleway-Bold',
    fontSize: RF(14),
    color: colors.Black,
  },
  shippedText: {
    fontFamily: 'Raleway-Bold',
    color: colors.Black,
  },

  itemBox: {
    padding: RF(6),
    backgroundColor: colors.lightblue,
    borderRadius: RF(5),
    alignSelf: 'flex-end',
  },
  itemText: {
    fontSize: fontSize.regSmall,
  },

  trackBtn: {
    padding: RF(8),
    width: '40%',
    borderRadius: RF(10),
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackBtnTrack: {
    backgroundColor: colors.blue,
    borderWidth: 0,
  },
  trackBtnReview: {
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
  },
  trackText: {
    color: colors.DarkWhite,
  },
  reviewText: {
    color: colors.blue,
  },
});

export default styles;
