import { StyleSheet } from 'react-native';
import GST, { RF, colors, fontFamily } from '../../../../Constant';

export default StyleSheet.create({
  progressIcon: {
    marginTop: RF(20),
  },
  trackingContainer: {
    ...GST.CENTERCONTAINER,
    backgroundColor: colors.darkgrey,
    borderRadius: RF(15),
    padding: RF(8),
    paddingHorizontal: RF(15),
    marginTop: RF(20),
  },
  trackingTitle: {
    fontSize: RF(12),
    fontWeight: '700',
  },
  trackingNumber: {
    fontSize: RF(12),
  },
  flatlistWrapper: {
    height: RF(300),
  },
  flatlistContent: {
    marginTop: RF(10),
  },
  trackItem: {
    marginTop: RF(15),
  },
  itemTitle: {
    fontWeight: '700',
  },
  dateBox: {
    padding: RF(5),
    backgroundColor: colors.grey,
    borderRadius: RF(5),
  },
  itemText: {
    fontSize: RF(12),
    marginTop: RF(5),
  },
  outForDelivery: {
    fontWeight: '700',
    marginTop: RF(12),
  },
  outForDeliveryDesc: {
    fontSize: RF(12),
    marginTop: RF(5),
  },
  unsuccessBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: RF(15),
  },
  unsuccessText: {
    color: colors.blue,
    fontSize: RF(17),
  },
  unsuccessDateBox: {
    backgroundColor: "#F63C3C",
    padding: RF(5),
    borderRadius: RF(10),
  },
  unsuccessDateText: {
    color: colors.DarkWhite,
  },
  deliveredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: RF(5),
    marginTop: RF(12),
  },
  deliveredText: {
    ...GST.subdescription,
    fontFamily:fontFamily.bold
  },
  deliveredDesc: {
    fontSize: RF(12),
    marginTop: RF(5),
  },
});
