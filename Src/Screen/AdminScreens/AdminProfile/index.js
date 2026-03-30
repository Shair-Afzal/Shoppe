import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { wp, hp, colors, fontSize, radius } from '../../../Constant';
import { pickImage } from '../../../Component/Custominput';
import CameraIcon from '../../../assets/SVG/Cameraicon.svg';
import MailIcon from '../../../assets/SVG/Message.svg';
import SettingsIcon from '../../../assets/SVG/Settings.svg';
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProfilepic,LogoutUser } from '../../../Redux/slices/Action/Authaction';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';

const AdminProfile = () => {
  const {user,loading,error}=useSelector(state => state.user)
  const dispatch=useDispatch()

  const [profile, setProfile] = useState({
    username: user?.username,
    email: user?.email,
    profilepic: user?.profilepic,
  });
  const [selectimage,setselectimage]=useState(user?.profilepic)

  // 🔹 image change
  const handlePickImage = async () => {
    try{
    const img = await pickImage();
    if (img?.path) {
       setselectimage(img.path)
      const res =await  dispatch(UpdateProfilepic(img)).unwrap()
           showSuccessToast("Profile pic is updated")
      return res
 
    }

  }catch(err){
    showErrorToast(err)
  }
  };
  const logoutuser=async()=>{
    try{
      const res=await dispatch(LogoutUser()).unwrap()
      showSuccessToast("user logout successfully")
      return res

    }catch(err){
      showErrorToast(err)

    }
  }

  return (
    <SafeAreaView style={styles.container}>
  {
    loading&&<Loader/>
  }
      {/* 🔹 HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Admin Profile</Text>
      </View>

      {/* 🔹 PROFILE CARD */}
      <View style={styles.card}>

        {/* IMAGE */}
        <View style={styles.imageWrapper}>
{selectimage? (
  <Image source={{ uri: selectimage }} style={styles.image} />
) : (
  <View style={styles.placeholder}>
    <Text style={styles.initial}>
      {profile?.username?.charAt(0)?.toUpperCase() || 'A'}
    </Text>
  </View>
)}
          <TouchableOpacity style={styles.camera} onPress={handlePickImage}>
            <CameraIcon width={wp('7%')} height={wp('7%')} />
          </TouchableOpacity>
        </View>

        {/* NAME */}
        <Text style={styles.name}>{profile.username}</Text>

        {/* EMAIL */}
        <View style={styles.infoBox}>
          <MailIcon width={wp('5%')} height={wp('5%')} />
          <Text style={styles.infoText}>{profile.email}</Text>
        </View>

      </View>

      {/* 🔹 ACTION BUTTONS */}
      <View style={styles.btnContainer}>

        <TouchableOpacity style={styles.primaryBtn}>
          <SettingsIcon width={wp('5%')} height={wp('5%')} />
          <Text style={styles.btnText}>Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn}
        onPress={logoutuser}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>

      </View>

    </SafeAreaView>
  );
};

export default AdminProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },

  header: {
    height: hp('18%'),
    backgroundColor: colors.sellerPrimary,
    justifyContent: 'flex-end',
    paddingBottom: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },

  headerTitle: {
    fontSize: fontSize.large,
    color: colors.white,
    fontWeight: '700',
  },

  card: {
    backgroundColor: colors.sellerCard,
    marginHorizontal: wp('5%'),
    marginTop: -hp('6%'),
    borderRadius: radius.radius3,
    paddingVertical: hp('3%'),
    alignItems: 'center',
    elevation: 5,
  },

  imageWrapper: {
    position: 'relative',
    marginBottom: hp('1.5%'),
  },

  image: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: wp('15%'),
  },

  camera: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    // backgroundColor: colors.sellerPrimary,
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: wp('4%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  name: {
    fontSize: fontSize.mediumLarge,
    color: colors.sellerText,
    fontWeight: '700',
    marginBottom: hp('1%'),
  },

  infoBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2%'),
    backgroundColor: colors.sellerLight,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
    borderRadius: radius.radius3,
  },

  infoText: {
    fontSize: fontSize.small,
    color: colors.sellerText,
  },

  btnContainer: {
    marginTop: hp('4%'),
    paddingHorizontal: wp('5%'),
    gap: hp('2%'),
  },

  primaryBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp('2%'),
    backgroundColor: colors.sellerPrimary,
    paddingVertical: hp('1.8%'),
    borderRadius: radius.radius3,
  },

  btnText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
  },

  logoutBtn: {
    backgroundColor: colors.sellerError,
    paddingVertical: hp('1.8%'),
    borderRadius: radius.radius3,
    alignItems: 'center',
  },

  logoutText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  placeholder: {
  width: wp('30%'),
  height: wp('30%'),
  borderRadius: wp('15%'),
  backgroundColor: colors.sellerLight,
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth:1,
  borderColor:colors.Black
},

initial: {
  fontSize: wp('10%'),
  color: colors.sellerPrimary,
  fontWeight: '700',
},
});