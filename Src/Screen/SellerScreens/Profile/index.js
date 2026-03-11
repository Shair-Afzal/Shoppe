import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Modal,
  Alert,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp, hp, colors } from '../../../Constant';
import ImageCropPicker from 'react-native-image-crop-picker';

// ─── Stored Profile Values (no phone) ─────────────────────────────────────────
const defaultProfile = {
  shopName: 'Ahmed Fashion Store',
  ownerName: 'Ahmed Khan',
  email: 'ahmed.khan@gmail.com',
  address: 'Shop #14, Main Market, Lahore',
  description: 'Premium clothing & accessories. Quality guaranteed. Fast delivery.',
  logoUri: null,
};

const INFO_ROWS = [
  { key: 'ownerName', label: 'Owner Name', icon: '👤' },
  { key: 'email', label: 'Email', icon: '✉️' },
  { key: 'address', label: 'Address', icon: '📍' },
  { key: 'description', label: 'Description', icon: '📝', multiline: true },
];

const SellerProfile = () => {
  const insets = useSafeAreaInsets();
  const [profile, setProfile] = useState(defaultProfile);
  const [editVisible, setEditVisible] = useState(false);
  const [draft, setDraft] = useState(defaultProfile);

  const openEdit = () => {
    setDraft({ ...profile });
    setEditVisible(true);
  };

  const saveEdit = () => {
    if (!draft.shopName.trim()) return Alert.alert('Required', 'Shop name cannot be empty');
    if (!draft.ownerName.trim()) return Alert.alert('Required', 'Owner name cannot be empty');
    setProfile({ ...draft });
    setEditVisible(false);
  };

  const pickLogo = () => {
    ImageCropPicker.openPicker({
      width: 400, height: 400,
      cropping: true,
      cropperCircleOverlay: true,
      compressImageQuality: 0.85,
    })
      .then(img => setDraft(p => ({ ...p, logoUri: img.path })))
      .catch(err => {
        if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Could not pick image.');
      });
  };

  const initial = profile.shopName.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar backgroundColor={colors.sellerPrimary} barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>

        {/* ── Cover ── */}
        <View style={styles.cover}>
          <View style={styles.coverOverlay} />
          <Text style={styles.coverTitle}>Seller Profile</Text>
        </View>

        {/* ── Avatar ── */}
        <View style={styles.avatarWrapper}>
          <View style={styles.avatarRing}>
            {profile.logoUri
              ? <Image source={{ uri: profile.logoUri }} style={styles.avatarImg} resizeMode="cover" />
              : (
                <View style={styles.avatarPlaceholder}>
                  <Text style={styles.avatarInitial}>{initial}</Text>
                </View>
              )}
          </View>
        </View>

        {/* ── Name & Badges ── */}
        <View style={styles.nameBlock}>
          <Text style={styles.shopName}>{profile.shopName}</Text>
          <Text style={styles.ownerSub}>{profile.ownerName}</Text>
          <View style={styles.badgesRow}>
            <View style={styles.badgeGreen}>
              <Text style={styles.badgeGreenTxt}>✓ Verified</Text>
            </View>
            <View style={styles.badgePrimary}>
              <Text style={styles.badgePrimaryTxt}>⭐ Top Seller</Text>
            </View>
          </View>
        </View>

        {/* ── Stats ── */}
        <View style={styles.statsRow}>
          {[
            { label: 'Products', value: '24', color: colors.sellerPrimary },
            { label: 'Sales', value: '138', color: colors.sellerSuccess },
            { label: 'Rating', value: '4.8', color: colors.sellerWarning },
          ].map((s, i) => (
            <View key={i} style={[styles.statItem, i === 1 && styles.statMiddle]}>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Info Card ── */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>Shop Information</Text>
          {INFO_ROWS.map((row, i) => (
            <View
              key={row.key}
              style={[styles.infoRow, i === INFO_ROWS.length - 1 && { borderBottomWidth: 0 }]}>
              <Text style={styles.rowIcon}>{row.icon}</Text>
              <View style={styles.rowTexts}>
                <Text style={styles.rowLabel}>{row.label}</Text>
                <Text style={styles.rowValue} numberOfLines={row.multiline ? 3 : 1}>
                  {profile[row.key]}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Edit Button ── */}
        <TouchableOpacity style={styles.editBtn} onPress={openEdit} activeOpacity={0.85}>
          <Text style={styles.editBtnTxt}>✏️  Edit Profile</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* ═══════════ EDIT MODAL ═══════════ */}
      <Modal
        visible={editVisible}
        animationType="slide"
        transparent={false}
        onRequestClose={() => setEditVisible(false)}>
        <View style={[styles.modalRoot, { paddingTop: insets.top }]}>

          {/* Modal Header */}
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setEditVisible(false)} style={styles.headerBtn}>
              <Text style={styles.cancelTxt}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Edit Profile</Text>
            <TouchableOpacity onPress={saveEdit} style={styles.headerBtn}>
              <Text style={styles.saveTxt}>Save</Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            contentContainerStyle={styles.modalScroll}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled">

            {/* Logo Picker */}
            <View style={styles.logoPicker}>
              <TouchableOpacity onPress={pickLogo} activeOpacity={0.85}>
                <View style={styles.editLogoRing}>
                  {draft.logoUri
                    ? <Image source={{ uri: draft.logoUri }} style={styles.avatarImg} resizeMode="cover" />
                    : (
                      <View style={styles.avatarPlaceholder}>
                        <Text style={styles.avatarInitial}>{draft.shopName.charAt(0)}</Text>
                      </View>
                    )}
                </View>
                {/* Camera badge */}
                <View style={styles.cameraBadge}>
                  <Text style={{ fontSize: wp('3.5%') }}>📷</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.changePhotoHint}>Tap to change shop logo</Text>
            </View>

            {/* Shop Name */}
            <Text style={styles.fieldLabel}>Shop Name *</Text>
            <TextInput
              style={styles.fieldInput}
              value={draft.shopName}
              onChangeText={t => setDraft(p => ({ ...p, shopName: t }))}
              placeholder="Your shop name"
              placeholderTextColor={colors.sellerSubText}
            />

            {/* Dynamic fields */}
            {INFO_ROWS.map(row => (
              <View key={row.key}>
                <Text style={styles.fieldLabel}>{row.label}</Text>
                <TextInput
                  style={[styles.fieldInput, row.multiline && styles.multiInput]}
                  value={draft[row.key]}
                  onChangeText={t => setDraft(p => ({ ...p, [row.key]: t }))}
                  placeholder={row.label}
                  placeholderTextColor={colors.sellerSubText}
                  multiline={!!row.multiline}
                  numberOfLines={row.multiline ? 4 : 1}
                  textAlignVertical={row.multiline ? 'top' : 'center'}
                />
              </View>
            ))}

            {/* Save Button at bottom */}
            <TouchableOpacity style={styles.saveBtn} onPress={saveEdit} activeOpacity={0.85}>
              <Text style={styles.saveBtnTxt}>Save Changes</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.sellerBg },
  scroll: { paddingBottom: hp('5%') },

  // Cover
  cover: {
    height: hp('18%'),
    backgroundColor: colors.sellerPrimary,
    justifyContent: 'flex-end',
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('1.5%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },
  coverOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.sellerDark,
    opacity: 0.35,
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
  },
  coverTitle: {
    fontSize: wp('5.5%'),
    fontFamily: 'Raleway-Bold',
    color: '#fff',
  },

  // Avatar
  avatarWrapper: {
    alignItems: 'center',
    marginTop: -wp('14%'),
    marginBottom: hp('1%'),
  },
  avatarRing: {
    width: wp('28%'),
    height: wp('28%'),
    borderRadius: wp('14%'),
    borderWidth: wp('1%'),
    borderColor: '#fff',
    overflow: 'hidden',
    elevation: 8,
    backgroundColor: '#fff',
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  avatarImg: { width: '100%', height: '100%' },
  avatarPlaceholder: {
    flex: 1,
    backgroundColor: colors.sellerLight,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: wp('9%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerPrimary,
  },

  // Name block
  nameBlock: { alignItems: 'center', paddingHorizontal: wp('5%') },
  shopName: {
    fontSize: wp('5.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginTop: hp('0.5%'),
    textAlign: 'center',
  },
  ownerSub: {
    fontSize: wp('3.5%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
    marginTop: hp('0.3%'),
  },
  badgesRow: {
    flexDirection: 'row',
    gap: wp('2%'),
    marginTop: hp('1%'),
  },
  badgeGreen: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('5%'),
  },
  badgeGreenTxt: {
    fontSize: wp('3%'),
    color: colors.sellerSuccess,
    fontFamily: 'NunitoSans-SemiBold',
  },
  badgePrimary: {
    backgroundColor: colors.sellerLight,
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('5%'),
  },
  badgePrimaryTxt: {
    fontSize: wp('3%'),
    color: colors.sellerPrimary,
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Stats row
  statsRow: {
    flexDirection: 'row',
    backgroundColor: colors.sellerCard,
    marginHorizontal: wp('4%'),
    marginVertical: hp('2%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('2%'),
    elevation: 4,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statMiddle: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.sellerBorder,
  },
  statValue: {
    fontSize: wp('5%'),
    fontFamily: 'Raleway-Bold',
  },
  statLabel: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
    marginTop: hp('0.3%'),
  },

  // Info card
  infoCard: {
    backgroundColor: colors.sellerCard,
    marginHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    padding: wp('4%'),
    elevation: 3,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  cardTitle: {
    fontSize: wp('4%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginBottom: hp('1%'),
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: hp('1.2%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    gap: wp('3%'),
  },
  rowIcon: { fontSize: wp('4.5%'), marginTop: hp('0.2%') },
  rowTexts: { flex: 1 },
  rowLabel: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: hp('0.2%'),
  },
  rowValue: {
    fontSize: wp('3.5%'),
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.sellerText,
  },

  // Edit button
  editBtn: {
    backgroundColor: colors.sellerPrimary,
    marginHorizontal: wp('4%'),
    marginTop: hp('2.5%'),
    borderRadius: wp('3%'),
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
    elevation: 5,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  editBtnTxt: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Raleway-Bold',
  },

  // ── MODAL ──────────────────────────────────────────────────────
  modalRoot: { flex: 1, backgroundColor: colors.sellerBg },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    elevation: 3,
  },
  headerBtn: { minWidth: wp('15%') },
  cancelTxt: {
    fontSize: wp('3.8%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
  },
  modalTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },
  saveTxt: {
    fontSize: wp('3.8%'),
    color: colors.sellerPrimary,
    fontFamily: 'Raleway-Bold',
    textAlign: 'right',
  },
  modalScroll: {
    paddingHorizontal: wp('4%'),
    paddingBottom: hp('5%'),
    paddingTop: hp('1%'),
  },

  // Logo Picker
  logoPicker: { alignItems: 'center', marginVertical: hp('2.5%') },
  editLogoRing: {
    width: wp('25%'),
    height: wp('25%'),
    borderRadius: wp('12.5%'),
    overflow: 'hidden',
    borderWidth: wp('0.8%'),
    borderColor: colors.sellerPrimary,
    backgroundColor: colors.sellerLight,
  },
  cameraBadge: {
    position: 'absolute',
    bottom: 0,
    right: wp('34%'),
    backgroundColor: colors.sellerPrimary,
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  changePhotoHint: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
    marginTop: hp('1%'),
  },

  // Field
  fieldLabel: {
    fontSize: wp('3.2%'),
    color: colors.sellerText,
    fontFamily: 'NunitoSans-SemiBold',
    marginTop: hp('1.5%'),
    marginBottom: hp('0.5%'),
  },
  fieldInput: {
    backgroundColor: colors.sellerCard,
    borderRadius: wp('2.5%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.3%'),
    fontSize: wp('3.8%'),
    fontFamily: 'NunitoSans-Regular',
    color: colors.sellerText,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  multiInput: {
    height: hp('12%'),
    textAlignVertical: 'top',
  },

  saveBtn: {
    backgroundColor: colors.sellerPrimary,
    borderRadius: wp('3%'),
    paddingVertical: hp('1.8%'),
    alignItems: 'center',
    marginTop: hp('3%'),
    elevation: 4,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  saveBtnTxt: {
    color: '#fff',
    fontSize: wp('4%'),
    fontFamily: 'Raleway-Bold',
  },
});

export default SellerProfile;
