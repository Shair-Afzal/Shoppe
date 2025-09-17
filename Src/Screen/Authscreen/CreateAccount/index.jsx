import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, IS_TABLET, RF } from '../../../Constant';
import Bubbles from '../../../assets/SVG/Bubbles.svg';
import Cameraicon from '../../../assets/SVG/Cameraicon.svg';
import styles from './style';
import CustomInput from '../../../Component/Custominput';
import PhoneInputComponent from '../../../Component/PhoneInputComponent';
import CustomButton from '../../../Component/Custombutton';
import { initialValues, userSchema } from '../../../utils/Schema';
import { Formik } from 'formik';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../../Redux/slices/userslice';
import Google from '../../../assets/SVG/Google.svg';
import Apple from '../../../assets/SVG/Apple.svg';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { setUser, setError } from '../../../Redux/slices/userslice';
import { Alert } from 'react-native';

// Configure Google Sign-In with the new webClientId from the provided JSON
GoogleSignin.configure({
  webClientId:
    '576309715513-5ku286iecnak68uubaldoej8daup5rp7.apps.googleusercontent.com',
  offlineAccess: true,
});

const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(true);
  const user = useSelector(state => state.user);
  const error = useSelector(state => state.user.error);

  const handleGoogleSignIn = async () => {
    try {
      console.log('Checking Play Services...');
      const hasPlayServices = await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true,
      });

      if (!hasPlayServices) {
        Alert.alert(
          'Error',
          'Google Play Services is not available on this device.',
        );
        return;
      }

      console.log('Attempting Google sign-in...');
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User info:', userInfo);

      console.log('Getting ID token...');
      const { idToken } = await GoogleSignin.getTokens();
      console.log('ID token received:', !!idToken);

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign in with Firebase
      const userCredential = await auth().signInWithCredential(
        googleCredential,
      );
      console.log('Firebase user:', userCredential.user);

      // Dispatch user to Redux store
      dispatch(
        setUser({
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          displayName: userCredential.user.displayName,
        }),
      );

      showSuccessToast('Google Sign-In successful');
      navigation.navigate('Home'); // Or your desired screen
    } catch (err) {
      console.log('Full error object:', JSON.stringify(err, null, 2));
      console.log('Error code:', err.code);
      console.log('Error message:', err.message);

      const errorMsg = err.code
        ? `${err.code}: ${err.message}`
        : JSON.stringify(err);

      dispatch(setError(errorMsg));
      Alert.alert('Error', errorMsg);
    }
  };

  return (
    <View style={GST.FLEX}>
      <ScrollView
        contentContainerStyle={GST.FLEXGROW}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        {loading && <Loader />}
        <View style={styles.container}>
          <Bubbles
            width="100%"
            height={IS_TABLET ? RF(360) : RF(300)}
            preserveAspectRatio="xMidYMid slice"
          />

          <Text style={styles.txt}>
            Create {'\n'}
            Account
          </Text>
          <View style={styles.innercontainer}>
            <Cameraicon height={RF(70)} width={RF(70)} />
            <Formik
              initialValues={initialValues}
              validationSchema={userSchema}
              onSubmit={async values => {
                setLoading(true);
                try {
                  const res = await dispatch(
                    createAccount({
                      email: values.email,
                      password: values.password,
                    }),
                  );

                  setLoading(false);

                  if (res.payload?.success) {
                    showSuccessToast('Account Created successfully');
                    navigation.navigate('Login');
                  } else {
                    showErrorToast(error);
                  }
                } catch (err) {
                  setLoading(false);
                  showErrorToast(err.message);
                }
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                values,
                errors,
                touched,
              }) => {
                return (
                  <View style={styles.inputwrapper}>
                    <CustomInput
                      placeholder={'Email'}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                      containerStyle={{ paddingVertical: RF(2) }}
                    />
                    {errors.email && touched.email && (
                      <Text
                        style={{ ...GST.subdescription, color: colors.red }}
                      >
                        {errors.email}
                      </Text>
                    )}

                    <CustomInput
                      placeholder={'Password'}
                      rightIcon
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={show}
                      eyepress={() => setshow(!show)}
                      containerStyle={{ paddingVertical: RF(2) }}
                    />
                    {errors.password && touched.password && (
                      <Text
                        style={{ ...GST.subdescription, color: colors.red }}
                      >
                        {errors.password}
                      </Text>
                    )}

                    <PhoneInputComponent
                      value={values.phone}
                      onChangeText={text => {
                        handleChange('phone')(text);
                      }}
                      onChangeFormattedText={formattedText => {
                        setFieldValue('phone', formattedText);
                      }}
                      onChangeCountry={country => {
                        setFieldValue(
                          'countryCode',
                          country.cca2.toUpperCase(),
                        );
                      }}
                    />
                    {errors.phone && touched.phone && (
                      <Text
                        style={{ ...GST.subdescription, color: colors.red }}
                      >
                        {errors.phone}
                      </Text>
                    )}
                    {errors.countryCode && touched.countryCode && (
                      <Text
                        style={{ ...GST.subdescription, color: colors.red }}
                      >
                        {errors.countryCode}
                      </Text>
                    )}

                    <CustomButton
                      btnTitle={'Done'}
                      onPress={handleSubmit}
                      style={{ marginTop: RF(60) }}
                    />
                    <TouchableOpacity
                      style={styles.cancelbtn}
                      onPress={() => navigation.goBack()}
                    >
                      <Text style={GST.subdescription}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                );
              }}
            </Formik>
            <View style={styles.gacontainer}>
              <TouchableOpacity
                style={styles.googleapplebtn}
                onPress={handleGoogleSignIn}
              >
                <Google heigh={RF(25)} width={RF(25)} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.googleapplebtn}>
                <Apple heigh={RF(25)} width={RF(25)} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;