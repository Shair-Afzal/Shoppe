import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { UpdateProduct,GetAllCategories,DeleteProduct } from '../../../Redux/slices/Action/Productaction';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';


const CATEGORIES = ['Clothing', 'Shoes', 'Bags', 'Accessories', 'Electronics', 'Sportswear'];
const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const STATUSES = ['In Stock', 'Low Stock', 'Out of Stock'];

const STATUS_CLR = {
    'In Stock': { color: colors.sellerSuccess, bg: '#D1FAE5' },
    'Low Stock': { color: colors.sellerWarning, bg: '#FEF3C7' },
    'Out of Stock': { color: colors.sellerError, bg: '#FEE2E2' },
};

const EditProduct = ({ route, navigation }) => {
    const insets = useSafeAreaInsets();
    const product = route?.params?.product ?? {};
    const dispatch = useDispatch();
    const {loading,error,allcategories} = useSelector(state => state.product);
    const fetchdata=async()=>{
        try{
          const res=await dispatch(GetAllCategories()).unwrap()
          showSuccessToast("all data is fetch successfully")
         console.log(res)
          return res
        }catch(err){
          console.log(err)
          showErrorToast(err)
    
        }
      }
      useEffect(()=>{
        fetchdata()
      },[])
      const DeleteProductHandler= async (id)=>{
          try {
             await dispatch(DeleteProduct(id)).unwrap();
              showSuccessToast('Product deleted successfully!');
              navigation.goBack()
           
          } catch (err) {
      
            showErrorToast(err || 'Failed to delete product');
          }
        }
      


    // Pre-fill from route params
    const [name, setName] = useState(product.name ?? '');
    const [price, setPrice] = useState(product.price?.toString() ?? '');
    const [description, setDescription] = useState(product.description ?? '');
    const [stock, setStock] = useState(product.stock?.toString() ?? '');
    const [selectedCat, setSelectedCat] = useState(product.categoryId ?? '');
    const [selectedSizes, setSelectedSizes] = useState(product.size ? [product.size] : []);
    const [status, setStatus] = useState(product.status ?? 'In Stock');
    const [images, setImages] = useState(
  product.image ? product.image.map(img => ({ uri: img.uri, local: null })) : []
);
const [color,setcolor]=useState(product.color??'N/A')
const handlesumbit=async()=>{
        try {
           const res= await dispatch(UpdateProduct({
                id:product._id,
                name,
                price,
                description,
                color:color,
                size:selectedSizes[0]||'N/A',
                image:images.map(img=>img),
                stock,
                category:selectedCat,
            })).unwrap();
            showSuccessToast('Product updated successfully!');
            navigation.goBack();
            return res;
        } catch (error) {
            // console.error('Error updating product:', error);
            showErrorToast(error || 'Failed to update product. Please try again.');
        }
    };

    const MAX_IMAGES = 4;

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
                const newImgs = picked.map(img => ({ uri: img.path, local: null }));
                setImages(prev => [...prev, ...newImgs].slice(0, MAX_IMAGES));
            })
            .catch(err => {
                if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Could not open gallery.');
            });
    };

    const pickCrop = () => {
        if (images.length >= MAX_IMAGES) return Alert.alert('Limit', 'Maximum 6 images allowed.');
        ImageCropPicker.openPicker({
            width: 800, height: 800,
            cropping: true,
            compressImageQuality: 0.85,
        })
            .then(img => setImages(prev => [...prev, { uri: img.path, local: null }].slice(0, MAX_IMAGES)))
            .catch(err => {
                if (err.code !== 'E_PICKER_CANCELLED') Alert.alert('Error', 'Could not crop image.');
            });
    };

    const removeImg = idx => setImages(prev => prev.filter((_, i) => i !== idx));

    const toggleSize = sz =>
        setSelectedSizes(prev =>
            prev.includes(sz) ? prev.filter(s => s !== sz) : [...prev, sz],
        );

    const handleDelete = () => {
        Alert.alert(
            'Delete Product',
            'Are you sure you want to delete this product? This action cannot be undone.',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete', style: 'destructive',
                    onPress: () => navigation.goBack(),
                },
            ],
        );
    };

    const handleSave = () => {
        if (!name.trim()) return Alert.alert('Required', 'Enter product name');
        if (!price.trim()) return Alert.alert('Required', 'Enter price');

        Alert.alert('Saved ✅', 'Product updated successfully!', [
            { text: 'OK', onPress: () => navigation.goBack() },
        ]);
    };

   const getImgSource = img => {
  if (img.uri) return { uri: img.uri };
  if (img.local) return img.local; // keep as-is for local files
  return null;
};

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            {
                loading && <Loader />
            }
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Text style={styles.backIcon}>‹</Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Product</Text>
                <TouchableOpacity style={styles.deleteIconBtn} onPress={handleDelete}>
                    <Text style={styles.deleteIconTxt}>🗑️</Text>
                </TouchableOpacity>
            </View>

            <ScrollView
                contentContainerStyle={styles.scroll}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled">

                {/* ── Images ── */}
                <Text style={styles.label}>
                    Product Images <Text style={styles.hint}>(max {MAX_IMAGES})</Text>
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imgsRow}>
                    {images.map((img, idx) => {
                        const src = getImgSource(img);
                        return (
                            <View key={idx} style={styles.imgThumb}>
                                {src && (
                                    <Image source={src} style={styles.thumbImg} resizeMode="cover" />
                                )}
                                {idx === 0 && (
                                    <View style={styles.coverTag}>
                                        <Text style={styles.coverTxt}>Cover</Text>
                                    </View>
                                )}
                                <TouchableOpacity style={styles.removeBadge} onPress={() => removeImg(idx)}>
                                    <Text style={styles.removeX}>✕</Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}

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
                    placeholder="Product name"
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
                        <Text style={styles.label}>Stock Qty</Text>
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

                {/* ── Status ── */}
                <Text style={styles.label}>Status</Text>
                <View style={styles.statusRow}>
                    {STATUSES.map(s => {
                        const cfg = STATUS_CLR[s];
                        return (
                            <TouchableOpacity
                                key={s}
                                style={[
                                    styles.statusChip,
                                    { borderColor: cfg.color },
                                    status === s && { backgroundColor: cfg.bg },
                                ]}
                                onPress={() => setStatus(s)}>
                                <Text style={[styles.statusChipTxt, { color: cfg.color }]}>{s}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

                {/* ── Category ── */}
                <Text style={styles.label}>Category</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll}>
                    {allcategories.map(cat => (
                        <TouchableOpacity
                            key={cat._id}
                            style={[styles.chip, selectedCat === cat._id && styles.chipActive]}
                            onPress={() => setSelectedCat(cat._id)}>
                            <Text style={[styles.chipTxt, selectedCat === cat._id && styles.chipTxtActive]}>
                                {cat.name}
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
                    placeholder="Describe your product..."
                    placeholderTextColor={colors.sellerSubText}
                    multiline
                    numberOfLines={5}
                    textAlignVertical="top"
                />
                <View style={styles.halfField}>
                            <Text style={styles.label}>Colors</Text>
                            <TextInput
                              style={styles.input}
                              value={color}
                              onChangeText={setcolor}
                              placeholder="Color"
                              placeholderTextColor={colors.sellerSubText}
                              
                            />
                          </View>

                {/* ── Actions ── */}
                <TouchableOpacity style={styles.saveBtn} onPress={handlesumbit} activeOpacity={0.85}>
                    <Text style={styles.saveTxt}>💾  Save Changes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteBtn} onPress={() => DeleteProductHandler(product._id)} activeOpacity={0.85}>
                    <Text style={styles.deleteTxt}>🗑️  Delete Product</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.sellerBg },

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
    },
    backBtn: { width: wp('10%'), justifyContent: 'center' },
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
    deleteIconBtn: { width: wp('10%'), alignItems: 'flex-end' },
    deleteIconTxt: { fontSize: wp('5%') },

    scroll: {
        paddingHorizontal: wp('4%'),
        paddingTop: hp('2%'),
        paddingBottom: hp('6%'),
    },

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
    imgsRow: { flexDirection: 'row', marginBottom: hp('0.5%') },
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
    coverTxt: { color: '#fff', fontSize: wp('2.5%'), fontFamily: 'NunitoSans-SemiBold' },
    removeBadge: {
        position: 'absolute',
        top: wp('1.5%'), right: wp('1.5%'),
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: wp('5%'), height: wp('5%'),
        borderRadius: wp('2.5%'),
        justifyContent: 'center', alignItems: 'center',
    },
    removeX: { color: '#fff', fontSize: wp('2.5%') },

    addImgBox: {
        width: wp('22%'),
        height: wp('22%'),
        borderRadius: wp('3%'),
        borderWidth: 1.5,
        borderColor: colors.sellerPrimary,
        borderStyle: 'dashed',
        justifyContent: 'center', alignItems: 'center',
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
    textArea: { height: hp('14%'), textAlignVertical: 'top' },
    row: { flexDirection: 'row', alignItems: 'flex-start' },
    halfField: { flex: 1 },

    // Status
    statusRow: { flexDirection: 'row', flexWrap: 'wrap', gap: wp('2%'), marginBottom: hp('0.5%') },
    statusChip: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.8%'),
        borderRadius: wp('5%'),
        borderWidth: 1.5,
        backgroundColor: colors.sellerCard,
    },
    statusChipTxt: {
        fontSize: wp('3.2%'),
        fontFamily: 'NunitoSans-SemiBold',
    },

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
    chipActive: { backgroundColor: colors.sellerPrimary, borderColor: colors.sellerPrimary },
    chipTxt: {
        fontSize: wp('3.2%'),
        color: colors.sellerText,
        fontFamily: 'NunitoSans-Regular',
    },
    chipTxtActive: { color: '#fff', fontFamily: 'NunitoSans-SemiBold' },

    // Sizes
    sizeWrap: { flexDirection: 'row', flexWrap: 'wrap', gap: wp('2.5%'), marginBottom: hp('0.5%') },
    sizeBox: {
        width: wp('13%'),
        height: wp('10%'),
        borderRadius: wp('2.5%'),
        borderWidth: 1.5,
        borderColor: colors.sellerBorder,
        justifyContent: 'center', alignItems: 'center',
        backgroundColor: colors.sellerCard,
    },
    sizeBoxActive: { backgroundColor: colors.sellerPrimary, borderColor: colors.sellerPrimary },
    sizeTxt: { fontSize: wp('3.2%'), color: colors.sellerText, fontFamily: 'NunitoSans-SemiBold' },
    sizeTxtActive: { color: '#fff' },

    // Buttons
    saveBtn: {
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
    saveTxt: { color: '#fff', fontSize: wp('4.2%'), fontFamily: 'Raleway-Bold' },

    deleteBtn: {
        backgroundColor: '#FEE2E2',
        paddingVertical: hp('1.8%'),
        borderRadius: wp('3%'),
        alignItems: 'center',
        marginTop: hp('1.5%'),
        borderWidth: 1,
        borderColor: colors.sellerError,
    },
    deleteTxt: { color: colors.sellerError, fontSize: wp('4%'), fontFamily: 'Raleway-Bold' },
});

export default EditProduct;
