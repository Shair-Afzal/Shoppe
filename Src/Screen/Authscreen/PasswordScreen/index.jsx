import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import ProfilePhoto from '../../../Component/Profilephoto';
import { OtpInput } from 'react-native-otp-entry';
import styles from './style';
import Arrowbtn from '../../../assets/SVG/Arrowbtn.svg';
import { PasswordSchema } from '../../../utils/Schema';
import { Formik } from 'formik';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPassword } from '../../../Redux/slices/userslice';
import { LoginUser } from '../../../Redux/slices/Action/Authaction';

const PasswordScreen = ({ navigation,route }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
const {loading,error,user,accesstoken}=useSelector(state=>state.user)
  const dispatch = useDispatch();
  const {email}=route.params

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
    <View style={GST.FLEX}>
      {loading && <Loader />}
      <BubbleIconComponent style={{ position: 'absolute', top: 0, left: 0 }} />
      <View style={{ height: RF(300) }}>
        <ProfilePhoto title={`Hello, ${email.email}`} />
      </View>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={PasswordSchema}
        onSubmit={async (values) =>{
          try {
            await dispatch(LoginUser({email:email.email,password:values.password})).unwrap()
            showSuccessToast("User Login suucessfully")
          } catch(err){
            showErrorToast(err)
          }
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
          validateForm
        }) => (
          <>
            <View style={styles.container}>
              <Text style={GST.subdescription}>Type your password</Text>

              <View style={styles.otpwarapper}>
             <OtpInput
  numberOfDigits={8}
  focusColor={colors.blue}
  secureTextEntry={true}
  type="alphanumeric"
  blurOnFilled={true}
  autoFocus={true}
  theme={{
    colors: { primary: colors.blue },
    pinCodeContainerStyle: styles.otpcontainer,
    focusStickStyle: { height: RF(10) },
    pinCodeTextStyle: { fontSize: RF(14) },
    filledPinCodeContainerStyle: { backgroundColor: colors.blue },
  }}
  onTextChange={text => setFieldValue('password', text)}
  onFilled={(text) => {
  setFieldValue('password', text);

  setTimeout(() => {
    handleSubmit();
  }, 100);
}}

/>

                {errors.password && touched.password  && (
                  <Text
                    style={{ ...GST.subdescription, color: colors.red }}
                  >
                    {errors.password}
                  </Text>
                )}

                {errors.password && touched.password || error &&(
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword',{email:email.email})}
                    activeOpacity={0.7}
                    style={styles.forgetcon}
                  >
                    <Text style={styles.forgettxt}>Forget Password</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
      </Formik>

      {!keyboardVisible && (
        <View style={styles.rowcontainer}>
          <Text style={GST.subdescription}>Not you?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Arrowbtn height={RF(30)} width={RF(30)} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default PasswordScreen;
