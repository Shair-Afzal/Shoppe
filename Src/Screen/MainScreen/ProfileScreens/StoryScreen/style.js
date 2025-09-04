import { StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const styles = StyleSheet.create({
  dot: {
    height: RF(10),
    width: RF(10),
    borderRadius: RF(100),
    backgroundColor: colors.lightblue,
  },
  activeDot: {
    height: RF(10),
    width: RF(10),
    borderRadius: RF(100),
    backgroundColor: colors.blue,
    paddingHorizontal: RF(15),
  },

  storyImage: {
    width: '100%',
  },
  bigSaleImg: {
    height: '20%',
    width: '100%',
  },
  txtRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: RF(5),
    gap: RF(15),
  },
  shopButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '40%',
    height: RF(45),
    backgroundColor: colors.blue,
    borderRadius: RF(10),
  },
  overlayBox: {
    padding: RF(10),
    backgroundColor: colors.DarkWhite,
    position: 'absolute',
    bottom: RF(50),
    width: '90%',
    alignSelf: 'center',
    borderRadius: RF(10),
  },
  saleImage: {
    height: RF(130),
    width: "48%",
    resizeMode: 'cover',
    borderRadius: RF(10),
  },
  saleContent: {
    justifyContent: 'space-between',
    height: "100%",
  },
  saleShopButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: "100%",
    height: RF(45),
    backgroundColor: colors.blue,
    borderRadius: RF(10),
  },
  txt: {
    ...GST.smallesttxt,
    fontSize: RF(11),
  },
});
export default styles;
