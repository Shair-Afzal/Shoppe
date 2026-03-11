import { StyleSheet } from 'react-native';
import GST, { wp, hp, colors, RF } from '../../../Constant';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.DarkWhite,
  },
  chatList: {
    padding: wp('4%'),
  },
  messageBubble: {
    backgroundColor: colors.lightblue,
    padding: wp('3%'),
    borderRadius: wp('3%'),
    marginVertical: hp('0.5%'),
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  messageText: {
    fontSize: RF(14),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp('2%'),
    borderTopWidth: 1,
    borderColor: colors.grey,
  },
  input: {
    flex: 1,
    backgroundColor: colors.grey,
    borderRadius: wp('5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    fontSize: RF(14),
    paddingHorizontal: wp('4%'),
  },
  sendButton: {
    marginLeft: wp('2%'),
    backgroundColor: colors.blue,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('3%'),
  },
  sendText: {
    color: colors.white,
  },
});
