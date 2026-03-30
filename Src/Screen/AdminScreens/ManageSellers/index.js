import React, { useEffect, useState } from 'react';
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
import { wp, hp, colors, fontSize, fontFamily, radius } from '../../../Constant';
import LeftArrow from '../../../assets/SVG/Leftarrow.svg';
import ActiveProfile from '../../../assets/SVG/Activeprofile.svg';
import { AllSellers } from '../../../Redux/slices/Action/Authaction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../Component/Loader/Loader';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { SellerStatus } from '../../../Redux/slices/Action/Authaction';


const sellersData = [
    { id: 'sl1', name: 'TechShop PK', owner: 'Kamran Mirza', email: 'kamran@techshop.pk', products: 48, revenue: '$4,200', status: 'Approved', joined: 'Oct 2024' },
    { id: 'sl2', name: 'FashionZone', owner: 'Huma Farooqi', email: 'huma@fz.pk', products: 120, revenue: '$12,800', status: 'Approved', joined: 'Sep 2024' },
    { id: 'sl3', name: 'GadgetHub', owner: 'Naeem Siddiqui', email: 'naeem@gh.pk', products: 32, revenue: '$6,500', status: 'Pending', joined: 'Feb 2025' },
    { id: 'sl4', name: 'HomeDecorPK', owner: 'Layla Baig', email: 'layla@homedecor.pk', products: 65, revenue: '$9,100', status: 'Approved', joined: 'Nov 2024' },
    { id: 'sl5', name: 'ShoesMart', owner: 'Asad Qureshi', email: 'asad@shoesmart.pk', products: 0, revenue: '$0', status: 'Rejected', joined: 'Mar 2025' },
];

const STATUS_COLOR = {
    Approved: { color: colors.sellerSuccess, bg: '#D1FAE5' },
    Pending: { color: colors.sellerWarning, bg: '#FEF3C7' },
    Rejected: { color: colors.sellerError, bg: '#FEE2E2' },
};

const ManageSellers = ({ navigation }) => {
    
    
    const insets = useSafeAreaInsets();
    const {scurrentpage,stotalpage,sisfetchmore,allSellers,loading}=useSelector(state => state.user)
    const disptach=useDispatch()

    const fetchdata=async ()=>{
        try{
            const res=await disptach(AllSellers({page:1,limit:3})).unwrap()
 showSuccessToast("data is fectch successfully")
        console.log("data",allSellers)
        return res


       }catch(err){
        showErrorToast(err)
        }
    }
    useEffect(()=>{
        fetchdata()
    },[])
    const loadMore = async () => {
      if (scurrentpage <stotalpage && sisfetchmore) {
        await disptach(AllUsers({ page: scurrentpage + 1, limit: 3 }));
      }
    };
    const handleStatusChange = async (sellerId, status) => {
  try {
    await disptach(SellerStatus({ sellerId, status })).unwrap();
    showSuccessToast(`Seller ${status} successfully`);
  } catch (err) {
    showErrorToast(err);
  }
};
        const [search, setSearch] = useState('');
    // const [sellers, setSellers] = useState(sellersData);
    const sellers=allSellers

    const filtered = sellers.filter(
        s =>
            s.shopName.toLowerCase().includes(search.toLowerCase()) ||
            s.email.toLowerCase().includes(search.toLowerCase()),
    );

    const changeStatus = (id, newStatus) => {
        setSellers(prev =>
            prev.map(s => (s.id === id ? { ...s, status: newStatus } : s)),
        );
    };

    const renderSeller = ({ item }) => {
        const sc = STATUS_COLOR[item.status] || STATUS_COLOR.Pending;
        return (
            <View style={styles.card}>
                <View style={styles.cardTop}>
                    <View style={styles.shopIconWrap}>
                        <ActiveProfile width={wp('8%')} height={wp('8%')} />
                    </View>
                    <View style={styles.shopInfo}>
                        <Text style={styles.shopName}>{item?.shopName}</Text>
                        <Text style={styles.ownerTxt}>Owner: {item?.user?.username}</Text>
                        <Text style={styles.emailTxt}>{item?.user?.email}</Text>
                    </View>
                    <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
                        <Text style={[styles.statusTxt, { color: sc.color }]}>{item?.status}</Text>
                    </View>
                </View>

                <View style={styles.metaRow}>
                    <View style={styles.metaChip}>
                        <Text style={styles.metaVal}>{item.products||0}</Text>
                        <Text style={styles.metaLabel}>Products</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaChip}>
                        <Text style={styles.metaVal}>{item.revenue||0}</Text>
                        <Text style={styles.metaLabel}>Revenue</Text>
                    </View>
                    <View style={styles.metaDivider} />
                    <View style={styles.metaChip}>
                        <Text style={styles.metaVal}>{item.joined}</Text>
                        <Text style={styles.metaLabel}>Joined</Text>
                    </View>
                </View>

                {item.status === 'pending' && (
                    <View style={styles.actionRow}>
                        <TouchableOpacity
                            style={[styles.actBtn, { backgroundColor: colors.sellerSuccess }]}
                            onPress={() => handleStatusChange(item._id, 'approved')}
                            activeOpacity={0.8}>
                            <Text style={styles.actBtnTxt}>✓ Approve</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.actBtn, { backgroundColor: colors.sellerError }]}
                            onPress={() => handleStatusChange(item._id, 'rejected')}
                            activeOpacity={0.8}>
                            <Text style={styles.actBtnTxt}>✕ Reject</Text>
                        </TouchableOpacity>
                    </View>
                )}
                {item.status === 'approved' && (
                    <TouchableOpacity
                        style={[styles.actBtnFull, { backgroundColor: '#FEE2E2', borderColor: colors.sellerError }]}
                        onPress={() => handleStatusChange(item._id, 'rejected')}
                        activeOpacity={0.8}>
                        <Text style={[styles.actBtnFullTxt, { color: colors.sellerError }]}>Suspend Seller</Text>
                    </TouchableOpacity>
                )}
                {item.status === 'rejected' && (
                    <TouchableOpacity
                        style={[styles.actBtnFull, { backgroundColor: '#D1FAE5', borderColor: colors.sellerSuccess }]}
                        onPress={() => handleStatusChange(item._id, 'approved')}
                        activeOpacity={0.8}>
                        <Text style={[styles.actBtnFullTxt, { color: colors.sellerSuccess }]}>Reinstate Seller</Text>
                    </TouchableOpacity>
                )}
            </View>
        );
    };

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>
            <StatusBar barStyle="light-content" backgroundColor={colors.sellerDark} />
               {loading&&<Loader/>}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                    <LeftArrow width={wp('5%')} height={wp('5%')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Sellers</Text>
                <View style={styles.countPill}>
                    <Text style={styles.countTxt}>{sellers.length}</Text>
                </View>
            </View>

            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search shops or owners…"
                    placeholderTextColor={colors.sellerSubText}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            <View style={styles.summaryRow}>
                {Object.entries(STATUS_COLOR).map(([key, val]) => (
                    <View key={key} style={[styles.chip, { backgroundColor: val.bg }]}>
                        <Text style={[styles.chipTxt, { color: val.color }]}>
                            {key}: {sellers.filter(s => s.status === key).length}
                        </Text>
                    </View>
                ))}
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item._id}
                renderItem={renderSeller}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                  onEndReachedThreshold={0.5}
                                ListFooterComponent={
                    sisfetchmore ? <ActivityIndicator size="small" /> : null
                  }
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
    headerTitle: {
        flex: 1,
        fontSize: wp('4.5%'),
        fontFamily: 'Raleway-Bold',
        color: '#FFFFFF',
    },
    countPill: {
        backgroundColor: colors.sellerAccent,
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

    summaryRow: {
        flexDirection: 'row',
        gap: wp('2%'),
        marginHorizontal: wp('4%'),
        marginTop: hp('1.5%'),
        marginBottom: hp('1%'),
    },
    chip: { borderRadius: wp('5%'), paddingHorizontal: wp('3%'), paddingVertical: hp('0.4%') },
    chipTxt: { fontSize: wp('2.8%'), fontFamily: 'NunitoSans-SemiBold' },

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
        borderLeftColor: colors.sellerAccent,
    },
    cardTop: { flexDirection: 'row', alignItems: 'flex-start', gap: wp('3%'), marginBottom: hp('1.5%') },
    shopIconWrap: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        backgroundColor: '#CFFAFE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    shopInfo: { flex: 1 },
    shopName: { fontSize: wp('3.8%'), fontFamily: 'Raleway-Bold', color: colors.sellerText },
    ownerTxt: { fontSize: wp('2.8%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText, marginTop: hp('0.2%') },
    emailTxt: { fontSize: wp('2.6%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText },
    statusBadge: { borderRadius: wp('5%'), paddingHorizontal: wp('2.5%'), paddingVertical: hp('0.3%'), alignSelf: 'flex-start' },
    statusTxt: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-SemiBold' },

    metaRow: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.sellerBg,
        borderRadius: wp('3%'),
        paddingVertical: hp('1%'),
        marginBottom: hp('1.2%'),
    },
    metaChip: { flex: 1, alignItems: 'center' },
    metaVal: { fontSize: wp('3.5%'), fontFamily: 'Raleway-Bold', color: colors.sellerText },
    metaLabel: { fontSize: wp('2.5%'), fontFamily: 'NunitoSans-Regular', color: colors.sellerSubText },
    metaDivider: { width: 1, height: hp('3%'), backgroundColor: colors.sellerBorder },

    actionRow: { flexDirection: 'row', gap: wp('3%') },
    actBtn: {
        flex: 1, borderRadius: wp('2.5%'), paddingVertical: hp('1%'), alignItems: 'center',
    },
    actBtnTxt: { fontSize: wp('3.2%'), fontFamily: 'NunitoSans-SemiBold', color: '#fff' },
    actBtnFull: {
        borderRadius: wp('2.5%'), paddingVertical: hp('1%'), alignItems: 'center', borderWidth: 1,
    },
    actBtnFullTxt: { fontSize: wp('3.2%'), fontFamily: 'NunitoSans-SemiBold' },
});

export default ManageSellers;
