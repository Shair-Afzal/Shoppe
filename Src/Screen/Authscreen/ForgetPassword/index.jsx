import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import GST, { colors, RF } from '../../../Constant';
import Buble from '../../../assets/SVG/Buble.svg';
import ProfilePhoto from '../../../Component/Profilephoto';
import BubbleIconComponent from '../../../Component/BubbleiconComponent';
import RightBubble from '../../../Component/RightBubblecomponent';
import { Image } from 'react-native-svg';
import Check from '../../../assets/SVG/Check.svg';
import BotttomButtons from '../../../Component/BottomButtonContainer';
import styles from './style';
import { OtpInput } from 'react-native-otp-entry';
import { Formik } from 'formik';
import CustomOtpInput from '../../../Component/OtpInput/index.';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { otpSchema, PasswordSchema } from '../../../utils/Schema';
import Loader from '../../../Component/Loader/Loader';
import CustomButton from '../../../Component/Custombutton';
import CustomModel from '../../../Component/CustomModel';
import { useDispatch, useSelector } from 'react-redux';
import { ForgetPasword,VerifyOtp } from '../../../Redux/slices/Action/Authaction'

const ForgetPassword = ({ navigation,route }) => {
  const dispatch=useDispatch()
  const {email}=route.params
  const {error,loading}=useSelector(state=>state.user)
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const formikRef = useRef();
 
  const [showmodel,setmodel]=useState(false)
  // const [error,seterror]=useState(false)

  const [selectedOption, setSelectedOption] = useState('SMS');
  const [count, setcount] = useState(0);
const Submit = async () => {

  try {

    if (selectedOption === 'SMS') {

     

      const res = await dispatch(ForgetPasword({ email:email }))
      console.log("API RESPONSE:", res)
      

    

      if (res?.meta?.requestStatus === "fulfilled") {

        showSuccessToast("OTP is send on email")

        setcount(prev => prev + 1)

      } else {

        showErrorToast(res.payload||"Something went wrong")

      }

    }

  } catch (err) {


    showErrorToast(err.message)

  }

};
  const cancelsumbit = () => {
    if (count > 0) {
      setcount(count - 1);
    } else {
      navigation.goBack();
    }
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
    <Formik
      innerRef={formikRef}
      initialValues={{ otp: '' }}
      validationSchema={otpSchema}
      onSubmit={async (values) => {
          console.log("FORM SUBMIT VALUES:", values)
        try{
          const res=await dispatch(VerifyOtp({ otp: values.otp }))
            if(res?.meta?.requestStatus === "fulfilled"){
      showSuccessToast("Otp is verified Successfully")
      navigation.navigate("ConfirmPassword")
    }else{
      showErrorToast(res.payload || "Invalid OTP")
    }

         

        }catch(err){
          showErrorToast(err)

        }
        
      }}
    >
      {({ handleSubmit, errors, touched, setFieldValue, setFieldTouched }) => (
        <KeyboardAvoidingView
          style={GST.FLEX}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <CustomModel visible={showmodel} onClose={()=>setmodel(false)}/>
           
          <View style={GST.FLEX}>
            {
              loading&&<Loader/>
            }
           
            <View style={{ height: RF(140) }}>
              <RightBubble style={styles.bg} />
            </View>
            <ProfilePhoto
              style={{ position: 'relative' }}
              title={'Password Recovery'}
            />
            <Text style={styles.txt}>
              {count == 0
                ? 'How you would like to restore\n your password?'
                : 'Enter 4-digits code we sent you on your email'}
            </Text>
            {count == 0 ? (
              <View style={styles.btncontainer}>
                {/* <TouchableOpacity
                  style={styles.btn}
                  onPress={() => setSelectedOption('SMS')}
                >
                  <View style={GST.ROW}>
                    <Text style={styles.smstxt}>SMS</Text>
                    {selectedOption === 'SMS' ? (
                      <Check
                        height={RF(20)}
                        width={RF(20)}
                        style={{ left: RF(25) }}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.escape}
                      ></TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{ ...styles.btn, backgroundColor: colors.lightpink }}
                  onPress={() => setSelectedOption('SMS')}
                >
                  <View style={GST.ROW}>
                    <Text style={styles.emailtxt}>Email</Text>
                    {selectedOption === 'SMS' ? (
                      <Check
                        height={RF(20)}
                        width={RF(20)}
                        style={{ left: RF(25) }}
                      />
                    ) : (
                      <TouchableOpacity
                        style={styles.escape}
                      ></TouchableOpacity>
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              
              
                
                 <>
                  
                <Text style={{ ...GST.description, textAlign: 'center' }}>
                  {email.email}
                </Text>

                <View style={styles.otpwarapper}>
                  <OtpInput
                    numberOfDigits={6}
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
                      focusStickStyle: { height: RF(10) },
                      pinCodeTextStyle: { fontSize: RF(14) },
                    }}
                    onTextChange={text => setFieldValue('otp', text)}
                   onFilled={(text) => {
  formikRef.current?.setFieldValue('otp', text)

  setTimeout(() => {
    formikRef.current?.handleSubmit()
  }, 200)
}}
                  />
                </View>
                {error&& (
                  <Text style={[GST.subdescription, styles.errortxt]}>
                    {" otp is invalid"}
                  </Text>
                )}
              </>
               
              )
             
              
             
             
            }
            {
              !keyboardVisible&&
            
            <BotttomButtons
              onPress={() => Submit()}
              arrowpress={() => cancelsumbit()}
              btnTitle={count === 0 ? 'Next' : 'Send Again'}
              containerStyle={{ paddingHorizontal: RF(20) }}
              btnStyle={count > 0 && styles.custombtn}
            />
}
          </View>
          
        </KeyboardAvoidingView>
      )}
    </Formik>
  );
};

export default ForgetPassword;
