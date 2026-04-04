import {StyleSheet} from 'react-native';
import GST, {wp, hp, colors, fontSize, RF} from '../../../../Constant';

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    gap: wp('2.5%'),
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    backgroundColor: colors.DarkWhite,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightblue,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  backBtn: {
    paddingRight: wp('1%'),
    paddingVertical: hp('1%'),
  },
  iconWrapper: {
    height: wp('11%'),
    width: wp('11%'),
    backgroundColor: colors.DarkWhite,
    borderRadius: wp('5.5%'),
    padding: wp('0.8%'),
    elevation: 3,
    shadowColor: colors.blue,
    shadowOpacity: 0.15,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  iconInner: {
    backgroundColor: colors.lightblue,
    height: '100%',
    width: '100%',
    borderRadius: wp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    color: colors.blue,
    fontFamily: 'Raleway-Bold',
    fontSize: fontSize.avgSmall,
  },
  bodyContainer: {
    backgroundColor: colors.grey,
    flex: 1,
  },

  /** Chat Messages */
  messageList: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    paddingBottom: hp('2%'),
  },
  messageBubble: {
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('1.2%'),
    borderRadius: wp('4%'),
    marginVertical: hp('0.5%'),
    maxWidth: '78%',
    elevation: 1,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
    borderBottomRightRadius: wp('1%'),
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.white,
    borderBottomLeftRadius: wp('1%'),
  },
  userText: {
    color: '#FFFFFF',
    fontSize: fontSize.avgSmall,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: RF(20),
  },
  botText: {
    color: colors.Black,
    fontSize: fontSize.avgSmall,
    fontFamily: 'NunitoSans-Regular',
    lineHeight: RF(20),
  },
  timeText: {
    fontSize: RF(10),
    marginTop: hp('0.5%'),
    alignSelf: 'flex-end',
    fontFamily: 'NunitoSans-Regular',
  },

  /** Input Section */
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('1%'),
    backgroundColor: colors.DarkWhite,
    borderTopWidth: 1,
    borderTopColor: colors.lightblue,
  },
  inputContainer: {
    flex: 1,
    fontSize: fontSize.avgSmall,
    backgroundColor: colors.grey,
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
    maxHeight: hp('12%'),
    color: colors.Black,
    fontFamily: 'NunitoSans-Regular',
  },
  sendBtn: {
    marginLeft: wp('2%'),
    backgroundColor: colors.blue,
    paddingHorizontal: wp('4.5%'),
    paddingVertical: hp('1.5%'),
    borderRadius: wp('5%'),
    elevation: 2,
    shadowColor: colors.blue,
    shadowOpacity: 0.3,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 4,
  },
  sendBtnText: {
    color: '#FFFFFF',
    fontSize: fontSize.avgSmall,
    fontFamily: 'Raleway-Bold',
  },

  /** Center/Loading/Empty states */
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noMessagesContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
  },
  noMessagesText: {
    fontSize: fontSize.small,
    color: colors.dimBlack,
    textAlign: 'center',
    fontFamily: 'NunitoSans-Regular',
  },
});

export default styles;