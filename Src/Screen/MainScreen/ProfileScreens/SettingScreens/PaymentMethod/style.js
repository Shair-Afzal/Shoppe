import { StyleSheet } from 'react-native';
import { colors, RF } from '../../../../../Constant';
import GST from '../../../../../Constant';  // in case you need GST spreads

 const styles = StyleSheet.create({
  main: {
    paddingLeft: RF(15),
    paddingTop: RF(15),
  },
  cardSection: {
    gap: RF(10),
    marginTop: RF(10),
  },
  cardBox: {
    backgroundColor: colors.lightblue,
    width: "80%",
    padding: RF(10),
    paddingBottom: RF(20),
    height: RF(150),
    justifyContent: "space-between",
    borderRadius: RF(10),
  },
  cardDetails: {
    gap: RF(13),
  },
  addButton: {
    height: RF(150),
    backgroundColor: colors.blue,
    width: RF(50),
    borderRadius: RF(10),
  },
  addText: {
    color: colors.DarkWhite,
  },
  transactionList: {
    paddingRight: RF(15),
  },
  transactionItem: {
    ...GST.CENTERCONTAINER,
    padding: RF(8),
    backgroundColor: colors.lightblue,
    borderRadius: RF(10),
    marginTop: RF(10),
  },
  transactionRow: {
    gap: RF(15),
  },
  transactionDate: {
    fontSize: RF(12),
  },
  transactionBold: {
    fontFamily: "Raleway-Bold",
  },
});
export default styles
