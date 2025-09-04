import { Modal, View, Text, TouchableOpacity, Dimensions, ActivityIndicator, StyleSheet } from 'react-native';
import LottieView from 'lottie-react-native';
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';
import Done from "../../assets/SVG/Done.svg"
import Reviewdone from "../../assets/SVG/Reviewdone.svg"
import StarRating from 'react-native-star-rating-widget';
import { useState } from 'react';
const { width } = Dimensions.get('window');

const CustomModel = ({ visible, onClose, deltitile, txt, btn, onpress, onprogress, onsuccess, onreviewdone }) => {
  const navigation = useNavigation();
  const [rate, setrate] = useState(5)

  const handleDelete = () => {
    if (typeof onpress === 'function') {
      onpress();
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}
    >
      <View style={GST.MODALMAIN}>
        <View style={[styles.modalContainer, { paddingVertical: onsuccess ? RF(30) : RF(35) }]}>
          <View style={[
            styles.iconContainer,
            onprogress || onsuccess || onreviewdone ? styles.iconContainerActive : null,
          ]}>
            {onprogress ? (
              <ActivityIndicator size={"large"} color={colors.blue} />
            ) : onsuccess ? (
              <Done height={RF(45)} width={RF(45)} />
            ) : onreviewdone ? (
              <Reviewdone height={RF(45)} width={RF(45)} />
            ) : (
              <LottieView
                source={require('../../assets/Lottie/Alert.json')}
                autoPlay
                loop
                style={styles.lottieIcon}
              />
            )}
          </View>

          {(onsuccess || onreviewdone) && (
            <Text style={styles.doneText}>Done!</Text>
          )}

          {onprogress && (
            <Text style={styles.progressText}>Payment is in progress</Text>
          )}

          {deltitile && (
            <Text style={styles.deleteText}>
              You are going to delete{'\n'}your account
            </Text>
          )}

          {onreviewdone && (
            <Text style={styles.reviewDoneText}>Thank you for your review</Text>
          )}

          {!txt && !onprogress && !onsuccess && !onreviewdone ? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                You reached out maximum{'\n'}
                amount of attempts.{'\n'}
                Please, try later.
              </Text>
            </View>
          ) : txt ? (
            <Text style={GST.smallesttxt}>You won't be able to restore your data</Text>
          ) : onprogress && (
            <Text style={styles.waitText}>Please, wait a few moments</Text>
          )}

          {onsuccess && (
            <Text style={styles.successText}>You card has been successfully charged</Text>
          )}

          {!btn && !onprogress && !onreviewdone ? (
            <TouchableOpacity
              style={[
                styles.okayButton,
                onsuccess ? styles.okayButtonSuccess : styles.okayButtonDefault,
              ]}
              onPress={onClose}
              activeOpacity={0.8}
            >
              <Text
                style={[
                  styles.okayButtonText,
                  onsuccess ? styles.okayButtonTextSuccess : styles.okayButtonTextDefault,
                ]}
              >
                {onsuccess ? "Track My Order" : "Okay"}
              </Text>
            </TouchableOpacity>
          ) : !onprogress && !onreviewdone && (
            <View style={styles.actionRow}>
              <TouchableOpacity
                style={[styles.okayButton, styles.cancelButton]}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.okayButton, styles.deleteButton]}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}

          {onreviewdone && (
            <StarRating
              rating={rate}
              onChange={() => setrate(5)}
              starSize={RF(35)}
              style={styles.starRating}
              enableHalfStar={false}
              enableSwiping={false}
              disabled={true}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: colors.DarkWhite,
    borderRadius: RF(10),
    paddingHorizontal: RF(30),
    alignItems: 'center',
    justifyContent: 'center',
    width: width * 0.85,
    maxWidth: 400,
    minWidth: 280,
    shadowColor: colors.Black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: RF(-30),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
    borderRadius: RF(100),
  },
  iconContainerActive: {
    padding: RF(5),
  },
  lottieIcon: {
    height: RF(60),
    width: RF(60),
  },
  doneText: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
    marginTop: RF(10),
  },
  progressText: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
  deleteText: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    textAlign: 'center',
  },
  reviewDoneText: {
    ...GST.smallesttxt,
    marginTop: RF(5),
  },
  waitText: {
    ...GST.smallesttxt,
    marginTop: RF(5),
  },
  successText: {
    ...GST.smallesttxt,
    marginTop: RF(5),
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
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  okayButtonDefault: {
    backgroundColor: colors.Black,
    marginTop: 0,
  },
  okayButtonSuccess: {
    backgroundColor: colors.grey,
    paddingHorizontal: RF(15),
    marginTop: RF(25),
  },
  okayButtonText: {
    fontSize: RF(16),
    fontFamily: 'NunitoSans-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
  okayButtonTextDefault: {
    color: colors.white,
    fontSize: RF(16),
  },
  okayButtonTextSuccess: {
    color: colors.darkblack,
    fontSize: RF(14),
  },
  actionRow: {
    ...GST.ROW,
    gap: RF(10),
    marginTop: RF(20),
  },
  cancelButton: {
    paddingHorizontal: RF(40),
  },
  deleteButton: {
    paddingHorizontal: RF(40),
    backgroundColor: '#D97474',
  },
  starRating: {
    marginTop: RF(10),
  },
});

export default CustomModel;
