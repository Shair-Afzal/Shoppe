import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Alert,
  Platform,
} from 'react-native';
import GST, { wp, hp, colors, fontSize, radius } from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import Star from '../../../assets/SVG/Like.svg';
import Clock from '../../../assets/SVG/Clock.svg';
import CameraIcon from '../../../assets/SVG/Cameraicon.svg';
import BubblesIcon from '../../../assets/SVG/Bubbles.svg';
import MailIcon from '../../../assets/SVG/Message.svg';
import SettingsIcon from '../../../assets/SVG/Settings.svg';

const AdminProfile = ({ navigation }) => {
  const [adminData, setAdminData] = useState({
    id: 'admin_001',
    name: 'Admin User',
    email: 'admin@shoppe.com',
    phone: '+92-300-1234567',
    store: 'Shoppe Store',
    image: 'https://via.placeholder.com/100',
    joinDate: 'Jan 2024',
    totalChats: 156,
    responseTime: '2 mins avg',
    rating: 4.8,
  });

  useEffect(() => {
    // Load admin profile data from API
    loadAdminProfile();
  }, []);

  const loadAdminProfile = async () => {
    try {
      // Replace with actual API call
      // const response = await getAdminProfile();
      // setAdminData(response.data);
    } catch (error) {
      console.log('Error loading profile:', error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: () => {
            // Perform logout
            navigation.navigate('AuthStack');
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleEditProfile = () => {
    navigation.navigate('AdminEditProfile', { adminData });
  };

  const StatCard = ({ icon, label, value }) => {
    const Icon = icon;
    return (
      <View style={styles.statCard}>
        <Icon width={wp('5%')} height={wp('5%')} />
        <Text style={styles.statLabel}>{label}</Text>
        <Text style={styles.statValue}>{value}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        scrollIndicatorInsets={{ right: 1 }}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Header with Back Button */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <LeftArrow width={wp('6%')} height={wp('6%')} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <View style={styles.backButton} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: adminData.image }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <CameraIcon width={wp('5%')} height={wp('5%')} />
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{adminData.name}</Text>
          <Text style={styles.profileStore}>{adminData.store}</Text>

          {/* Rating and Join Date */}
          <View style={styles.metaContainer}>
            <View style={styles.metaItem}>
              <Star width={wp('4%')} height={wp('4%')} fill={colors.orange} />
              <Text style={styles.metaText}>{adminData.rating} Rating</Text>
            </View>
            <View style={styles.metaItem}>
              <Clock width={wp('4%')} height={wp('4%')} />
              <Text style={styles.metaText}>Joined {adminData.joinDate}</Text>
            </View>
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Statistics</Text>
          <View style={styles.statsGrid}>
            <StatCard
              icon={BubblesIcon}
              label="Total Chats"
              value={adminData.totalChats}
            />
            <StatCard
              icon={Clock}
              label="Avg Response"
              value={adminData.responseTime}
            />
          </View>
        </View>

        {/* Contact Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Information</Text>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MailIcon width={wp('5%')} height={wp('5%')} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{adminData.email}</Text>
            </View>
          </View>

          <View style={styles.infoCard}>
            <View style={styles.infoIcon}>
              <MailIcon width={wp('5%')} height={wp('5%')} />
            </View>
            <View style={styles.infoContent}>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{adminData.phone}</Text>
            </View>
          </View>
        </View>

        {/* Settings Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.settingCard}>
            <SettingsIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.settingTitle}>Notifications</Text>
            <LeftArrow width={wp('4%')} height={wp('4%')} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <SettingsIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.settingTitle}>Security</Text>
            <LeftArrow width={wp('4%')} height={wp('4%')} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingCard}>
            <SettingsIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.settingTitle}>Help & Support</Text>
            <LeftArrow width={wp('4%')} height={wp('4%')} style={{ transform: [{ rotate: '180deg' }] }} />
          </TouchableOpacity>
        </View>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.editButton}
            onPress={handleEditProfile}
          >
            <CameraIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <MailIcon width={wp('5%')} height={wp('5%')} />
            <Text style={styles.logoutButtonText}>Logout</Text>
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
  profileCard: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: hp('1.5%'),
  },
  profileImage: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: radius.radius5,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: colors.sellerPrimary,
    width: wp('8%'),
    height: wp('8%'),
    borderRadius: radius.radius5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileName: {
    fontSize: fontSize.mediumLarge,
    fontWeight: '700',
    color: colors.sellerText,
    marginBottom: hp('0.5%'),
  },
  profileStore: {
    fontSize: fontSize.small,
    color: colors.sellerSubText,
    marginBottom: hp('1%'),
  },
  metaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: hp('1%'),
    paddingTop: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: colors.sellerBorder,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    marginLeft: wp('1.5%'),
    fontSize: fontSize.small,
    color: colors.sellerText,
  },
  metaEmoji: {
    fontSize: fontSize.small,
  },
  statsContainer: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  sectionTitle: {
    fontSize: fontSize.small,
    fontWeight: '700',
    color: colors.sellerText,
    marginBottom: hp('1%'),
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: wp('2%'),
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  statLabel: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
    marginTop: hp('0.5%'),
  },
  statValue: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
    marginTop: hp('0.3%'),
  },
  section: {
    marginHorizontal: wp('4%'),
    marginBottom: hp('2%'),
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  infoIcon: {
    width: wp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContent: {
    flex: 1,
    marginLeft: wp('2%'),
  },
  infoLabel: {
    fontSize: fontSize.avgSmall,
    color: colors.sellerSubText,
  },
  infoValue: {
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
    marginTop: hp('0.3%'),
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.2%'),
    paddingHorizontal: wp('3%'),
    marginBottom: hp('1%'),
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  settingTitle: {
    flex: 1,
    marginLeft: wp('2%'),
    fontSize: fontSize.small,
    fontWeight: '600',
    color: colors.sellerText,
  },
  buttonContainer: {
    marginHorizontal: wp('4%'),
    gap: hp('1%'),
    marginBottom: hp('2%'),
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sellerPrimary,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
  },
  editButtonText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sellerError,
    borderRadius: radius.radius3,
    paddingVertical: hp('1.5%'),
  },
  logoutButtonText: {
    color: colors.white,
    fontSize: fontSize.small,
    fontWeight: '600',
    marginLeft: wp('2%'),
  },
});

export default AdminProfile;
