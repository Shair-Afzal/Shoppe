import { StyleSheet } from 'react-native';
import GST, { RF } from '../../../../Constant';

const styles = StyleSheet.create({
  btnContainer: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(10),
  },
  toggleBtn: {
    ...GST.mid_row,
    padding: RF(4),
    borderRadius: RF(20),
    width: RF(135),
    marginHorizontal: RF(5), // spacing between buttons
  },
  toggleTxt: {
    ...GST.smallesttxt,
    fontSize: RF(13),
  },
  selectIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  newItemContainer: {
    marginTop: RF(12),
    paddingBottom: RF(20),
  },
  newItemRow: {
    justifyContent: 'space-between',
  },
  imgStyle: {
    width: '100%',
  },
});

export default styles;
