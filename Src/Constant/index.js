import { StyleSheet } from "react-native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
export { RFValue as RF };
export { RFPercentage as RFP };
import { Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export { wp, hp };

const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;

export const DEVICE_WIDTH = width;
export const DEVICE_HEIGHT = height;
export const IS_TABLET = aspectRatio < 1.6
const GST = StyleSheet.create({
  FLEXGROW: {
    flexGrow: 1,

  },
  FLEX: {
    flex: 1,
    backgroundColor: "#FFFFFF"

  },
  CENTER: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  SPACEBETWEEN: {
    justifyContent: 'space-between',
  },
  AlignSelf: {
    alignSelf: 'center'
  },
  MAIN: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: RFValue(15)
  },
  MODALMAIN: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  ROW: {
    flexDirection: 'row',
  },
  mid_row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  COLUMN: {
    flexDirection: 'column',
  },
  FLEXWRAP: {
    flex: 1,
    flexWrap: 'wrap',
  },
  CENTERCONTAINER: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center"
  },
  heading: {
    fontSize: RFValue(50),
    color: "#202020",
    fontFamily: "Raleway-ExtraBold",

  },
  subHeading: {
    fontSize: RFValue(28),
    fontFamily: "Raleway-Bold",
    color: "#202020"
  },
  description: {
    fontSize: RFValue(19),
    color: "#202020",
    fontFamily: "NunitoSans-Regular",
  },
  subdescription: {
    fontSize: RFValue(15),
    color: "#202020",
    fontFamily: "NunitoSans-Regular",

  },
  smallesttxt: {
    fontSize: RFValue(10),
    color: "#202020",
    fontFamily: "NunitoSans-Regular",
  },
  btnTitle: {
    fontSize: RFValue(18),
    color: "#F3F3F3",
    fontFamily: "NunitoSans-Regular",

  },


});
export default GST
export const colors = {
  DarkWhite: '#FFFFFF',
  white: '#F3F3F3',
  Black: '#000000',
  dimBlack: '#808080',
  grey: '#F8F8F8',
  blue: "rgba(0, 76, 255, 1)",
  pink: "rgba(255, 87, 144, 1)",
  lightpink: "rgba(248, 206, 206, 1)",
  lightblue: "rgba(229, 235, 252, 1)",
  darkblack: "#202020",
  orange: "#FE7F00",
  green: "#08C514",
  darkgrey: "#F9F9F9",
  red: "#FF0000",
  // ── Seller Theme ─────────────────────────────────────────────
  sellerPrimary: '#4F46E5',   // Deep indigo — main seller brand color
  sellerDark: '#3730A3',   // Darker indigo for pressed/header states
  sellerAccent: '#06B6D4',   // Cyan accent for highlights
  sellerSuccess: '#10B981',   // Emerald green for success / In Stock
  sellerWarning: '#F59E0B',   // Amber for warnings / Low Stock
  sellerError: '#EF4444',   // Red for errors / Out of Stock / Cancelled
  sellerBg: '#F1F5F9',   // Light slate background
  sellerCard: '#FFFFFF',   // Card background
  sellerBorder: '#E2E8F0',   // Subtle border color
  sellerText: '#1E293B',   // Primary text
  sellerSubText: '#64748B',   // Secondary / muted text
  sellerLight: '#EEF2FF',   // Indigo tint for chip backgrounds
  sellerGradStart: '#4F46E5',   // Gradient start
  sellerGradEnd: '#7C3AED',   // Gradient end (violet)
};
export const radius = {
  radius1: RFValue(2),
  radius2: RFValue(5),
  radius3: RFValue(10),
  radius4: RFValue(20),
  radius5: RFValue(100),
};
export const fontSize = {
  extraSmall: RFValue(10),
  regSmall: RFValue(12),
  avgSmall: RFValue(14),
  small: RFValue(16),
  medium: RFValue(18),
  large: RFValue(20),
  mediumLarge: RFValue(22),
  extraLarge: RFValue(24),
  doubleXLarge: RFValue(28),
  superLarge: RFValue(50),
};
export const fontFamily = {
  medium: 'Raleway-Medium',
  bold: 'Raleway-Bold',
  DMreg: 'Raleway-Regular',
  raleway: "Raleway"
};