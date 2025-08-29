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
import { showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../../Redux/slices/userslice';

const CreateAccount = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [show, setshow] = useState(true);
  const user = useSelector((state) => state.user);

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
              onSubmit={values => {
                dispatch(createAccount(values));
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  showSuccessToast('Account Created successfully');
                  setTimeout(() => {
                    navigation.navigate('Login');
                    console.log("user",user)
                  }, 1500);
                }, 2000);
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
                      <Text style={{ ...GST.subdescription, color: colors.red }}>
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
                      <Text style={{ ...GST.subdescription, color: colors.red }}>
                        {errors.password}
                      </Text>
                    )}

                    <PhoneInputComponent
                      value={values.phone}
                      onChangeText={(text) => {
        
                        handleChange('phone')(text);
                      }}
                      onChangeFormattedText={(formattedText) => {
                        setFieldValue('phone', formattedText);
                      }}
                      onChangeCountry={(country) => {
                
                        setFieldValue('countryCode', country.cca2.toUpperCase());
                      }}
                    />
                    {errors.phone  && touched.phone&&(
                      <Text style={{ ...GST.subdescription, color: colors.red }}>
                        {errors.phone}
                      </Text>
                    )}
                    {errors.countryCode && touched.countryCode&& (
                      <Text style={{ ...GST.subdescription, color: colors.red }}>
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
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateAccount;