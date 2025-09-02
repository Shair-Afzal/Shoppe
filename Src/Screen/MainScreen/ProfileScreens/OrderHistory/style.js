import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const styles = StyleSheet.create({
  maincontainer: {
    ...GST.MAIN,
    paddingTop: RF(15),
  },
  cartItemContainer: {
    ...GST.ROW,
    borderRadius: RF(12),
    // gap: RF(15),
    width: '100%',
    marginTop: RF(12),
    // borderWidth:1,
    justifyContent:"space-between"
  },
  imageContainer: {
    width: "40%",
    height: RF(110),
    padding: RF(3),
    borderRadius: RF(12),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: RF(10),
    backgroundColor: colors.lightpink,
    resizeMode:"cover"
  },
  deleteButton: {
    position: 'absolute',
    bottom: RF(22),
    left: RF(15),
    width: RF(32),
    height: RF(32),
    borderRadius: RF(16),
    backgroundColor: colors.DarkWhite,
    ...GST.CENTER,
  },

  productDetails: {
    height: RF(110),
    width: RF(180),
    justifyContent: 'space-between',
    borderRadius: RF(12),
  },
  productTitle: {
    ...GST.smallesttxt,
    color: colors.darkblack,
    fontSize: RF(12),
  },
  productPrice: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
  },
  optionsContainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
  },
  optionButton: {
    paddingHorizontal: RF(15),
    paddingVertical: RF(4),
    borderRadius: RF(8),
    ...GST.CENTER,
  },
  colorOption: {
    backgroundColor: colors.lightblue,
  },
  sizeOption: {
    backgroundColor: colors.darkgrey,
  },
  selectedOption: {
    backgroundColor: colors.lightblue,
  },
  optionText: {
    ...GST.subdescription,
    fontFamily: 'NunitoSans-Regular',
    color: colors.darkblack,
  },
  selectedOptionText: {
    color: colors.darkblack,
    fontFamily: 'NunitoSans-SemiBold',
  },
  btn: {
    paddingVertical: RF(8),
    borderRadius: RF(8),
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
    borderColor: colors.blue,
  },
  btncontainer: {
    width: '45%',
  },
  rowconatiner: {
    ...GST.ROW,
    // gap: RF(12),
    justifyContent:"space-between"
  },
  dateconatiner: {
    paddingVertical: RF(8),
    backgroundColor: colors.grey,
    borderRadius: RF(8),
  },
});
export default styles;
