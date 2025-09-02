import { StyleSheet } from 'react-native';
import { colors, RF } from '../../../../../Constant';

 const styles = StyleSheet.create({
  main: {
    paddingTop: RF(15),
  },
  avatarContainer: {
    height: RF(100),
    width: RF(100),
    borderRadius: RF(100),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    padding: RF(7),
    marginTop: RF(10),
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: RF(100),
    resizeMode: 'cover',
  },
  editIcon: {
    position: 'absolute',
    top: RF(15),
    right: 0,
  },
  inputWrapper: {
    gap: RF(10),
    marginTop: RF(15),
  },
  inputContainer: {
    backgroundColor: colors.lightblue,
    borderRadius: RF(5),
  },
});
export default styles
