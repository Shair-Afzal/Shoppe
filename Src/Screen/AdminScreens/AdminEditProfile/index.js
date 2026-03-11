import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from 'react-native';
import GST, { wp, hp, colors, fontSize, radius } from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import CameraIcon from '../../../assets/SVG/Cameraicon.svg';
import MailIcon from '../../../assets/SVG/Message.svg';
import UserIcon from '../../../assets/SVG/Activeprofile.svg';
import SettingsIcon from '../../../assets/SVG/Settings.svg';
import CheckIcon from '../../../assets/SVG/Check.svg';

const AdminEditProfile = ({ route, navigation }) => {
  const adminData = route?.params?.adminData || {
    name: 'Super Admin',
    email: 'admin@shoppe.com',
    phone: '+92-300-1234567',
    store: 'Shoppe Store',
    image: 'https://via.placeholder.com/100',
  };
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: adminData.name,
    email: adminData.email,
    phone: adminData.phone,
    store: adminData.store,
    image: adminData.image,
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    }
    if (!formData.store.trim()) {
      newErrors.store = 'Store name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSaveChanges = async () => {
    if (!validateForm()) {
      Alert.alert('Validation Error', 'Please fix the errors and try again');
      return;
    }

    setLoading(true);
    try {
      // Replace with actual API call
      // const response = await updateAdminProfile(formData);
      
      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      Alert.alert('Success', 'Profile updated successfully');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again');
      console.log('Error updating profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChangeProfileImage = () => {
    // Open image picker
    Alert.alert(
      'Change Profile Picture',
      'Choose an option',
      [
        {
          text: 'Camera',
          onPress: () => console.log('Open Camera'),
        },
        {
          text: 'Gallery',
          onPress: () => console.log('Open Gallery'),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  const InputField = ({ label, value, onChangeText, error, Icon, keyboardType = 'default' }) => (
    <View style={styles.inputFieldContainer}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputFieldWrapper,
          error && styles.inputFieldError,
        ]}
      >
        {Icon && <Icon width={wp('5%')} height={wp('5%')} style={styles.inputIcon} />}
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          placeholder={`Enter ${label.toLowerCase()}`}
          placeholderTextColor={colors.sellerBorder}
          keyboardType={keyboardType}
        />
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        scrollIndicatorInsets={{ right: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <LeftArrow width={wp('6%')} height={wp('6%')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
          <View style={styles.backButton} />
        </View>

        {/* Profile Image Section */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: formData.image }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.cameraButton}
              onPress={handleChangeProfileImage}
            >
              <CameraIcon width={wp('5%')} height={wp('5%')} />
            </TouchableOpacity>
          </View>
          <Text style={styles.imageText}>Tap to change profile picture</Text>
        </View>

        {/* Form Section */}
        <View style={styles.formContainer}>
          <InputField
            label="Full Name"
            value={formData.name}
            onChangeText={(text) =>
              setFormData({ ...formData, name: text })
            }
            error={errors.name}
            Icon={UserIcon}
          />

          <InputField
            label="Email Address"
            value={formData.email}
            onChangeText={(text) =>
              setFormData({ ...formData, email: text })
            }
            error={errors.email}
            Icon={MailIcon}
            keyboardType="email-address"
          />

          <InputField
            label="Phone Number"
            value={formData.phone}
            onChangeText={(text) =>
              setFormData({ ...formData, phone: text })
            }
            error={errors.phone}
            Icon={MailIcon}
            keyboardType="phone-pad"
          />

          <InputField
            label="Store Name"
            value={formData.store}
            onChangeText={(text) =>
              setFormData({ ...formData, store: text })
            }
            error={errors.store}
            Icon={SettingsIcon}
          />
        </View>

        {/* Change Password Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <TouchableOpacity style={styles.changePasswordButton}>
            <SettingsIcon
              width={wp('5%')}
              height={wp('5%')}
            />
            <Text style={styles.changePasswordText}>Change Password</Text>
            <LeftArrow
              width={wp('4%')}
              height={wp('4%')}
              style={{ transform: [{ rotate: '180deg' }] }}
            />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
            disabled={loading}
          >
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSaveChanges}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <>
                <CheckIcon
                  width={wp('5%')}
                  height={wp('5%')}
                />
                <Text style={styles.saveButtonText}>Save Changes</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        {/* Spacing */}
        <View style={{ height: hp('3%') }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('2%'),
    backgroundColor: colors.sellerCard,
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    marginBottom: hp('2%'),
  },
  backButton: {
    padding: wp('2%'),
    width: wp('10%'),
  },
  headerTitle: {
    fontSize: fontSize.mediumLarge,
    fontWeight: '700',
    color: colors.sellerText,
  },
  imageSection: {
    alignItems: 'center',
    marginHorizontal: wp('4%'),
    marginBottom: hp('3%'),
  },
  imageContainer: {
    position: 'relative',
    marginBottom: hp('1%'),
  },
  profileImage: {
    width: wp('30%'),
    height: wp('30%'),
    borderRadius: radius.radius5,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.sellerPrimary,
    width: wp('9%'),
    height: wp('9%'),
    borderRadius: radius.radius5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: colors.sellerCard,
  },
  imageText: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
    marginTop: hp('0.5%'),
  },
  formContainer: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  inputFieldContainer: {
    marginVertical: hp('0.8%'),
  },
  label: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
    marginBottom: hp('0.5%'),
  },
  inputFieldWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sellerBg,
    borderRadius: radius.radius2,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    paddingHorizontal: wp('2%'),
  },
  inputFieldError: {
    borderColor: colors.sellerError,
  },
  inputIcon: {
    marginRight: wp('2%'),
  },
  inputField: {
    flex: 1,
    paddingVertical: hp('1%'),
    fontSize: fontSize.small,
    color: colors.sellerText,
  },
  errorText: {
    fontSize: fontSize.extraSmall,
    color: colors.sellerError,
    marginTop: hp('0.3%'),
  },
  section: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.sellerText,
    marginBottom: hp('1%'),
  },
  changePasswordButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  changePasswordText: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: wp('2%'),
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  cancelButton: {
    flex: 1,
    borderWidth: 2,
    borderColor: colors.sellerPrimary,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: colors.sellerPrimary,
    fontSize: fontSize.small,
    fontWeight: '600',
  },
  saveButton: {
    flex: 1,
    backgroundColor: colors.sellerPrimary,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  saveButtonText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
    marginLeft: wp('1%'),
  },
});

export default AdminEditProfile;
