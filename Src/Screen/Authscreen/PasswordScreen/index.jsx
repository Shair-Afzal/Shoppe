import { View, Text, TouchableOpacity, Keyboard } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import ProfilePhoto from '../../../Component/Profilephoto';
import { OtpInput } from 'react-native-otp-entry';
import styles from './style';
import Arrowbtn from '../../../assets/SVG/Arrowbtn.svg';
import { otpSchema, PasswordSchema } from '../../../utils/Schema';
import { Formik } from 'formik';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { loginWithPassword } from '../../../Redux/slices/userslice';
const PasswordScreen = ({ navigation }) => {
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const email = useSelector(state => state.user.user);
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
        <ProfilePhoto title={'Hello, Romina!!'} />
      </View>
      <Formik
        initialValues={{ password: '' }}
        validationSchema={PasswordSchema}
        onSubmit={values => {
          // try {
          //   dispatch(loginWithPassword(values));
          //   setLoading(true);
          //   setTimeout(() => {
          //     setLoading(false);
          //     showSuccessToast('Login Successfully');
          //     setTimeout(() => {
          //       navigation.navigate('ForgetPassword');
          //     }, 1500);
          //   }, 1500);
          // } catch (err) {
          //   showErrorToast(err);
          console.log(values)
          // }
        }}
      >
        {({
          handleSubmit,
          errors,
          touched,
          setFieldValue,
          setFieldTouched,
        }) => (
          <>
            <FormObserver errors={errors} touched={touched} />

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
                    try {
                      dispatch(loginWithPassword(text));
                      setLoading(true);
                      setFieldTouched('password', true);
                      setFieldValue('password', text);

                      setTimeout(() => {
                        setLoading(false);
                        showSuccessToast('Login Successfully');
                        setTimeout(() => {
                          navigation.navigate('ForgetPassword');
                        }, 1500);
                      }, 1500);
                    } catch (err) {
                      showErrorToast('your email and password is not correct');
                      console.log('hi', email);
                    }
                  }}
                />

                {errors.password && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}
                    activeOpacity={0.7}
                    style={{ marginTop: RF(10) }}
                  >
                    <Text style={{ ...GST.subdescription, textAlign: 'right' }}>
                      Forget Password
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </>
        )}
      </Formik>
      {!keyboardVisible && (
        <View style={styles.rowcontainer}>
          <Text>Not you?</Text>
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
