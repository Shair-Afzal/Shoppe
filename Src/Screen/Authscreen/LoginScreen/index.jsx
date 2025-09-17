import {
  View,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import Curveicon from '../../../assets/SVG/Curveicon.svg';
import Heart from '../../../assets/SVG/Heart.svg';
import CustomInput from '../../../Component/Custominput';
import CustomButton from '../../../Component/Custombutton';
import styles from './style';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import { LoginSchema } from '../../../utils/Schema';
import { Formik } from 'formik';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { useDispatch } from 'react-redux';
import { setLoginEmail } from '../../../Redux/slices/userslice';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const insets = useSafeAreaInsets();

 
  const handleLogin = async (email) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      dispatch(setLoginEmail(email));
      showSuccessToast('Email is  valid!');
      navigation.navigate('Password');
    } catch (error) {
      showErrorToast('Something went wrong, try again!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ ...GST.FLEX, paddingBottom: insets.bottom }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <KeyboardAvoidingView
        style={GST.FLEX}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        {loading && <Loader />}

        <BubbleIconComponent style={styles.bgcontainer} />
        <View style={styles.innerContainer}>
          <View>
            <Curveicon
              height={RF(100)}
              width={RF(100)}
              style={styles.curveicon}
            />
          </View>
          <View style={styles.containerWrapper}>
            <Text style={GST.heading}>Login</Text>
            <View style={styles.txtcontainer}>
              <Text style={GST.description}>Good to see you back!</Text>
              <Heart height={RF(20)} width={RF(20)} />
            </View>

            <Formik
              initialValues={{ email: '' }}
              validationSchema={LoginSchema}
              onSubmit={values => handleLogin(values.email)}
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
                  <CustomInput
                    placeholder={'Email'}
                    containerStyle={styles.inputconatiner}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                  />
                  {errors.email && touched.email && (
                    <Text
                      style={{
                        ...GST.subdescription,
                        color: colors.red,
                      }}
                    >
                      {errors.email}
                    </Text>
                  )}

                  <CustomButton
                    btnTitle={'Next'}
                    style={styles.btnstyle}
                    onPress={handleSubmit}
                  />
                  <TouchableOpacity
                    style={styles.cancelbtn}
                    onPress={() => navigation.goBack()}
                  >
                    <Text style={GST.subdescription}>Cancel</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

export default LoginScreen;
