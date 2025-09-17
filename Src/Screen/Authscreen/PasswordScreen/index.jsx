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

const PasswordScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
const email = useSelector(state => state.user.tempEmail);
const error = useSelector(state => state.user.error);
  useEffect(() => {
    if (error) {
      showErrorToast(error);  // 👈 show toast whenever error updates
    }
  }, [error]);

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

const handleLogin = async (password) => {
  setLoading(true);
  try {
    const result = await dispatch(loginWithPassword({ email, password }));

    if (result.success) {
      showSuccessToast('Login Successfully');
      setTimeout(() => {
        navigation.navigate('home');
      }, 1500);
    } else {
      showErrorToast(result.error || 'Your email or password is not correct');
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <View style={GST.FLEX}>
      {loading && <Loader />}
      <BubbleIconComponent style={{ position: 'absolute', top: 0, left: 0 }} />
      <View style={{ height: RF(300) }}>
        <ProfilePhoto title={`Hello, ${email || 'User'}!!`} />
      </View>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={PasswordSchema}
        onSubmit={values => handleLogin(values.password)}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
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
                    colors: {
                      primary: colors.blue,
                    },
                    pinCodeContainerStyle: styles.otpcontainer,
                    focusStickStyle: { height: RF(10) },
                    pinCodeTextStyle: { fontSize: RF(14) },
                    filledPinCodeContainerStyle: {
                      backgroundColor: colors.blue,
                    },
                  }}
                  onTextChange={text => setFieldValue('password', text)}
                  onFilled={text => {
                    setFieldTouched('password', true);
                    setFieldValue('password', text);
                    handleLogin(text); // ✅ call login logic when OTP filled
                  }}
                />

                {errors.password && touched.password && (
                  <Text
                    style={{ ...GST.subdescription, color: colors.red }}
                  >
                    {errors.password}
                  </Text>
                )}

                {errors.password && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}
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
