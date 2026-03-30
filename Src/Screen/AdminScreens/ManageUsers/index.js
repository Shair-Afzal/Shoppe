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
import InactiveProfile from '../../../assets/SVG/InactiveProfile.svg';
import { AllUsers } from '../../../Redux/slices/Action/Authaction';
import { useDispatch, useSelector } from 'react-redux';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader';
import { ToggleBlock } from '../../../Redux/slices/Action/Authaction';
import { ActivityIndicator } from 'react-native';

const usersData = [
    { id: 'u1', name: 'Ali Hassan', email: 'ali@gmail.com', orders: 14, status: 'Active', joined: 'Jan 2025' },
    { id: 'u2', name: 'Sara Khan', email: 'sara@gmail.com', orders: 8, status: 'Active', joined: 'Feb 2025' },
    { id: 'u3', name: 'Usman Tariq', email: 'usman@gmail.com', orders: 2, status: 'Blocked', joined: 'Jan 2025' },
    { id: 'u4', name: 'Hina Malik', email: 'hina@gmail.com', orders: 31, status: 'Active', joined: 'Dec 2024' },
    { id: 'u5', name: 'Zaid Raza', email: 'zaid@gmail.com', orders: 0, status: 'Blocked', joined: 'Mar 2025' },
    { id: 'u6', name: 'Nadia Iqbal', email: 'nadia@gmail.com', orders: 19, status: 'Active', joined: 'Nov 2024' },
    { id: 'u7', name: 'Bilal Ahmed', email: 'bilal@gmail.com', orders: 7, status: 'Active', joined: 'Feb 2025' },
];

const ManageUsers = ({ navigation }) => {
    const dispatch=useDispatch();
    const {allusers,currentPage,totalPages, isfetchMore,loading,user}=useSelector(state =>state.user)
    const fetch = async ()=>{
       try{
        const res=await dispatch(AllUsers({ page: 1, limit: 3 })).unwrap()
        showSuccessToast("data is fectch successfully")
        console.log(allusers)
        return res


       }catch(err){
        showErrorToast(err)


       }
    }

    useEffect(()=>{
        fetch()


    },
        
[])
const loadMore = () => {
  if (currentPage < totalPages && !isfetchMore) {
    dispatch(AllUsers({ page: currentPage + 1, limit: 3 }));
  }
};
    const insets = useSafeAreaInsets();
    const [search, setSearch] = useState('');
    // const [users, setUsers] = useState(allusers);
    const users=allusers;


    const filtered = users.filter(
        u =>
            u.username.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase()),
    );

    const toggleStatus =async (id) => {
        // setUsers(prev =>
        //     prev.map(u =>
        //         u.id === id
        //             ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' }
        //             : u,
        //     ),
        // );
        try{
      const res =await dispatch(ToggleBlock(id)).unwrap()
      showSuccessToast("you update user status ")
      console.log("updated user",allusers)
      return res

        }catch(err){
            showErrorToast(err)

        }
    };

    const renderUser = ({ item }) => {
        const isActive = item.isBlocked;
        return (
            <View style={styles.card}>
                <View style={styles.avatarCircle}>
                    <InactiveProfile width={wp('7%')} height={wp('7%')} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.userName}>{item.username}</Text>
                    <Text style={styles.userEmail}>{item.email}</Text>
                    <Text style={styles.userMeta}>
                        Orders: {item.orders}  •  Joined: {item.joined}
                    </Text>
                </View>
                <View style={styles.rightCol}>
                    <View
                        style={[
                            styles.statusBadge,
                            { backgroundColor: isActive ? '#D1FAE5' : '#FEE2E2' },
                        ]}>
                        <Text
                            style={[
                                styles.statusTxt,
                                { color: isActive ? colors.sellerSuccess : colors.sellerError },
                            ]}>
                            {item.status}
                        </Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.toggleBtn,
                            {
                                backgroundColor: isActive
                                    ? colors.sellerSuccess
                                    : colors.sellerError,
                            },
                        ]}
                        onPress={() => toggleStatus(item._id)}
                        activeOpacity={0.8}>
                        <Text style={styles.toggleTxt}>{isActive ?  'Unblock':'Block' }</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <View style={[styles.root, { paddingTop: insets.top }]}>

            <StatusBar barStyle="light-content" backgroundColor={colors.sellerDark} />
        {
            loading&&<Loader/>
        }
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn} activeOpacity={0.7}>
                    <LeftArrow width={wp('5%')} height={wp('5%')} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Manage Users</Text>
                <View style={styles.countPill}>
                    <Text style={styles.countTxt}>{users.length}</Text>
                </View>
            </View>

            {/* Search */}
            <View style={styles.searchWrap}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search by name or email…"
                    placeholderTextColor={colors.sellerSubText}
                    value={search}
                    onChangeText={setSearch}
                />
            </View>

            {/* Summary Row */}
            <View style={styles.summaryRow}>
                <View style={[styles.summaryChip, { backgroundColor: '#D1FAE5' }]}>
                    <Text style={[styles.summaryChipTxt, { color: colors.sellerSuccess }]}>
                        Active: {users.filter(u => u.status === 'Active').length}
                    </Text>
                </View>
                <View style={[styles.summaryChip, { backgroundColor: '#FEE2E2' }]}>
                    <Text style={[styles.summaryChipTxt, { color: colors.sellerError }]}>
                        Blocked: {users.filter(u => u.status === 'Blocked').length}
                    </Text>
                </View>
            </View>

            <FlatList
                data={filtered}
                keyExtractor={item => item._id}
                renderItem={renderUser}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
                onEndReached={loadMore}
                onEndReachedThreshold={0.5}
                ListFooterComponent={
    isfetchMore ? <ActivityIndicator size="small" /> : null
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
    countTxt: {
        fontSize: wp('3%'),
        fontFamily: 'Raleway-Bold',
        color: '#fff',
    },

    searchWrap: {
        marginHorizontal: wp('4%'),
        marginTop: hp('2%'),
    },
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
        gap: wp('3%'),
        marginHorizontal: wp('4%'),
        marginTop: hp('1.5%'),
        marginBottom: hp('1%'),
    },
    summaryChip: {
        borderRadius: wp('5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
    },
    summaryChipTxt: {
        fontSize: wp('3%'),
        fontFamily: 'NunitoSans-SemiBold',
    },

    list: {
        paddingHorizontal: wp('4%'),
        paddingBottom: hp('4%'),
        gap: wp('3%'),
    },

    card: {
        backgroundColor: colors.sellerCard,
        borderRadius: wp('4%'),
        padding: wp('4%'),
        flexDirection: 'row',
        alignItems: 'center',
        gap: wp('3%'),
        elevation: 3,
        shadowColor: '#000',
        shadowOpacity: 0.06,
        shadowOffset: { width: 0, height: 3 },
        shadowRadius: 7,
        borderLeftWidth: 3,
        borderLeftColor: colors.sellerPrimary,
    },
    avatarCircle: {
        width: wp('12%'),
        height: wp('12%'),
        borderRadius: wp('6%'),
        backgroundColor: colors.sellerLight,
        alignItems: 'center',
        justifyContent: 'center',
    },
    info: { flex: 1 },
    userName: {
        fontSize: wp('3.5%'),
        fontFamily: 'Raleway-Bold',
        color: colors.sellerText,
    },
    userEmail: {
        fontSize: wp('2.8%'),
        fontFamily: 'NunitoSans-Regular',
        color: colors.sellerSubText,
        marginTop: hp('0.2%'),
    },
    userMeta: {
        fontSize: wp('2.6%'),
        fontFamily: 'NunitoSans-Regular',
        color: colors.sellerSubText,
        marginTop: hp('0.3%'),
    },
    rightCol: {
        alignItems: 'center',
        gap: hp('0.8%'),
    },
    statusBadge: {
        borderRadius: wp('5%'),
        paddingHorizontal: wp('2.5%'),
        paddingVertical: hp('0.3%'),
    },
    statusTxt: {
        fontSize: wp('2.5%'),
        fontFamily: 'NunitoSans-SemiBold',
    },
    toggleBtn: {
        borderRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        paddingVertical: hp('0.6%'),
    },
    toggleTxt: {
        fontSize: wp('2.8%'),
        fontFamily: 'NunitoSans-SemiBold',
        color: '#fff',
    },
});

export default ManageUsers;
