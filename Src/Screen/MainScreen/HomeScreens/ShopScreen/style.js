import { StyleSheet } from 'react-native';
import { RF } from '../../../../Constant';

const styles= StyleSheet.create({
  main: {
    paddingTop: RF(15),
  },
  topProductWrapper: {
    marginTop: RF(10),
  },
  topProductRow: {
    gap: RF(7),
  },
  topProductContainer: {
    paddingVertical: RF(10),
  },
  allItemsRow: {
    marginTop: RF(15),
  },
  allItemsText: {
    fontFamily: 'Raleway-Bold',
  },
  newItemContainer: {
    marginTop: RF(12),
    paddingBottom: RF(20),
  },
  newItemRow: {
    justifyContent: 'space-between',
    paddingRight: RF(1),
  },
  newItem: {
    marginLeft: RF(2),
  },
  newItemImg: {
    width: '100%',
  },
});
export default styles
