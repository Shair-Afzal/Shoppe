import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import Buble from '../../../assets/SVG/Buble.svg';
import ProfilePhoto from '../../../Component/Profilephoto';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import RightBubble from '../../../Component/RightBubblecomponent';
import { Image } from 'react-native-svg';
import Check from '../../../assets/SVG/Check.svg';
import BotttomButtons from '../../../Component/BottomButtonContainer';
import styles from './style';
import { OtpInput } from 'react-native-otp-entry';
import { Formik } from 'formik';
import CustomOtpInput from '../../../Component/OtpInput/index.';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { otpSchema, PasswordSchema } from '../../../utils/Schema';
import Loader from '../../../Component/Loader/Loader';
import CustomButton from '../../../Component/Custombutton';
import CustomModel from '../../../Component/CustomModel';
const ForgetPassword = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const formikRef = useRef();
  const [loading, setLoading] = useState(false);
  const [showmodel,setmodel]=useState(false)
  const FormObserver = ({ errors, touched }) => {
    useEffect(() => {
      const firstErrorKey = Object.keys(errors).find(
        key => touched[key] && errors[key],
      );

      if (firstErrorKey) {
        showErrorToast(errors[firstErrorKey]);
      }
    }, [errors, touched]);

    return null;
  };
  const [selectedOption, setSelectedOption] = useState('SMS');
  const [count, setcount] = useState(0);
  const Submit = () => {
    if (selectedOption === 'SMS') {
      setcount(count + 1);
      if(count==1){
        setmodel(true)
      }
    } else if (selectedOption === 'Email') {
      navigation.navigate('ConfirmPassword');
      setcount(0);
      
    }
    formikRef.current.submitForm();
  };
  const cancelsumbit = () => {
    if (count > 0) {
      setcount(count - 1);
    } else {
      navigation.goBack();
    }
  };
   useEffect(() => {
      const show = Keyboard.addListener('keyboardDidShow', () =>
        setKeyboardVisible(true),
      );
      const hide = Keyboard.addListener('keyboardDidHide', () =>
        setKeyboardVisible(false),
      );
      return () => {
        show.remove();
        hide.remove();
      };
    }, []);
    
  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ password: '' }}
      validationSchema={otpSchema}
      onSubmit={values => {
        console.log('Password Entered:', values.password);
        // Navigate or authenticate
        // navigation.navigate("Home"); // Change to your next screen
      }}
    >
      {({ handleSubmit, errors, touched, setFieldValue, setFieldTouched }) => (
        <KeyboardAvoidingView
          style={GST.FLEX}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          // keyboardVerticalOffset={Platform.OS === "ios" ? 0 : RF(20)}
        >
          <CustomModel visible={showmodel} onClose={()=>setmodel(false)}/>
          {loading && <Loader />}
          <FormObserver errors={errors} touched={touched} />
          <View style={GST.FLEX}>
            <View style={{ height: RF(140) }}>
              <RightBubble style={styles.bg} />
            </View>
            <ProfilePhoto
              style={{ position: 'relative' }}
              title={'Password Recovery'}
            />
            <Text style={styles.txt}>
              {count == 0
                ? 'How you would like to restore\n your password?'
                : 'Enter 4-digits code we sent you on your phone number'}
            </Text>
            {count == 0 ? (
              <View style={styles.btncontainer}>
                <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setSelectedOption('SMS')}
                >
                  <View style={GST.ROW}>
                    <Text style={styles.smstxt}>SMS</Text>
                    {selectedOption === 'SMS' ? (
                      <Check
                        height={RF(20)}
                        width={RF(20)}
                        style={{ left: RF(25) }}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.escape}
                      ></TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ ...styles.btn, backgroundColor: colors.lightpink }}
                  onPress={() => setSelectedOption('Email')}
                >
                  <View style={GST.ROW}>
                    <Text style={styles.emailtxt}>Email</Text>
                    {selectedOption === 'Email' ? (
                      <Check
                        height={RF(20)}
                        width={RF(20)}
                        style={{ left: RF(25) }}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.escape}
                      ></TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <Text style={{ ...GST.description, textAlign: 'center' }}>
                  +98*******00
                </Text>

                <View style={styles.otpwarapper}>
                  <OtpInput
                    numberOfDigits={4}
                    focusColor={colors.blue}
                    secureTextEntry={true}
                    type="numeric"
                    blurOnFilled={true}
                    autoFocus={true}
                    theme={{
                      colors: {
                        primary: colors.blue,
                      },
                      pinCodeContainerStyle: styles.otpcontainer,
                      focusStickStyle: { height: RF(10) },
                      pinCodeTextStyle: { fontSize: RF(14) },
                    }}
                    onTextChange={text => setFieldValue('password', text)}
                    onFilled={text => {
                      if (text.trim() === '2234') {
                        setLoading(true);
                        setTimeout(() => {
                          setLoading(false);
                          showSuccessToast('OTP verified successfully');
                          setTimeout(() => {
                            navigation.navigate('ConfirmPassword');
                          }, 1500);
                        }, 1500);
                      } else {
                        setFieldTouched('password', true);
                        setFieldValue('password', text);
                      }
                    }}
                  />
                </View>
                {errors.password && touched.password && (
                  <Text style={[GST.subdescription, styles.errortxt]}>
                    {errors.password}
                  </Text>
                )}
              </>
            )}
            {
              !keyboardVisible&&
            
            <BotttomButtons
              onPress={() => Submit()}
              arrowpress={() => cancelsumbit()}
              btnTitle={count === 0 ? 'Next' : 'Send Again'}
              containerStyle={{ paddingHorizontal: RF(20) }}
              btnStyle={count > 0 && styles.custombtn}
            />
}
          </View>
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ForgetPassword;
