import {
  View,
  Text,
  SafeAreaView,
  Touchable,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import Bubbleicon from '../.././../assets/SVG/Bubbleicon.svg';
import Curveicon from '../../../assets/SVG/Curveicon.svg';
import Heart from '../../../assets/SVG/Heart.svg';
import CustomInput from '../../../Component/Custominput';
import CustomButton from '../../../Component/Custombutton';
import styles from './style';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import { LoginSchema } from '../../../utils/Schema';
import { Formik } from 'formik';
import BotttomButtons from '../../../Component/BottomButtonContainer';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginEmail } from '../../../Redux/slices/userslice';
const LoginScreen = ({ navigation }) => {
  const emial=useSelector(state=>state.user.tempEmail)
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(false);


  return (
    <View style={GST.FLEX}>
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
              onSubmit={values => {
                dispatch(setLoginEmail(values.email))
                setLoading(true);
                setTimeout(() => {
                  setLoading(false);
                  navigation.navigate('Password');
                }, 1500);
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
                 
                  <CustomInput
                    placeholder={'Email'}
                    containerStyle={{ marginTop: RF(20),paddingVertical:RF(2)}}
                    value={values.email}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    // containerStyle={{paddingVertical:RF(5)}}
                    
                  />
                  {
                    errors.email&&touched.email&&
                    <Text style={{...GST.subdescription,color:colors.red}}>{errors.email}</Text>
                  }

                  <CustomButton
                    btnTitle={'Next'}
                    style={{ marginTop: RF(25) }}
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
