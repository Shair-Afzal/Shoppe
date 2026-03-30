import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { wp, hp, colors, fontSize, radius } from '../../../Constant';
import CameraIcon from '../../../assets/SVG/Cameraicon.svg';
import MailIcon from '../../../assets/SVG/Message.svg';
import UserIcon from '../../../assets/SVG/Activeprofile.svg';
import SettingsIcon from '../../../assets/SVG/Settings.svg';
import CheckIcon from '../../../assets/SVG/Check.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfile } from '../../../Redux/slices/Action/Authaction';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { pickImage } from '../../../Component/Custominput';
import Loader from '../../../Component/Loader/Loader';
 const InputField = React.memo(({ icon: Icon, value, onChangeText, placeholder }) => {
  return (
    <View style={styles.inputWrapper}>
      <Icon width={wp('5%')} height={wp('5%')} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.sellerSubText}
      />
    </View>
  );
});

const AdminEditProfile = () => {
  const { user, loading } = useSelector(state => state.user);
  const dispatch=useDispatch()

  const [formData, setFormData] = useState({
    username: user?.username || '',
    email: user?.email || '',
    store: user?.store || '',
    profilepic: user?.profilepic,
  });
  const handleimage=async()=>{
    try{
       const img=await pickImage()
    if(img?.path){
       setFormData({...formData,profilepic:img?.path})
       
    }

    }catch(err){
      showErrorToast(err)
    }
   

  }

 
  const handlesumbit=async()=>{
    try{
     const res = await dispatch(UpdateProfile(formData)).unwrap()
     showSuccessToast("Admin profile updated successfully")
     return res.data

    }catch(err){
      showErrorToast(err)

    }

  }

  return (
    <SafeAreaView style={styles.container}>
      {loading && <Loader/>}

      <ScrollView contentContainerStyle={{ paddingBottom: hp('5%') }}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* PROFILE IMAGE */}
        <View style={styles.imageSection}>
          <View style={styles.imageWrapper}>
            {formData.profilepic ? (
              <Image source={{ uri: formData.profilepic }} style={styles.image} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.initial}>
                  {formData.username?.charAt(0)?.toUpperCase() || 'A'}
                </Text>
              </View>
            )}

            <TouchableOpacity style={styles.cameraBtn}
            onPress={handleimage}
            >
              <CameraIcon width={wp('7%')} height={wp('7%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.changeText}>Change Profile Picture</Text>
        </View>

        {/* FORM */}
        <View style={styles.form}>
          <InputField
            icon={UserIcon}
            value={formData.username}
            onChangeText={text => setFormData({ ...formData, username: text })}
            placeholder="Enter username"
          />

          <InputField
            icon={MailIcon}
            value={formData.email}
            onChangeText={text => setFormData({ ...formData, email: text })}
            placeholder="Enter email"
          />

         
        </View>

        {/* BUTTONS */}
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.saveBtn}
          onPress={handlesumbit}
          >
            <CheckIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminEditProfile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },

  header: {
    height: hp('15%'),
    backgroundColor: colors.sellerPrimary,
    justifyContent: 'flex-end',
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },

  headerTitle: {
    color: colors.white,
    fontSize: fontSize.large,
    fontWeight: '700',
  },

  imageSection: {
    alignItems: 'center',
    marginTop: -hp('5%'),
  },

  imageWrapper: {
    position: 'relative',
  },

  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
  },

  placeholder: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
    backgroundColor: colors.sellerLight,
    justifyContent: 'center',
    alignItems: 'center',
  },

  initial: {
    fontSize: wp('10%'),
    color: colors.sellerPrimary,
    fontWeight: '700',
  },

  cameraBtn: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: wp('2%'),
    borderRadius: wp('5%'),
  },

  changeText: {
    marginTop: hp('1%'),
    color: colors.sellerSubText,
    fontSize: fontSize.small,
  },

  form: {
    marginTop: hp('3%'),
    paddingHorizontal: wp('5%'),
    gap: hp('2%'),
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
    paddingHorizontal: wp('3%'),
    borderRadius: radius.radius3,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },

  input: {
    flex: 1,
    paddingVertical: hp('1.5%'),
    marginLeft: wp('2%'),
    fontSize: fontSize.small,
    color: colors.sellerText,
  },

  btnContainer: {
    flexDirection: 'row',
    gap: wp('3%'),
    marginTop: hp('4%'),
    paddingHorizontal: wp('5%'),
  },

  cancelBtn: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.sellerPrimary,
    paddingVertical: hp('1.8%'),
    borderRadius: radius.radius3,
    alignItems: 'center',
  },

  cancelText: {
    color: colors.sellerPrimary,
    fontSize: fontSize.small,
    fontWeight: '600',
  },

  saveBtn: {
    flex: 1,
    backgroundColor: colors.sellerPrimary,
    paddingVertical: hp('1.8%'),
    borderRadius: radius.radius3,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: wp('2%'),
  },

  saveText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
  },
});