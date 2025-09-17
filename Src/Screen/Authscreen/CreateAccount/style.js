import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../Constant';
const styles = StyleSheet.create({
  cancelbtn: {
    alignSelf: 'center',
    marginTop: RF(10),
  },
  container: {
    ...GST.FLEX,
    position: 'relative',
    overflow: 'hidden',
  },
  txt: {
    ...GST.heading,
    position: 'absolute',
    top: RF(110),
    left: RF(15),
  },
  innercontainer: {
    flex: 1,
    paddingHorizontal: RF(15),
    bottom: RF(45),
  },
  inputwrapper: {
    paddingVertical: RF(20),
    gap: 10,
  },

  errortext: {
    ...GST.subdescription,
    color: 'red',
  },
  googleapplebtn: {
    ...GST.CENTER,
    borderWidth: 1,
    width: '45%',
    paddingVertical: RF(8),
    borderRadius: RF(10),
    borderColor: colors.grey,
  },
  gacontainer: {
    ...GST.CENTERCONTAINER,
    alignSelf: 'center',
    marginTop: RF(10),
    width: '80%',
  },
});
export default styles;
