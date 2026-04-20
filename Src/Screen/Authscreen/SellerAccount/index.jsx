import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import GST, { colors, IS_TABLET, radius, RF, wp } from '../../../Constant';
import Bubbles from '../../../assets/SVG/Bubbles.svg';
import Cameraicon from '../../../assets/SVG/Cameraicon.svg';
import styles from './style';
import CustomInput from '../../../Component/Custominput';
import PhoneInputComponent from '../../../Component/PhoneInputComponent';
import CustomButton from '../../../Component/Custombutton';
import { initialValues, SellerSchema, Sellervalues, userSchema } from '../../../utils/Schema';
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
import { pickImage } from '../../../Component/Custominput';
import { registerAccount } from '../../../Redux/slices/Action/Authaction.js';
import Config from 'react-native-config';
import { RegisterSellerAccount } from '../../../Redux/slices/Action/Authaction.js';

// Configure Google Sign-In with the new webClientId from the provided JSON
GoogleSignin.configure({
  webClientId:
    '576309715513-5ku286iecnak68uubaldoej8daup5rp7.apps.googleusercontent.com',
  offlineAccess: true,
});

const SellerAccount = ({ navigation }) => {
  const dispatch = useDispatch();

  const { user, error, loading } = useSelector(state => state.user);

  const [show, setshow] = useState(true);
  const [selectedimg, setselectedimg] = useState(null);
  const [select, setselect] = useState('customer');

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
            Create Seller{'\n'}
            Account
          </Text>
          <View style={styles.innercontainer}>
            <Formik
              initialValues={Sellervalues}
              validationSchema={SellerSchema}
              onSubmit={async values => {
                console.log(values);

                try {
                  await dispatch(RegisterSellerAccount(values)).unwrap();

                  showSuccessToast('Seller Account Created successfully just wait for approval!');

                  // navigation.navigate('SellerTabs');
                } catch (err) {
                  showErrorToast(err);
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
                const handlepickimage = async () => {
                  try {
                    const image = await pickImage();

                    if (image) {
                      console.log('Picked Image:', image);

                      setselectedimg(image);

                      setFieldValue('shopLogo', image); // store full object
                    }
                  } catch (error) {
                    console.log('Error picking image:', error);
                  }
                };

                return (
                  <>
                    <TouchableOpacity onPress={() => handlepickimage()}>
                      {values.shopLogo == null ? (
                        <Cameraicon height={RF(70)} width={RF(70)} />
                      ) : (
                        <Image
                          source={{ uri: values.shopLogo.path }}
                          style={{
                            height: RF(70),
                            width: RF(70),
                            borderRadius: 100,
                          }}
                        />
                      )}
                    </TouchableOpacity>
                    {errors.shopLogo && touched.shopLogo && (
                      <Text
                        style={{ ...GST.subdescription, color: colors.red }}
                      >
                        {errors.shopLogo}
                      </Text>
                    )}
                    <View style={styles.inputwrapper}>
                     
                      <CustomInput
                        placeholder={'Shop Name'}
                        value={values.shopName}
                        onChangeText={handleChange('shopName')}
                        onBlur={handleBlur('shopName')}
                        containerStyle={{ paddingVertical: RF(2) }}
                      />

                      {errors.shopName && touched.shopName && (
                        <Text
                          style={{ ...GST.subdescription, color: colors.red }}
                        >
                          {errors.shopName}
                        </Text>
                      )}

                      <CustomInput
                        placeholder={'Shope Description'}
                        value={values.shopDescription}
                        onChangeText={handleChange('shopDescription')}
                        onBlur={handleBlur('shopDescription')}
                        containerStyle={{ paddingVertical: RF(2) }}
                      />
                      {errors.shopDescription && touched.shopDescription && (
                        <Text
                          style={{ ...GST.subdescription, color: colors.red }}
                        >
                          {errors.shopDescription}
                        </Text>
                      )}

                      
                      {/* <PhoneInputComponent
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
                    )} */}

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
                  </>
                );
              }}
            </Formik>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default SellerAccount;
