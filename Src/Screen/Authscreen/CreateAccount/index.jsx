import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import Bubbles from '../../../assets/SVG/Bubbles.svg';
import Cameraicon from '../../../assets/SVG/Cameraicon.svg';
import styles from './style';
import CustomInput from '../../../Component/Custominput';
import Eyeicon from '../../../assets/SVG/Eyeicon.svg';
import PhoneInputComponent from '../../../Component/PhoneInputComponent';
import CustomButton from '../../../Component/Custombutton';
import initialValues from '../../../utils/Schema';
import { Formik } from 'formik';
import userSchema from '../../../utils/Schema';
import BotttomButtons from '../../../Component/BottomButtonContainer';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import { createAccount } from '../../../Redux/slices/userslice';
const CreateAccount = ({ navigation }) => {
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});
  const user=useSelector((state)=>state.user)
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
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar 
              translucent 
              backgroundColor="transparent" 
              barStyle="dark-content" 
            />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {loading && <Loader />}
        <View style={styles.container}>
          <Bubbles
            width="100%"
            height={RF(300)}
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
                dispatch(createAccount(values))
                setLoading(true);
                console.log("hi",user)
                setTimeout(() => {
                  
                  setLoading(false);
                  showSuccessToast('Account Created successfully');
                  setTimeout(() => {
                    navigation.navigate('OnBonding');
                  }, 1500);
                }, 2000);
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => {
                return (
                  <View style={styles.inputwrapper}>
                    <FormObserver errors={errors} touched={touched} />
                    <CustomInput
                      placeholder={'Email'}
                      value={values.email}
                      onChangeText={handleChange('email')}
                      onBlur={handleBlur('email')}
                    />

                    <CustomInput
                      placeholder={'Password'}
                      rightIcon
                      value={values.password}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      secureTextEntry={true}
                    />

                    <PhoneInputComponent
                      value={values.phone}
                      onChangeText={handleChange('phone')}
                      onChangeFormattedText={handleChange('phone')}
                      
                      containerStyle={{
                        borderColor:
                          errors.phone && touched.phone ? 'red' : 'gray',
                        borderWidth: 1,
                      }}
                    />

                    <CustomButton
                      btnTitle={'Done'}
                      onPress={handleSubmit}
                      style={{ marginTop: RF(30) }}
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
    </KeyboardAvoidingView>
  );
};

export default CreateAccount;
