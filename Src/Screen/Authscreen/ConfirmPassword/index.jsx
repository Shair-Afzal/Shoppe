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
import { ConfirmPasswordSchema, PasswordSchema } from '../../../utils/Schema';
import CustomInput from '../../../Component/Custominput';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { object } from 'yup';
const ConfirmPassword = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
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
  const [keyboardVisible, setKeyboardVisible] = useState(false);

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

  
  const cancelsumbit = () => {
    navigation.goBack();
  };
  return (
    <KeyboardAvoidingView
      style={GST.FLEX}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {loading&&
      <Loader/>
      }
      
      <View style={GST.FLEX}>
        <View style={{ height: RF(140) }}>
          <RightBubble style={styles.bg} />
        </View>

        <ProfilePhoto
          style={{ position: 'relative' }}
          title={'Setup New Password'}
        />
        {!keyboardVisible && (
          <Text style={styles.txt}>
            {'Please, setup a new password for\nyou account'}
          </Text>
        )}
        <Formik
          initialValues={ConfirmPasswordSchema}
          validationSchema={ConfirmPasswordSchema}
          onSubmit={()=>{setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showSuccessToast('Password changed succcesfully');
      setTimeout(() => {
        navigation.navigate('OnBonding');
      }, 1500);
    }, 1500);}}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <FormObserver errors={errors} touched={touched} />
              <View style={styles.inputcontainer}>
                <CustomInput
                  placeholder={'New Password'}
                  inputStyle={styles.inputStyle}
                  containerStyle={{ borderRadius: RF(5) }}
                  secureTextEntry={true}
                  onChangeText={handleChange('newPassword')}
                  onBlur={handleBlur('newPassword')}
                  value={values.newPassword}
                />
                
                <CustomInput
                  placeholder={'Repeat Password'}
                  inputStyle={styles.inputStyle}
                  containerStyle={{ borderRadius: RF(5) }}
                  secureTextEntry={true}
                  onChangeText={handleChange('repeatPassword')}
                  onBlur={handleBlur('repeatPassword')}
                  value={values.repeatPassword}
                />
               
              </View>

              {!keyboardVisible && (
                <BotttomButtons
                  onPress={() => handleSubmit()}
                  arrowpress={() => cancelsumbit()}
                  btnTitle={'Save'}
                  containerStyle={{ paddingHorizontal: RF(20) }}
                />
              )}
            </>
          )}
        </Formik>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ConfirmPassword;
