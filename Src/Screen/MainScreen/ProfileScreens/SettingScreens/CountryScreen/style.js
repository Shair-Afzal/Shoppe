import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../../Constant";

const styles = StyleSheet.create({
  main: {
    paddingTop: RF(15),
    // backgroundColor:"red"
  },
  selectedBox: {
    marginTop: RF(10),
    backgroundColor: colors.lightblue,
    padding: RF(10),
    borderRadius: RF(10),
  },
  selectedText: {
    color: colors.blue,
  },
  sectionHeader: {
    ...GST.CENTER,
    padding: RF(2),
    backgroundColor: colors.grey,
    width: RF(35),
    marginTop: RF(20),
  },
  countryName: {
    ...GST.smallesttxt,
    fontSize: RF(14),
    marginTop: RF(12),
  },
});
export default styles
