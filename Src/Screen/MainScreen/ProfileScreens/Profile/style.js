import { StyleSheet } from 'react-native';
import GST, { colors, IS_TABLET, RF } from '../../../../Constant';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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

  announcementCard: {
    backgroundColor: colors.grey,
    borderRadius: RF(10),
    padding: RF(16),
  },

  announcementTitle: {
    fontSize: RF(16),
    fontWeight: '600',
    color: '#333333',
    marginBottom: RF(8),
  },
  announcementText: {
    fontSize: RF(14),
    color: '#666666',
    lineHeight: RF(20),
  },

  recentlyViewed: {
    flexDirection: 'row',
    gap: RF(12),
  },

  ordersContainer: {
    ...GST.CENTERCONTAINER,
    // gap: RF(15),
    marginBottom: RF(10),
  },
  orderButton: {
    backgroundColor: 'rgba(229, 235, 252, 1)',
    padding: RF(8),
    borderRadius: RF(100),

    width:"30%",
    justifyContent:"center",
    alignItems:"center"
  
  },
  orderButtonText: {
    fontSize: RF(14),
    color: '#4A90E2',
    fontWeight: '500',
  },
  notificationDot: {
    position: 'absolute',
    top: RF(-4),
    right: RF(-4),
    width: RF(12),
    height: RF(12),
    backgroundColor: '#00C851',
    borderRadius: RF(6),
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  storiesContainer: {
    paddingLeft: RF(20),
    marginBottom: RF(20),
  },
  storyCard: {
    width: RF(120),
    height: RF(200),
    borderRadius: RF(12),
    marginRight: RF(12),
    overflow: 'hidden',
    position: 'relative',
  },
  liveIndicator: {
    position: 'absolute',
    top: RF(12),
    left: RF(12),
    backgroundColor: '#FF4444',
    paddingHorizontal: RF(8),
    paddingVertical: RF(4),
    borderRadius: RF(4),
    zIndex: 1,
  },
  liveText: {
    color: '#FFFFFF',
    fontSize: RF(10),
    fontWeight: '600',
  },
  storyImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  playButton: {
    position: 'absolute',
    bottom: RF(12),
    left: RF(12),
    width: RF(32),
    height: RF(32),
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: RF(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  playIcon: {
    width: 0,
    height: 0,
    borderLeftWidth: RF(8),
    borderTopWidth: RF(6),
    borderBottomWidth: RF(6),
    borderLeftColor: '#333333',
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    marginLeft: RF(2),
  },
  sectionTitle: {
    fontSize: RF(20),
    color: colors.darkblack,
    fontFamily: 'Raleway-Bold',
  },
  rightcontainer: {
    paddingRight: RF(15),
  },
  rowcontainer: {
    justifyContent: 'space-between',
    paddingRight: RF(1),
  },
  con: {
    width: "49%",
    // marginLeft: RF(2),
  },
  conimg: {
    height: IS_TABLET ? RF(190) : RF(150),
    width: '100%',
    resizemode: 'cover',
  },
  headercontainer: {
    paddingHorizontal: RF(15),
    gap: RF(12),
  },
});
export default styles;
