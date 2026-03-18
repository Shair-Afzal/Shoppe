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
import { ConfirmPasswordSchema, ConfirmPasswordvalues, PasswordSchema } from '../../../utils/Schema';
import CustomInput from '../../../Component/Custominput';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { object } from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgetpassword } from '../../../Redux/slices/userslice';
import { ResetPassword } from '../../../Redux/slices/Action/Authaction';
const ConfirmPassword = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const {loading,error,resetToken}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  

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
          initialValues={ConfirmPasswordvalues}
          validationSchema={ConfirmPasswordSchema}
          onSubmit={async (values)=>{
            console.log("resetToken",resetToken)
            try{
              const res=await dispatch(ResetPassword({password:values.password,confirmpassword:values.confirmpassword,resetToken:resetToken}))
              if(res?.meta?.requestStatus === "fulfilled"){
                showSuccessToast("You password is Updated")
                navigation.navigate('Login')
                return res.data
              }
            }catch(err){
              showErrorToast(err.message)

            }
          }}
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
             
              <View style={styles.inputcontainer}>
                <CustomInput
                  placeholder={'New Password'}
                  inputStyle={styles.inputStyle}
                  containerStyle={{ borderRadius: RF(5) }}
                  secureTextEntry={true}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />
                {
                  errors.password&&touched.password&&(
                    <Text style={{...GST.subdescription,color:colors.red}}>{errors.password}</Text>
                  )
                }
                
                <CustomInput
                  placeholder={'Repeat Password'}
                  inputStyle={styles.inputStyle}
                  containerStyle={{ borderRadius: RF(5) }}
                  secureTextEntry={true}
                  onChangeText={handleChange('confirmpassword')}
                  onBlur={handleBlur('confirmpassword')}
                  value={values.confirmpassword}
                />
                {
                  errors.confirmpassword&&touched.confirmpassword&&(
                    <Text style={{...GST.subdescription,color:colors.red}}>{errors.confirmpassword}</Text>
                  )
                }
               
              </View>

              {!keyboardVisible && (
                <BotttomButtons
                  onPress={handleSubmit}
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
