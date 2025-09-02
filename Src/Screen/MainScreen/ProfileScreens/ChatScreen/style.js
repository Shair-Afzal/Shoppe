import { StyleSheet } from "react-native";
import GST, { colors, fontSize, RF } from "../../../../Constant";

const styles = StyleSheet.create({
  main: {
    paddingHorizontal: 0,
  },
  headerContainer: {
    gap: RF(10),
    alignItems: 'center',
    paddingHorizontal: RF(15),
  },
  iconWrapper: {
    height: RF(60),
    width: RF(60),
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(100),
    padding: RF(5),
    elevation: 5,
  },
  iconInner: {
    backgroundColor: colors.lightblue,
    height: '100%',
    width: '100%',
    borderRadius: RF(100),
  },
  headerTitle: {
    color: colors.blue,
  },
  bodyContainer: {
    backgroundColor: colors.white,
    marginTop: RF(10),
    padding: RF(15),
  },

  /** Chat Messages */
  messageList: {
    paddingBottom: RF(80),
  },
  messageBubble: {
    padding: RF(10),
    borderRadius: RF(12),
    marginVertical: RF(4),
    maxWidth: '70%',
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.blue,
  },
  botBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.DarkWhite,
  },
  userText: {
    color: colors.DarkWhite,
  },
  botText: {
    color: colors.black,
  },

  /** Bottom Sheet */
  bottomSheetWrapper: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    left: RF(15),
  },
  bottomSheetHeader: {
    backgroundColor: colors.lightblue,
    padding: RF(15),
    width: '100%',
    paddingVertical: RF(25),
    borderTopLeftRadius: RF(10),
    borderTopRightRadius: RF(10),
  },
  bottomSheetTitle: {
    fontFamily: 'Raleway-Bold',
  },
  bottomSheetBody: {
    backgroundColor: colors.DarkWhite,
    padding: RF(15),
    paddingVertical: RF(10),
    height: RF(300),
  },
  issueButton: {
    alignSelf: 'flex-start',
    padding: RF(10),
    borderRadius: RF(10),
    borderWidth: 1,
    borderColor: colors.blue,
    marginTop: RF(5),
  },
  issueRow: {
    gap: RF(5),
  },
  issueText: {
    fontSize: RF(12),
  },
  bottomActions: {
    ...GST.CENTERCONTAINER,
    position: 'absolute',
    bottom: RF(5),
    left: RF(15),
    backgroundColor:colors.DarkWhite
  },
  nextButton: {
    paddingVertical: RF(14),
    width: '85%',
  },

  /** Input Section */
  inputWrapper: {
    ...GST.CENTERCONTAINER,
    position: "absolute",
    bottom: RF(10),
    left: 0,
    right: 0,
    paddingHorizontal: RF(10),
  },
  inputContainer: {
    width: "70%",
    paddingVertical: RF(2),
  },
  sendButton: {
    alignSelf: 'flex-end',
    marginTop: RF(10),
    backgroundColor: colors.blue,
    paddingHorizontal: RF(15),
    paddingVertical: RF(15),
    borderRadius: RF(10),
  },
  sendButtonText: {
    color: colors.DarkWhite,
  },
    flatlistContainer: {
      paddingBottom: RF(20),
    },
    card: {
      marginTop: RF(10),
      width: '100%',
    },
    catImg: {
      height: RF(40),
      width: '48%',
      resizemode: 'cover',
    },
    catStyle: {
      width: '30%',
    },
  
    detailsContainer: {
      height: RF(90),
      width: '67%',
    },
    orderInfo: {
      justifyContent: 'space-between',
      height: '100%',
      width: '100%',
    },
    orderRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
    },
    orderLeft: {
      width: '60%',
    },
    orderNumber: {
      fontFamily: 'Raleway-Bold',
      fontSize: RF(14),
      color: colors.Black,
    },
    shippedText: {
      fontFamily: 'Raleway-Bold',
      color: colors.Black,
    },
  
    itemBox: {
      padding: RF(6),
      backgroundColor: colors.lightblue,
      borderRadius: RF(5),
      alignSelf: 'flex-end',
    },
    itemText: {
      fontSize: fontSize.regSmall,
    },
  
    trackBtn: {
      padding: RF(8),
      width: '40%',
      borderRadius: RF(10),
      borderColor: colors.blue,
      justifyContent: 'center',
      alignItems: 'center',
    },
    trackBtnTrack: {
      backgroundColor: colors.blue,
      borderWidth: 0,
    },
    trackBtnReview: {
      backgroundColor: colors.DarkWhite,
      borderWidth: 1,
    },
    trackText: {
      color: colors.DarkWhite,
    },
    reviewText: {
      color: colors.blue,
    },
  
});

export default styles;
