import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ImageCropPicker from 'react-native-image-crop-picker';
import { wp, hp, colors } from '../../../Constant';

const CATEGORIES = ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Electronics', 'Sportswear'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

const CreateProduct = ({ navigation }) => {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [stock, setStock] = useState('');
  const [selectedCat, setSelectedCat] = useState('');
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [images, setImages] = useState([]);

  const MAX_IMAGES = 6;

  // ── Gallery multi-pick ────────────────────────────────────────────────────
  const pickGallery = () => {
    const remaining = MAX_IMAGES - images.length;
    if (remaining <= 0) return Alert.alert('Limit', 'Maximum 6 images allowed.');

    ImageCropPicker.openPicker({
      multiple: true,
      maxFiles: remaining,
      cropping: false,
      compressImageQuality: 0.8,
      mediaType: 'photo',
    })
      .then(picked => {
        const newImgs = picked.map(img => ({ uri: img.path }));
        setImages(prev => [...prev, ...newImgs].slice(0, MAX_IMAGES));
      })
      .catch(err => {
        if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Could not open gallery.');
      });
  };

  // ── Crop single image ─────────────────────────────────────────────────────
  const pickCrop = () => {
    if (images.length >= MAX_IMAGES) return Alert.alert('Limit', 'Maximum 6 images allowed.');
    ImageCropPicker.openPicker({
      width: 800, height: 800,
      cropping: true,
      compressImageQuality: 0.85,
    })
      .then(img => setImages(prev => [...prev, { uri: img.path }].slice(0, MAX_IMAGES)))
      .catch(err => {
        if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Could not crop image.');
      });
  };

  const removeImg = idx => setImages(prev => prev.filter((_, i) => i !== idx));

  const toggleSize = sz =>
    setSelectedSizes(prev =>
      prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz],
    );

  const handleSubmit = () => {
    if (!name.trim()) return Alert.alert('Required', 'Enter product name');
    if (!price.trim()) return Alert.alert('Required', 'Enter product price');
    if (!images.length) return Alert.alert('Required', 'Add at least one image');

    Alert.alert('Success ✅', 'Product published successfully!', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Product</Text>
        <View style={{ width: wp('10%') }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled">

        {/* ── Images ── */}
        <Text style={styles.label}>Product Images
          <Text style={styles.hint}>  (max {MAX_IMAGES})</Text>
        </Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imgsRow}>
          {images.map((img, idx) => (
            <View key={idx} style={styles.imgThumb}>
              <Image source={{ uri: img.uri }} style={styles.thumbImg} resizeMode="cover" />
              {idx === 0 && <View style={styles.coverTag}><Text style={styles.coverTxt}>Cover</Text></View>}
              <TouchableOpacity style={styles.removeBadge} onPress={() => removeImg(idx)}>
                <Text style={styles.removeX}>✕</Text>
              </TouchableOpacity>
            </View>
          ))}

          {images.length < MAX_IMAGES && (
            <>
              <TouchableOpacity style={styles.addImgBox} onPress={pickGallery}>
                <Text style={styles.addImgEmoji}>🖼️</Text>
                <Text style={styles.addImgLbl}>Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.addImgBox} onPress={pickCrop}>
                <Text style={styles.addImgEmoji}>✂️</Text>
                <Text style={styles.addImgLbl}>Crop</Text>
              </TouchableOpacity>
            </>
          )}
        </ScrollView>

        {/* ── Product Name ── */}
        <Text style={styles.label}>Product Name <Text style={styles.req}>*</Text></Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="e.g. Nike Air Max 270"
          placeholderTextColor={colors.sellerSubText}
        />

        {/* ── Price & Stock ── */}
        <View style={styles.row}>
          <View style={styles.halfField}>
            <Text style={styles.label}>Price ($) <Text style={styles.req}>*</Text></Text>
            <TextInput
              style={styles.input}
              value={price}
              onChangeText={setPrice}
              placeholder="0.00"
              placeholderTextColor={colors.sellerSubText}
              keyboardType="numeric"
            />
          </View>
          <View style={{ width: wp('3%') }} />
          <View style={styles.halfField}>
            <Text style={styles.label}>Stock</Text>
            <TextInput
              style={styles.input}
              value={stock}
              onChangeText={setStock}
              placeholder="Qty"
              placeholderTextColor={colors.sellerSubText}
              keyboardType="numeric"
            />
          </View>
        </View>

        {/* ── Category ── */}
        <Text style={styles.label}>Category</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.chip, selectedCat === cat && styles.chipActive]}
              onPress={() => setSelectedCat(cat)}>
              <Text style={[styles.chipTxt, selectedCat === cat && styles.chipTxtActive]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Sizes ── */}
        <Text style={styles.label}>Available Sizes</Text>
        <View style={styles.sizeWrap}>
          {SIZES.map(sz => (
            <TouchableOpacity
              key={sz}
              style={[styles.sizeBox, selectedSizes.includes(sz) && styles.sizeBoxActive]}
              onPress={() => toggleSize(sz)}>
              <Text style={[styles.sizeTxt, selectedSizes.includes(sz) && styles.sizeTxtActive]}>
                {sz}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Description ── */}
        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Describe your product features, material, etc."
          placeholderTextColor={colors.sellerSubText}
          multiline
          numberOfLines={5}
          textAlignVertical="top"
        />

        {/* ── Submit ── */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit} activeOpacity={0.85}>
          <Text style={styles.submitTxt}>🚀  Publish Product</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.sellerBg },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.sellerCard,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  backBtn: {
    width: wp('10%'),
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: wp('7%'),
    color: colors.sellerText,
    fontFamily: 'Raleway-Bold',
    lineHeight: wp('8%'),
  },
  headerTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },

  scroll: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('6%'),
  },

  // Labels
  label: {
    fontSize: wp('3.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginTop: hp('1.5%'),
    marginBottom: hp('0.7%'),
  },
  hint: {
    fontSize: wp('3%'),
    fontFamily: 'NunitoSans-Regular',
    color: colors.sellerSubText,
  },
  req: { color: colors.sellerError },

  // Images
  imgsRow: { flexDirection: 'row', marginBottom: hp('1%') },
  imgThumb: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('3%'),
    marginRight: wp('2.5%'),
    overflow: 'hidden',
    backgroundColor: colors.sellerLight,
    position: 'relative',
  },
  thumbImg: { width: '100%', height: '100%' },
  coverTag: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    backgroundColor: 'rgba(79,70,229,0.82)',
    paddingVertical: hp('0.3%'),
    alignItems: 'center',
  },
  coverTxt: {
    color: '#fff',
    fontSize: wp('2.5%'),
    fontFamily: 'NunitoSans-SemiBold',
  },
  removeBadge: {
    position: 'absolute',
    top: wp('1.5%'),
    right: wp('1.5%'),
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: wp('5%'),
    height: wp('5%'),
    borderRadius: wp('2.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeX: { color: '#fff', fontSize: wp('2.5%') },

  addImgBox: {
    width: wp('22%'),
    height: wp('22%'),
    borderRadius: wp('3%'),
    borderWidth: 1.5,
    borderColor: colors.sellerPrimary,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sellerLight,
    marginRight: wp('2.5%'),
  },
  addImgEmoji: { fontSize: wp('5%') },
  addImgLbl: {
    fontSize: wp('2.8%'),
    color: colors.sellerPrimary,
    fontFamily: 'NunitoSans-SemiBold',
    marginTop: hp('0.3%'),
  },

  // Inputs
  input: {
    backgroundColor: colors.sellerCard,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.3%'),
    fontSize: wp('3.7%'),
    fontFamily: 'NunitoSans-Regular',
    color: colors.sellerText,
  },
  textArea: {
    height: hp('14%'),
    textAlignVertical: 'top',
  },
  row: { flexDirection: 'row', alignItems: 'flex-start' },
  halfField: { flex: 1 },

  // Chips
  chipsScroll: { flexDirection: 'row', marginBottom: hp('0.5%') },
  chip: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('0.8%'),
    borderRadius: wp('5%'),
    backgroundColor: colors.sellerCard,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
    marginRight: wp('2%'),
  },
  chipActive: {
    backgroundColor: colors.sellerPrimary,
    borderColor: colors.sellerPrimary,
  },
  chipTxt: {
    fontSize: wp('3.2%'),
    color: colors.sellerText,
    fontFamily: 'NunitoSans-Regular',
  },
  chipTxtActive: {
    color: '#fff',
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Sizes
  sizeWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('2.5%'),
    marginBottom: hp('0.5%'),
  },
  sizeBox: {
    width: wp('13%'),
    height: wp('10%'),
    borderRadius: wp('2.5%'),
    borderWidth: 1.5,
    borderColor: colors.sellerBorder,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.sellerCard,
  },
  sizeBoxActive: {
    backgroundColor: colors.sellerPrimary,
    borderColor: colors.sellerPrimary,
  },
  sizeTxt: {
    fontSize: wp('3.2%'),
    color: colors.sellerText,
    fontFamily: 'NunitoSans-SemiBold',
  },
  sizeTxtActive: { color: '#fff' },

  // Submit
  submitBtn: {
    backgroundColor: colors.sellerPrimary,
    paddingVertical: hp('1.8%'),
    borderRadius: wp('3%'),
    alignItems: 'center',
    marginTop: hp('3%'),
    elevation: 5,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  submitTxt: {
    color: '#fff',
    fontSize: wp('4.2%'),
    fontFamily: 'Raleway-Bold',
  },
});

export default CreateProduct;
