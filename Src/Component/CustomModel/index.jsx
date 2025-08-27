import { Modal, View, Text, TouchableOpacity, Dimensions } from 'react-native';

import { Positions } from 'react-native-calendars/src/expandableCalendar';
import LottieView from 'lottie-react-native';
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const CustomModel = ({ visible, onClose, deltitile, txt, btn, onpress }) => {
  const navigation = useNavigation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={GST.MODALMAIN}>
        <View style={styles.modalContainer}>
          {/* Icon Container */}
          <View style={styles.iconContainer}>
            <LottieView
              source={require('../../assets/Lottie/Alert.json')}
              autoPlay
              loop
              style={{ height: RF(60), width: RF(60) }}
            />
          </View>
          {deltitile && (
            <Text
              style={{
                ...GST.description,
                fontFamily: 'Raleway-Bold',
                textAlign: 'center',
              }}
            >
              You are going to delete{'\n'}
              your account
            </Text>
          )}
          {!txt ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                You reached out maximum{'\n'}
                amount of attempts.{'\n'}
                Please, try later.
              </Text>
            </View>
          ) : (
            <Text style={GST.smallesttxt}>
              You won't be able to restore your data
            </Text>
          )}

          {!btn ? (
            <TouchableOpacity
              style={styles.okayButton}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text style={styles.okayButtonText}>Okay</Text>
            </TouchableOpacity>
          ) : (
            <View style={{ ...GST.ROW, gap: RF(10), marginTop: RF(20) }}>
              <TouchableOpacity
                style={{ ...styles.okayButton, paddingHorizontal: RF(40) }}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  ...styles.okayButton,
                  paddingHorizontal: RF(40),
                  backgroundColor: '#D97474',
                }}
                onPress={onpress}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Delete</Text>
              </TouchableOpacity>
              :
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = {
  modalContainer: {
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(20),
    paddingVertical: RF(35),
    paddingHorizontal: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    maxWidth: 400,
    minWidth: 280,
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },

  iconContainer: {
    // marginBottom: RF(25),
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: RF(-30),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
  },

  iconCircle: {
    width: RF(60),
    height: RF(60),
    borderRadius: RF(30),
    backgroundColor: colors.lightpink,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.pink,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },

  exclamationIcon: {
    fontSize: RF(28),
    fontWeight: 'bold',
    color: colors.pink,
    textAlign: 'center',
    lineHeight: RF(32),
  },

  messageContainer: {
    marginBottom: RF(30),
    alignItems: 'center',
  },

  messageText: {
    fontSize: RF(16),
    color: colors.darkblack,
    fontFamily: 'NunitoSans-Regular',
    textAlign: 'center',
  },

  okayButton: {
    backgroundColor: colors.darkblack,
    paddingVertical: RF(10),
    paddingHorizontal: RF(50),
    borderRadius: RF(14),
    minWidth: RF(120),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },

  okayButtonText: {
    fontSize: RF(16),
    color: colors.white,
    fontFamily: 'NunitoSans-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
};

export default CustomModel;
