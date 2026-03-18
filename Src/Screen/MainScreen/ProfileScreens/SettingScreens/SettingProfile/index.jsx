import { View, Text, Image, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import GST, { colors, RF, wp } from '../../../../../Constant';
import CustomHeader from '../../../../../Component/CustomHeader';
import CustomInput, { pickImage } from '../../../../../Component/Custominput';
import Buttonicon from '../../../../../assets/SVG/Buttonicon.svg';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import styles from './style'; 
import { useDispatch, useSelector } from 'react-redux';
import { UserProfile,UpdateProfile } from '../../../../../Redux/slices/Action/Authaction';
import { showErrorToast, showSuccessToast } from '../../../../../utils/Toast';
import CustomButton from '../../../../../Component/Custombutton';
import { updateProfile } from '@react-native-firebase/auth';
import Loader from '../../../../../Component/Loader/Loader';

const SettingProfile = ({navigation}) => {
    const dispatch=useDispatch();
  const {user,loading,error}=useSelector(state => state.user)
    const fetch= async ()=>{

   console.log("user",user)
    try{
    const res =await dispatch(UserProfile(user?._id))
    
    return res
    }catch(err){
      showErrorToast(err)
    }

  }

  useEffect( ()=>{
    fetch()
    
  },[])

  
  const [selectedImage, setSelectedImage] = useState(user?.profilepic);
  const [username, setName] = useState(user?.username);
  const [email, setEmail] = useState(user?.email);
  const handlesumbit=async()=>{
    try{
    const res=await dispatch(UpdateProfile({username:username,email:email,profilepic:selectedImage})).unwrap()
     showSuccessToast("user profile is updated")
    return res.data
   
    }catch(err){
      console.log("erroris",err)
      showErrorToast(err.message)
    }
  }
 



  const handlePickImage = async () => {
    try {
      const image = await pickImage();
      if (image) {
        setSelectedImage(image);
      }
    } catch (error) {
      console.log('Error picking image: ', error);
    }
  };

  const insert = useSafeAreaInsets();

  return (
    <View style={[GST.MAIN, styles.main, { paddingTop: insert.top }]}>
      {
        loading&&
        <Loader style={{width:"100%",alignSelf:"center",backgroundColor:""}}/>

       }
      <CustomHeader name={'Settings'} descrip={'Your Profile'} />
       
    
      <View style={styles.avatarContainer}>
        <Image
          source={
            selectedImage == null
              ? require('../../../../../assets/Images/avatar.png')
              : typeof selectedImage === 'string'
      ? { uri: selectedImage } 
      : { uri: selectedImage.path } 
          }
          style={styles.avatar}
        />
        <TouchableOpacity
          style={styles.editIcon}
          onPress={handlePickImage}
        >
          <Buttonicon height={RF(25)} width={RF(25)} />
        </TouchableOpacity>
      </View>


      <View style={styles.inputWrapper}>
        <CustomInput
          value={username}
          containerStyle={styles.inputContainer}
          onChangeText={setName}
        />
        <CustomInput
          value={email}
          containerStyle={styles.inputContainer}
          onChangeText={setEmail}
        />
        
      </View>
      <CustomButton btnTitle={"Edit"} onPress={handlesumbit} style={{position:"absolute",bottom:RF(20),alignSelf:"center"}}/>
    </View>
  );
};

export default SettingProfile;
