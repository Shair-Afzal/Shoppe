import { StyleSheet } from "react-native";
import GST, { colors, RF } from "../../../../../Constant";

const styles = StyleSheet.create({
  iconWrapper: {
    ...GST.CENTER,
    height: RF(270),
  },
  appIcon: {
    marginTop: RF(10),
    alignSelf: 'center',
  },
  description: {
    ...GST.subdescription,
    marginTop: RF(5),
    fontFamily: 'NunitoSans-Light',
  },
  helpText: {
    ...GST.subdescription,
    marginTop: RF(15),
    fontFamily: 'NunitoSans-Light',
  },
  email: {
    ...GST.subdescription,
    marginTop: RF(10),
    fontFamily: 'NunitoSans-Bold',
  },
});
export default styles