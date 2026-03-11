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
import OrderIcon from '../../../assets/SVG/Activecart.svg';

const ordersData = [
    { id: 'o1', orderId: '#ORD-5821', buyer: 'Ali Hassan', seller: 'TechShop PK', amount: '$120', status: 'Delivered', date: 'Mar 10, 2025', items: 2 },
    { id: 'o2', orderId: '#ORD-5820', buyer: 'Sara Khan', seller: 'FashionZone', amount: '$48', status: 'Processing', date: 'Mar 10, 2025', items: 1 },
    { id: 'o3', orderId: '#ORD-5819', buyer: 'Usman Tariq', seller: 'GadgetHub', amount: '$310', status: 'Shipped', date: 'Mar 9, 2025', items: 3 },
    { id: 'o4', orderId: '#ORD-5818', buyer: 'Hina Malik', seller: 'HomeDecorPK', amount: '$75', status: 'Cancelled', date: 'Mar 8, 2025', items: 1 },
    { id: 'o5', orderId: '#ORD-5817', buyer: 'Zaid Raza', seller: 'ShoesMart', amount: '$89', status: 'Delivered', date: 'Mar 7, 2025', items: 1 },
    { id: 'o6', orderId: '#ORD-5816', buyer: 'Nadia Iqbal', seller: 'FashionZone', amount: '$212', status: 'Processing', date: 'Mar 7, 2025', items: 4 },
];

const STATUS_CFG = {
    Delivered: { color: colors.sellerSuccess, bg: '#D1FAE5' },
    Processing: { color: colors.sellerWarning, bg: '#FEF3C7' },
    Shipped: { color: colors.sellerAccent, bg: '#CFFAFE' },
    Cancelled: { color: colors.sellerError, bg: '#FEE2E2' },
};

const FILTERS = ['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const ManageOrders = ({ navigation }) => {
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    const [activeFilter, setActiveFilter] = useState('All');

    const filtered = ordersData.filter(o => {
        const matchSearch =
            o.orderId.toLowerCase().includes(search.toLowerCase()) ||
            o.buyer.toLowerCase().includes(search.toLowerCase());
        const matchFilter = activeFilter === 'All' || o.status === activeFilter;
        return matchSearch && matchFilter;
    });

    const renderOrder = ({ item }) => {
        const sc = STATUS_CFG[item.status] || STATUS_CFG.Processing;
        return (
            <View style={styles.card}>
                <View style={styles.cardHeader}>
                    <View style={styles.orderIconWrap}>
                        <OrderIcon width={wp('6%')} height={wp('6%')} />
                    </View>
                    <View style={styles.orderInfo}>
                        <Text style={styles.orderId}>{item.orderId}</Text>
                        <Text style={styles.orderDate}>{item.date}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                        <Text style={[styles.statusTxt, { color: sc.color }]}>{item.status}</Text>
                    </View>
                </View>

                <View style={styles.divider} />

                <View style={styles.detailRow}>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Buyer</Text>
                        <Text style={styles.detailVal}>{item.buyer}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Seller</Text>
                        <Text style={styles.detailVal}>{item.seller}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Items</Text>
                        <Text style={styles.detailVal}>{item.items}</Text>
                    </View>
                    <View style={styles.detailCol}>
                        <Text style={styles.detailLabel}>Amount</Text>
                        <Text style={[styles.detailVal, { color: colors.sellerPrimary }]}>{item.amount}</Text>
                    </View>
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
                <Text style={styles.headerTitle}>Manage Orders</Text>
                <View style={styles.countPill}>
                    <Text style={styles.countTxt}>{ordersData.length}</Text>
                </View>
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by Order ID or Buyer…"
                    placeholderTextColor={colors.sellerSubText}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Filter Chips */}
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
                renderItem={renderOrder}
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
        backgroundColor: colors.sellerSuccess,
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
    filterChipActive: {
        backgroundColor: colors.sellerPrimary,
        borderColor: colors.sellerPrimary,
    },
    filterChipTxt: {
        fontSize: wp('3%'),
        fontFamily: 'NunitoSans-SemiBold',
        color: colors.sellerSubText,
    },
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
        borderLeftColor: colors.sellerSuccess,
    },
    cardHeader: { flexDirection: 'row', alignItems: 'center', gap: wp('3%') },
    orderIconWrap: {
        width: wp('10%'),
        height: wp('10%'),
        borderRadius: wp('5%'),
        backgroundColor: '#D1FAE5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    orderInfo: { flex: 1 },
    orderId: { fontSize: wp('3.8%'), fontFamily: 'Raleway-Bold', color: colors.sellerText },
    orderDate: { fontSize: wp('2.8%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText },
    statusBadge: { borderRadius: wp('5%'), paddingHorizontal: wp('2.5%'), paddingVertical: hp('0.3%') },
    statusTxt: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-SemiBold' },

    divider: { height: 1, backgroundColor: colors.sellerBorder, marginVertical: hp('1.2%') },

    detailRow: { flexDirection: 'row', justifyContent: 'space-between' },
    detailCol: { alignItems: 'center', flex: 1 },
    detailLabel: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText },
    detailVal: { fontSize: wp('3%'), fontFamily: 'Raleway-Bold', color: colors.sellerText, marginTop: hp('0.2%') },
});

export default ManageOrders;
