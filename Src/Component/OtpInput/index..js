import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { PasswordSchema } from '../../utils/Schema'
import GST, { colors, RF } from '../../Constant'
import { OtpInput } from 'react-native-otp-entry'
import { useNavigation } from '@react-navigation/native'


const CustomOtpInput = ({ref,}) => {
    const navigation = useNavigation();
  return (
     <Formik
     innerRef={ref}
        initialValues={{ password: "" }}
        validationSchema={PasswordSchema}
        onSubmit={(values) => {
          console.log("Password Entered:", values.password);
          // Navigate or authenticate
          navigation.navigate("Home"); // Change to your next screen
        }}
      >
        {({ handleSubmit, errors, touched, setFieldValue, setFieldTouched }) => (
          <>
   <View style={styles.otpwarapper}>
           <OtpInput numberOfDigits={4}
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
         focusStickStyle:{height:RF(10)}


      }}
                onTextChange={(text) => setFieldValue("password", text)}
                  onFilled={(text) => {
                     if (text.trim() === '2234') {
    navigation.navigate('ForgetPassword');
  } else {
    setFieldTouched('password', true);
    setFieldValue('password', text);
  }
                  }}
      />
          </View>
          </>
        )}</Formik>
  )
}

export default CustomOtpInput

const styles = StyleSheet.create({
     otpwarapper:{
        width:"30%",
        alignSelf:"center"
    },
    otpcontainer:{
        height:RF(20),
        width:RF(20),
        marginTop:RF(10),
        borderRadius:RF(90),
        backgroundColor:colors.grey
    }
})