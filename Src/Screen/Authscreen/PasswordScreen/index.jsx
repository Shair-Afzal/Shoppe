import { View, Text, TouchableOpacity } from 'react-native';
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
const PasswordScreen = ({ navigation }) => {
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
        onSubmit={values => {}}
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
                  }}
                  onTextChange={text => setFieldValue('password', text)}
                  onFilled={text => {
                    if (text.trim() === '2234') {
                      setLoading(true);
                      setTimeout(() => {
                        setLoading(false);
                        showSuccessToast('Login Successfully');
                        setTimeout(() => {
                          navigation.navigate('ForgetPassword');
                        }, 1500);
                      }, 1500);
                    } else {
                      setFieldTouched('password', true);
                      setFieldValue('password', text);
                    }
                  }}
                />

                {errors.password && (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgetPassword')}
                    activeOpacity={0.7}
                    style={{ marginTop: RF(7) }}
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

      <View style={styles.rowcontainer}>
        <Text>Not you?</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
          activeOpacity={0.7}
        >
          <Arrowbtn height={RF(30)} width={RF(30)} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordScreen;
