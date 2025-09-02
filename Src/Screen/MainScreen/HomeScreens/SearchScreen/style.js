import { StyleSheet } from 'react-native';
import { RF, colors } from '../../../../Constant';

const styles = StyleSheet.create({
  historyHeader: {
    marginTop: RF(10),
  },
  historyWrapper: {
    gap: RF(5),
    flexWrap: 'wrap',
    marginTop: RF(10),
  },
  historyItem: {
    backgroundColor: colors.grey,
    padding: RF(10),
    paddingHorizontal: RF(15),
    borderRadius: RF(10),
  },
  recommendationsTitle: {
    marginTop: RF(10),
  },
  recommendWrapper: {
    gap: RF(5),
    flexWrap: 'wrap',
    marginTop: RF(10),
  },
  recommendItem: {
    backgroundColor: colors.grey,
    padding: RF(10),
    paddingHorizontal: RF(15),
    borderRadius: RF(10),
  },
  discoverTitle: {
    marginTop: RF(10),
  },
  loadingstyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
export default styles;
