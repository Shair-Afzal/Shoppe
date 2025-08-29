import { Dimensions, StyleSheet } from 'react-native';
import GST, { colors, RF } from '../../../../Constant';
const { width, height } = Dimensions.get('window');
const aspectRatio = height / width;
const isTablet = aspectRatio < 1.6;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: RF(25),
  },
  bannerContainer: {
    marginTop: RF(16),
    borderRadius: RF(10),
    overflow: 'hidden',
    height: isTablet ? RF(150) : RF(130),
    width: '100%',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bannerTextContainer: {
    position: 'absolute',
    top: RF(10),
    left: RF(20),
  },
  bannerTitle: {
    fontSize: RF(24),
    fontWeight: '700',
    color: '#FFFFFF',
  },
  bannerSubtitle: {
    fontSize: RF(18),
    fontWeight: '600',
    color: '#FFFFFF',
  },
  bannerBubbleText: {
    fontSize: RF(12),
    color: colors.DarkWhite,
    position: 'absolute',
    bottom: 10,
    left: RF(20),
  },
  sectionHeader: {
    ...GST.CENTERCONTAINER,
    marginTop: RF(10),
    marginBottom: RF(12),
  },
  sectionTitle: {
    fontSize: RF(20),
    color: colors.darkblack,
    fontFamily: 'Raleway-Bold',
  },
  seeAll: {
    fontSize: RF(14),
    color: '#4C6EF5',
    fontWeight: '600',
  },
  categoriesList: {
    backgroundColor: colors.DarkWhite,
  },
  categoryRow: {
    justifyContent: 'space-between',
    marginBottom: RF(5),
    backgroundColor: colors.DarkWhite,
    paddingHorizontal: 2,
    paddingTop: RF(2),
  },
  flashSaleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: RF(16),
    marginTop: RF(24),
    marginBottom: RF(12),
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timerIcon: {
    fontSize: RF(16),
    marginRight: RF(4),
    color: '#000000',
  },
  timerText: {
    fontSize: RF(14),
    fontWeight: '600',
    color: '#000000',
  },

  youList: {
    // paddingHorizontal: RF(16),
    paddingBottom: RF(20),
  },
  youItemImage: {
    width: (width - RF(40)) / 2,
    height: RF(150),
    borderRadius: RF(8),
    marginRight: RF(8),
  },
  producttxtstyle: {
    marginTop: RF(15),
  },
  bg: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  maincontainer: {
    ...GST.FLEX,
    paddingTop: RF(15),
    paddingLeft: RF(15),
  },
  activedot: {
    backgroundColor: colors.blue,
    paddingHorizontal: RF(13),
  },
  dot: {
    backgroundColor: 'rgba(0, 66, 224, 0.2)',
  },
  slidercontainer: {
    height: isTablet ? RF(200) : RF(170),
  },
  rowstyle: {
    justifyContent: 'space-between',
  },
  con: {
    width: isTablet ? RF(195) : RF(155),
    marginLeft: RF(2),
  },
  imgcon: {
    width: '100%',
  },
  img: {
    height: isTablet ? RF(190) : RF(150),
    width: '100%',
    resizemode: 'cover',
  },
  concontainer:{
    marginTop: RF(12) 
  },
  starstyle:{
    color: colors.blue
  }
});
export default styles;
