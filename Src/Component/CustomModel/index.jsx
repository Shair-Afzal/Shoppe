import { Modal, View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import LottieView from 'lottie-react-native';
import GST, { colors, RF } from '../../Constant';
import { useNavigation } from '@react-navigation/native';
import Done from "../../assets/SVG/Done.svg"
import Reviewdone from "../../assets/SVG/Reviewdone.svg"
import StarRating from 'react-native-star-rating-widget';
import { useState } from 'react';
const { width } = Dimensions.get('window');

const CustomModel = ({ visible, onClose, deltitile, txt, btn, onpress, onprogress,onsuccess,onreviewdone}) => {
  const navigation = useNavigation();
  const [rate,setrate]=useState(5)

  // safe call wrapper (minimal guard, does not change prop name)
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
        <View style={{...styles.modalContainer,paddingVertical: onsuccess?RF(30):RF(35),}}>
          <View  style={[
              styles.iconContainer,
              onprogress||onsuccess||onreviewdone? { padding: RF(5) } : null,
            ]}
          >
            {
              onprogress?
              <ActivityIndicator size={"large"} color={colors.blue}/>
            :
            onsuccess?
            <Done height={RF(45)} width={RF(45)}/>:

            onreviewdone?<Reviewdone height={RF(45)} width={RF(45)}/>:
            
            <>
            <LottieView
              source={require('../../assets/Lottie/Alert.json')}
              autoPlay
              loop
              style={{ height: RF(60), width: RF(60) }}
            
            />
            </>
}
          </View>
          {
            onsuccess||onreviewdone&&
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold', textAlign: 'center',marginTop:RF(10)}}>
              Done!
            </Text>
          }

          {onprogress && (
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold', textAlign: 'center',}}>
              Payment is in progress
            </Text>
          )}

          {deltitile && (
            <Text style={{ ...GST.description, fontFamily: 'Raleway-Bold', textAlign: 'center' }}>
              You are going to delete{'\n'}
              your account
            </Text>
          )}
          {
            onreviewdone&&(
              <Text  style={{...GST.smallesttxt,marginTop:RF(5)}}>Thank you for your review</Text>
            )
          }

          {!txt && !onprogress&&!onsuccess&&!onreviewdone? (
            <View style={styles.messageContainer}>
              <Text style={styles.messageText}>
                You reached out maximum{'\n'}
                amount of attempts.{'\n'}
                Please, try later.
              </Text>
            </View>
          ) : txt ? (
            <Text style={GST.smallesttxt}>You won't be able to restore your data</Text>
          ) : onprogress&&(
            <Text style={{...GST.smallesttxt,marginTop:RF(5)}}>Please, wait a few moments</Text>
          )}
          {
            onsuccess&&
            <Text style={{...GST.smallesttxt,marginTop:RF(5)}}>You card has been successfully charged</Text>
          }

          {!btn && !onprogress&&!onreviewdone? (
            <TouchableOpacity style={{...styles.okayButton,backgroundColor:onsuccess?colors.grey:colors.Black,paddingHorizontal:RF(15),marginTop:onsuccess&&RF(25)}} onPress={onClose} activeOpacity={0.8}>
              <Text style={[styles.okayButtonText,{color:onsuccess?colors.darkblack:colors.white,fontSize:onsuccess&&RF(14)}]}>{onsuccess?"Track My Order":"Okay"}</Text>
            </TouchableOpacity>
          ) : !onprogress &&!onreviewdone&& (
            <View style={{ ...GST.ROW, gap: RF(10), marginTop: RF(20) }}>
              <TouchableOpacity
                style={{ ...styles.okayButton, paddingHorizontal: RF(40) }}
                onPress={onClose}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ ...styles.okayButton, paddingHorizontal: RF(40), backgroundColor: '#D97474' }}
                onPress={handleDelete}
                activeOpacity={0.8}
              >
                <Text style={styles.okayButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          {
            onreviewdone&&
            <StarRating
            rating={rate}
            onChange={()=>setrate(5)}
             starSize={RF(35)}
             style={{marginTop:RF(10)}}
              enableHalfStar={false}
            enableSwiping={false}
            disabled={true} 
            />
           
          }
        </View>
      </View>
    </Modal>
  );
};

const styles = {
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

  okayButtonText: {
    fontSize: RF(16),
    color: colors.white,
    fontFamily: 'NunitoSans-Regular',
    fontWeight: '500',
    textAlign: 'center',
  },
};

export default CustomModel;
