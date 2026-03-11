import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp, hp, colors } from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import ProductIcon from '../../../assets/SVG/ImageIcon.svg';
import DeleteIcon from '../../../assets/SVG/Deleteicon.svg';

const productsData = [
    { id: 'p1', name: 'Nike Air Max 270', seller: 'TechShop PK', price: '$120', category: 'Shoes', stock: 15, status: 'Active', added: 'Mar 8, 2025' },
    { id: 'p2', name: 'Casual Cotton T-Shirt', seller: 'FashionZone', price: '$17', category: 'Clothing', stock: 42, status: 'Active', added: 'Mar 7, 2025' },
    { id: 'p3', name: 'iPhone 15 Case', seller: 'GadgetHub', price: '$12', category: 'Accessories', stock: 0, status: 'Flagged', added: 'Mar 6, 2025' },
    { id: 'p4', name: 'Wooden Wall Clock', seller: 'HomeDecorPK', price: '$45', category: 'Home', stock: 8, status: 'Active', added: 'Mar 5, 2025' },
    { id: 'p5', name: 'Running Shoes X200', seller: 'ShoesMart', price: '$89', category: 'Shoes', stock: 0, status: 'Removed', added: 'Mar 2, 2025' },
    { id: 'p6', name: 'Formal Slim-Fit Shirt', seller: 'FashionZone', price: '$32', category: 'Clothing', stock: 20, status: 'Active', added: 'Mar 1, 2025' },
];

const STATUS_CFG = {
    Active: { color: colors.sellerSuccess, bg: '#D1FAE5' },
    Flagged: { color: colors.sellerWarning, bg: '#FEF3C7' },
    Removed: { color: colors.sellerError, bg: '#FEE2E2' },
};

const FILTERS = ['All', 'Active', 'Flagged', 'Removed'];

const ManageProducts = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');
    const [products, setProducts] = useState(productsData);

    const filtered = products.filter(p => {
        const matchSearch =
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.seller.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === 'All' || p.status === activeFilter;
        return matchSearch && matchFilter;
    });

    const changeStatus = (id, newStatus) => {
        setProducts(prev =>
            prev.map(p => (p.id === id ? { ...p, status: newStatus } : p)),
        );
    };

    const renderProduct = ({ item }) => {
        const sc = STATUS_CFG[item.status] || STATUS_CFG.Active;
        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.productIconWrap}>
                        <ProductIcon width={wp('7%')} height={wp('7%')} />
                    </View>
                    <View style={styles.productInfo}>
                        <Text style={styles.productName} numberOfLines={1}>{item.name}</Text>
                        <Text style={styles.sellerTxt}>By: {item.seller}</Text>
                        <Text style={styles.metaTxt}>{item.category} • Added {item.added}</Text>
                    </View>
                    <View style={styles.rightBlock}>
                        <Text style={styles.priceLabel}>{item.price}</Text>
                        <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                            <Text style={[styles.statusTxt, { color: sc.color }]}>{item.status}</Text>
                        </View>
                        <Text style={[styles.stockTxt, { color: item.stock === 0 ? colors.sellerError : colors.sellerSubText }]}>
                            Stock: {item.stock}
                        </Text>
                    </View>
                </View>

                <View style={styles.actionRow}>
                    {item.status !== 'Active' && (
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: '#D1FAE5', borderColor: colors.sellerSuccess }]}
                            onPress={() => changeStatus(item.id, 'Active')}
                            activeOpacity={0.8}>
                            <Text style={[styles.actionBtnTxt, { color: colors.sellerSuccess }]}>✓ Activate</Text>
                        </TouchableOpacity>
                    )}
                    {item.status !== 'Flagged' && (
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: '#FEF3C7', borderColor: colors.sellerWarning }]}
                            onPress={() => changeStatus(item.id, 'Flagged')}
                            activeOpacity={0.8}>
                            <Text style={[styles.actionBtnTxt, { color: colors.sellerWarning }]}>⚑ Flag</Text>
                        </TouchableOpacity>
                    )}
                    {item.status !== 'Removed' && (
                        <TouchableOpacity
                            style={[styles.actionBtn, { backgroundColor: '#FEE2E2', borderColor: colors.sellerError }]}
                            onPress={() => changeStatus(item.id, 'Removed')}
                            activeOpacity={0.8}>
                            <DeleteIcon width={wp('4%')} height={wp('4%')} />
                            <Text style={[styles.actionBtnTxt, { color: colors.sellerError }]}> Remove</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.sellerDark} />

            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                    <LeftArrow width={wp('5%')} height={wp('5%')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Products</Text>
                <View style={styles.countPill}>
                    <Text style={styles.countTxt}>{products.length}</Text>
                </View>
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search products or sellers…"
                    placeholderTextColor={colors.sellerSubText}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <FlatList
                data={FILTERS}
                horizontal
                keyExtractor={f => f}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterRow}
                renderItem={({ item: f }) => {
                    const isActive = f === activeFilter;
                    return (
                        <TouchableOpacity
                            style={[styles.filterChip, isActive && styles.filterChipActive]}
                            onPress={() => setActiveFilter(f)}
                            activeOpacity={0.75}>
                            <Text style={[styles.filterChipTxt, isActive && styles.filterChipTxtActive]}>{f}</Text>
                        </TouchableOpacity>
                    );
                }}
            />

            <FlatList
                data={filtered}
                keyExtractor={item => item.id}
                renderItem={renderProduct}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    root: { flex: 1, backgroundColor: colors.sellerBg },

    header: {
        backgroundColor: colors.sellerDark,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.8%'),
        borderBottomLeftRadius: wp('5%'),
        borderBottomRightRadius: wp('5%'),
        gap: wp('3%'),
        elevation: 8,
        shadowColor: colors.sellerDark,
        shadowOpacity: 0.3,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 10,
    },
    backBtn: {
        backgroundColor: 'rgba(255,255,255,0.15)',
        borderRadius: wp('2.5%'),
        padding: wp('2%'),
    },
    headerTitle: { flex: 1, fontSize: wp('4.5%'), fontFamily: 'Raleway-Bold', color: '#FFFFFF' },
    countPill: {
        backgroundColor: colors.sellerWarning,
        borderRadius: wp('5%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.4%'),
    },
    countTxt: { fontSize: wp('3%'), fontFamily: 'Raleway-Bold', color: '#fff' },

    searchWrap: { marginHorizontal: wp('4%'), marginTop: hp('2%') },
    searchInput: {
        backgroundColor: colors.sellerCard,
        borderRadius: wp('3%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.3%'),
        fontSize: wp('3.5%'),
        fontFamily: 'NunitoSans-Regular',
        color: colors.sellerText,
        borderWidth: 1,
        borderColor: colors.sellerBorder,
        elevation: 2,
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
    },

    filterRow: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('1.5%'),
        gap: wp('2%'),
    },
    filterChip: {
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.7%'),
        borderRadius: wp('5%'),
        backgroundColor: colors.sellerCard,
        borderWidth: 1,
        borderColor: colors.sellerBorder,
    },
    filterChipActive: { backgroundColor: colors.sellerPrimary, borderColor: colors.sellerPrimary },
    filterChipTxt: { fontSize: wp('3%'), fontFamily: 'NunitoSans-SemiBold', color: colors.sellerSubText },
    filterChipTxtActive: { color: '#fff' },

    list: { paddingHorizontal: wp('4%'), paddingBottom: hp('4%'), gap: wp('3%') },

    card: {
        backgroundColor: colors.sellerCard,
        borderRadius: wp('4%'),
        padding: wp('4%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 7,
        borderLeftWidth: 3,
        borderLeftColor: colors.sellerWarning,
    },
    cardTop: { flexDirection: 'row', gap: wp('3%'), marginBottom: hp('1.2%') },
    productIconWrap: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('3%'),
        backgroundColor: '#FEF3C7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productInfo: { flex: 1 },
    productName: { fontSize: wp('3.5%'), fontFamily: 'Raleway-Bold', color: colors.sellerText },
    sellerTxt: { fontSize: wp('2.8%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText, marginTop: hp('0.2%') },
    metaTxt: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText },

    rightBlock: { alignItems: 'flex-end', gap: hp('0.4%') },
    priceLabel: { fontSize: wp('3.8%'), fontFamily: 'Raleway-Bold', color: colors.sellerPrimary },
    statusBadge: { borderRadius: wp('5%'), paddingHorizontal: wp('2.5%'), paddingVertical: hp('0.2%') },
    statusTxt: { fontSize: wp('2.4%'), fontFamily: 'NunitoSans-SemiBold' },
    stockTxt: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-Regular' },

    actionRow: {
        flexDirection: 'row',
        gap: wp('2%'),
        borderTopWidth: 1,
        borderTopColor: colors.sellerBorder,
        paddingTop: hp('1%'),
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.6%'),
        borderWidth: 1,
    },
    actionBtnTxt: { fontSize: wp('2.8%'), fontFamily: 'NunitoSans-SemiBold' },
});

export default ManageProducts;
