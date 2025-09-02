import { StyleSheet } from 'react-native';
import { RF, colors } from '../../../../Constant';

export default StyleSheet.create({
  tabContainer: {
    marginTop: RF(15),
  },
  tabButton: {
    padding: RF(5),
    borderRadius: RF(20),
    paddingHorizontal: RF(30),
  },
  tabButtonAlt: {
    padding: RF(5),
    paddingHorizontal: RF(45),
    borderRadius: RF(20),
  },
  tabText: {
    fontSize: RF(12),
  },
  ticketWrapper: {
    marginTop: RF(15),
  },
  ticketHeader: {
    width: '94%',
    padding: RF(5),
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    alignSelf: 'center',
  },
  ticketHeaderText: {
    color: colors.blue,
    fontFamily: 'Raleway-Bold',
  },
  ticketRow: {
    gap: RF(8),
    marginTop: RF(10),
    marginLeft: RF(20),
  },
  ticketTitle: {
    fontFamily: 'Raleway-Bold',
  },
  ticketFooter: {
    width: '97%',
    padding: RF(2),
    paddingHorizontal: RF(15),
  },
  collectButton: {
    width: '30%',
    backgroundColor: colors.blue,
    padding: RF(8),
    borderRadius: RF(10),
  },
  collectText: {
    color: colors.DarkWhite,
  },
  progressColumn: {
    justifyContent: 'space-between',
  },
  progressList: {
    alignSelf: 'center',
    gap: RF(10),
    marginTop: RF(10),
    width: '100%',
  },
  progressItem: {
    gap: RF(10),
  },
  progressCircleWrapper: {
    height: RF(80),
    width: RF(80),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
    padding: RF(4),
    marginTop: RF(20),
  },
  progressCircle: {
    borderWidth: 2,
    height: '100%',
    width: '100%',
    borderRadius: RF(100),
    borderColor: colors.blue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkIcon: {
    position: 'absolute',
    top: 2,
    right: 0,
  },
  progressTitle: {
    fontFamily: 'Raleway-Bold',
  },
  progressDesc: {
    maxWidth: RF(150),
    fontSize: RF(12),
  },
});
