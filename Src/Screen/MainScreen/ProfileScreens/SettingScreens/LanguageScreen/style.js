import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../../Constant";

const styles = StyleSheet.create({
  main: {
    paddingTop: RF(15),
  },
  itemContainer: {
    marginTop: RF(10),
    backgroundColor: colors.lightblue,
    padding: RF(10),
    borderRadius: RF(10),
  },
  itemText: {
    color: colors.blue,
  },
  unselectedOuter: {
    height: RF(20),
    width: RF(20),
    backgroundColor: colors.DarkWhite,
    padding: RF(2),
    borderRadius: RF(100),
  },
  unselectedInner: {
    backgroundColor: colors.lightpink,
    height: '100%',
    width: '100%',
    borderRadius: RF(100),
  },
});
export default styles