import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;

const styles = StyleSheet.create({
  maincontainer: {
    ...GST.FLEX,
    paddingHorizontal: RF(12),
  },
  sectionWrapper: {
    // flex:1,
    
  },
  row: {
    gap: RF(10),
  },
  container: {
    paddingVertical: RF(3),
  },
  btnContainer: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(25),
  },
  shopRow: {
    ...GST.ROW,
    gap: RF(5),
    justifyContent:"flex-end"

  },
  clothtxtconatiner: {
    ...GST.CENTER,
    backgroundColor: colors.lightblue,
    width: "30%",
    borderWidth: 1,
    borderColor: colors.lightblue,
    borderRadius: RF(8),
    paddingVertical: RF(10),
    borderColor:colors.blue
  },
  txtcontainer: {
    ...GST.CENTER,
    backgroundColor: colors.lightpink,
    width: "30%",
    borderRadius: RF(8),
    paddingVertical: RF(10),
    borderWidth: 1,
  },
  labeltxt: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
  },
  filtercontainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
    backgroundColor: '#F4F6FE',
    height: RF(30),
    paddingHorizontal: RF(20),
    marginTop: RF(15),
    borderRadius: RF(20),
  },
  selectbtn: {
    // ...GST.CENTER,
   alignItems:"center",
    backgroundColor: colors.DarkWhite,
    height: RF(30),
    width: RF(30),
    borderRadius: RF(100),
    elevation: 5,
  },
  colorLabel: {
    marginTop: RF(15),
  },
  colorListWrapper: {
    height: RF(60),
  },
  colorListContainer: {
    paddingLeft: RF(15),
    marginTop: RF(10),
    gap: RF(15),
    height: RF(50),
  },
  colorCircle: {
    backgroundColor: colors.DarkWhite,
    padding: RF(3),
    height: RF(40),
    width: RF(40),
    borderRadius: RF(100),
    elevation: 5,
    borderColor: colors.blue,
  },
  innerColor: {
    width: '100%',
    height: '100%',
    borderRadius: RF(100),
  },
  selectIcon: {
    position: 'absolute',
    top: 0,
    right: 0,
    zIndex: 11,
  },
  columnWrapper: {
    justifyContent: 'space-between',
  },
  sortOption: {
   
    height:RF(30),
    width:"40%",
    borderRadius: RF(20),
    marginTop: RF(10),
    alignItems:"center",
    justifyContent:"center"
  },
  sortSelectIcon: {
    position: 'absolute',
    right: 0,
  },
  footerWrapper: {
    ...GST.CENTERCONTAINER,
    paddingHorizontal: RF(15),

    marginTop: RF(30),
    // marginBottom: RF(20),
  },
  clearBtnWrapper: {
    width: '30%',
  },
  clearBtn: {
    backgroundColor: colors.DarkWhite,
    borderWidth: 1,
    borderColor: colors.blue,
    padding: RF(12),
  },
  clearBtnText: {
    color: colors.blue,
  },
  applyBtnWrapper: {
    width: '65%',
  },
  applyBtn: {
    padding: RF(12),
  },
});

export default styles;