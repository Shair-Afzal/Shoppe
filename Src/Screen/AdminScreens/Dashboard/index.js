import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Image
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  wp,
  hp,
  colors,
  fontSize,
  fontFamily,
  radius,
} from '../../../Constant';

import ProfilePic from '../../../assets/SVG/ProfilePic.svg';
import SettingsIcon from '../../../assets/SVG/Settings.svg';
import MessageIcon from '../../../assets/SVG/Message.svg';
import UsersIcon from '../../../assets/SVG/InactiveProfile.svg';
import SellersIcon from '../../../assets/SVG/Activeprofile.svg';
import OrdersIcon from '../../../assets/SVG/Activecart.svg';
import ProductsIcon from '../../../assets/SVG/ImageIcon.svg';
import ManageIcon from '../../../assets/SVG/TopMenu.svg';
import FilterIcon from '../../../assets/SVG/Filter.svg';
import {AllUsers,AllSellers } from '../../../Redux/slices/Action/Authaction';
import { GetAllProducts,GetAllCategories } from '../../../Redux/slices/Action/Productaction';
import { useDispatch,useSelector } from 'react-redux';
import { showSuccessToast,showErrorToast } from '../../../utils/Toast';


// ── Static Data ──────────────────────────────────────────────────────────────


const quickActions = [
  {
    id: 'qa1',
    label: 'Manage\nUsers',
    screen: 'ManageUsers',
    color: colors.sellerPrimary,
    bg: colors.sellerLight,
  },
  {
    id: 'qa2',
    label: 'Manage\nSellers',
    screen: 'ManageSellers',
    color: colors.sellerAccent,
    bg: '#CFFAFE',
  },
  {
    id: 'qa3',
    label: 'Manage\nOrders',
    screen: 'ManageOrders',
    color: colors.sellerSuccess,
    bg: '#D1FAE5',
  },
  {
    id: 'qa4',
    label: 'Manage\nProducts',
    screen: 'ManageProducts',
    color: colors.sellerWarning,
    bg: '#FEF3C7',
  },
];

const recentActivity = [
  {
    id: 'r1',
    action: 'New seller registered',
    time: '2 min ago',
    dot: colors.sellerAccent,
  },
  {
    id: 'r2',
    action: 'Order #5821 placed by Ali',
    time: '8 min ago',
    dot: colors.sellerSuccess,
  },
  {
    id: 'r3',
    action: 'Product flagged for review',
    time: '15 min ago',
    dot: colors.sellerWarning,
  },
  {
    id: 'r4',
    action: 'User account suspended',
    time: '1 hr ago',
    dot: colors.sellerError,
  },
  {
    id: 'r5',
    action: 'New user registered',
    time: '2 hr ago',
    dot: colors.sellerPrimary,
  },
];

// ── Component ─────────────────────────────────────────────────────────────────
const AdminDashboard = ({ navigation }) => {
    const dispatch=useDispatch()
  const {user,allusers, allSellers,totalusers,totalsellers}=useSelector(state => state.user)
  const {allproducts,loading, order,totalproducts}=useSelector(state => state.product)
  const insets = useSafeAreaInsets();
  const fetchProducts = async () => {
  try {
    const res = await dispatch(GetAllProducts({ page: 1, limit: 3 })).unwrap();
    console.log("products", res);
    return res;
  } catch (err) {
    showErrorToast(err);
  }
};
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
       const fetchdata=async ()=>{
             try{
                 const res=await dispatch(AllSellers({page:1,limit:3})).unwrap()
      showSuccessToast("data is fectch successfully")
             console.log("data",allSellers)
             return res
     
     
            }catch(err){
             showErrorToast(err)
             }
         }
         useEffect(()=>{
          fetch()
          fetchdata()
          fetchProducts()
         },[])
  const statsData = [
  {
    id: 's1',
    title: 'Total Users',
    count: totalusers,
    icon: UsersIcon,
    color: colors.sellerPrimary,
    bg: colors.sellerLight,
    change: '+12%',
    positive: true,
  },
  {
    id: 's2',
    title: 'Total Sellers',
    count:  totalsellers,
    icon: SellersIcon,
    color: colors.sellerAccent,
    bg: '#CFFAFE',
    change: '+5%',
    positive: true,
  },
  {
    id: 's3',
    title: 'Total Products',
    count: totalproducts||0,
    icon: ProductsIcon,
    color: colors.sellerWarning,
    bg: '#FEF3C7',
    change: '+8%',
    positive: true,
  },
  {
    id: 's4',
    title: 'Total Orders',
    count: order.length,
    icon: OrdersIcon,
    color: colors.sellerSuccess,
    bg: '#D1FAE5',
    change: '+21%',
    positive: true,
  },
];

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.sellerDark} />

      {/* ── Gradient Header ── */}
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.headerLeft}>
            <TouchableOpacity
              style={styles.avatarWrap}
              onPress={() => navigation.navigate('AdminProfile')}
              activeOpacity={0.7}
            >
              {
                user?.profilepic?
              
              <Image source={{uri:user?.profilepic}} style={{height:wp("11%"),width:wp('11%')}}/>:
               <ProfilePic width={wp('11%')} height={wp('11%')} />
              }
             
            </TouchableOpacity>
            <View style={styles.headerTextWrap}>

              <Text style={styles.greetText}>Welcome back 👋</Text>
              <Text style={styles.adminName}>Super Admin</Text>
            </View>
          </View>
          <View style={styles.headerButtonsContainer}>
            <TouchableOpacity
              style={styles.messageBtn}
              activeOpacity={0.7}
              onPress={() => navigation.navigate('AdminMessages')}
            >
              <MessageIcon width={wp('6%')} height={wp('6%')} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.settingsBtn}
              activeOpacity={0.7}
              onPress={() =>
                navigation.navigate('AdminEditProfile', {
                  adminData: {
                    name: 'Super Admin',
                    email: 'admin@shoppe.com',
                    phone: '+92-300-1234567',
                    store: 'Shoppe Store',
                    image: 'https://via.placeholder.com/100',
                    joinDate: 'Jan 2024',
                    totalChats: 156,
                    responseTime: '2 mins avg',
                    rating: 4.8,
                  },
                })
              }
            >
              <SettingsIcon width={wp('6%')} height={wp('6%')} />
            </TouchableOpacity>
          </View>
        </View>

        {/* ── Summary Strip ── */}
        <View style={styles.summaryStrip}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>$84.2K</Text>
            <Text style={styles.summaryLabel}>Revenue</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>98.4%</Text>
            <Text style={styles.summaryLabel}>Uptime</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryItem}>
            <Text style={styles.summaryVal}>4.9★</Text>
            <Text style={styles.summaryLabel}>Avg Rating</Text>
          </View>
        </View>
      </View>

      {/* ── Scrollable Body ── */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.body}
      >
        {/* ── Stats Cards Grid ── */}
        <Text style={styles.sectionTitle}>Dashboard Overview</Text>
        <View style={styles.cardsGrid}>
          {statsData.map(item => {
            const Icon = item.icon;
            return (
              <View
                key={item.id}
                style={[styles.statCard, { borderLeftColor: item.color }]}
              >
                <View style={[styles.iconCircle, { backgroundColor: item.bg }]}>
                  <Icon width={wp('6%')} height={wp('6%')} />
                </View>
                <Text style={styles.cardCount}>{item.count}</Text>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View
                  style={[
                    styles.changeBadge,
                    { backgroundColor: item.positive ? '#D1FAE5' : '#FEE2E2' },
                  ]}
                >
                  <Text
                    style={[
                      styles.changeTxt,
                      {
                        color: item.positive
                          ? colors.sellerSuccess
                          : colors.sellerError,
                      },
                    ]}
                  >
                    {item.change} this month
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actionsRow}>
          {quickActions.map(qa => (
            <TouchableOpacity
              key={qa.id}
              style={[
                styles.actionBtn,
                { backgroundColor: qa.bg, borderColor: qa.color },
              ]}
              activeOpacity={0.75}
              onPress={() => navigation.navigate(qa.screen)}
            >
              <View style={[styles.actionDot, { backgroundColor: qa.color }]} />
              <Text style={[styles.actionLabel, { color: qa.color }]}>
                {qa.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Recent Activity ── */}
        <Text style={styles.sectionTitle}>Recent Activity</Text>
        <View style={styles.activityCard}>
          {recentActivity.map((item, index) => (
            <View key={item.id}>
              <View style={styles.activityRow}>
                <View
                  style={[styles.activityDot, { backgroundColor: item.dot }]}
                />
                <View style={styles.activityTextWrap}>
                  <Text style={styles.activityAction}>{item.action}</Text>
                  <Text style={styles.activityTime}>{item.time}</Text>
                </View>
                <FilterIcon width={wp('4%')} height={wp('4%')} />
              </View>
              {index < recentActivity.length - 1 && (
                <View style={styles.activitySep} />
              )}
            </View>
          ))}
        </View>

        <View style={{ height: hp('3%') }} />
      </ScrollView>
    </View>
  );
};

// ── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.sellerBg,
  },

  // Header
  header: {
    backgroundColor: colors.sellerDark,
    paddingHorizontal: wp('5%'),
    paddingTop: hp('1.5%'),
    paddingBottom: hp('2.5%'),
    borderBottomLeftRadius: wp('6%'),
    borderBottomRightRadius: wp('6%'),
    elevation: 10,
    shadowColor: colors.sellerDark,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 12,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  avatarWrap: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: colors.sellerAccent,
    backgroundColor: colors.sellerLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTextWrap: { justifyContent: 'center' },
  greetText: {
    fontSize: wp('3%'),
    color: 'rgba(255,255,255,0.7)',
    fontFamily: 'NunitoSans-Regular',
  },
  adminName: {
    fontSize: wp('4.5%'),
    color: '#FFFFFF',
    fontFamily: 'Raleway-Bold',
    marginTop: hp('0.2%'),
  },
  headerButtonsContainer: {
    flexDirection: 'row',
    gap: wp('2%'),
    alignItems: 'center',
  },
  messageBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: wp('3%'),
    padding: wp('2.5%'),
  },
  settingsBtn: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: wp('3%'),
    padding: wp('2.5%'),
  },

  // Summary strip
  summaryStrip: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: hp('2%'),
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.2%'),
  },
  summaryItem: { alignItems: 'center' },
  summaryVal: {
    fontSize: wp('4%'),
    color: '#FFFFFF',
    fontFamily: 'Raleway-Bold',
  },
  summaryLabel: {
    fontSize: wp('2.6%'),
    color: 'rgba(255,255,255,0.65)',
    fontFamily: 'NunitoSans-Regular',
    marginTop: hp('0.2%'),
  },
  summaryDivider: {
    width: 1,
    height: hp('3%'),
    backgroundColor: 'rgba(255,255,255,0.2)',
  },

  // Body
  body: {
    paddingHorizontal: wp('4.5%'),
    paddingTop: hp('2.5%'),
  },
  sectionTitle: {
    fontSize: wp('4.2%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginBottom: hp('1.5%'),
  },

  // Cards Grid
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('3%'),
    marginBottom: hp('3%'),
  },
  statCard: {
    backgroundColor: colors.sellerCard,
    borderRadius: wp('4%'),
    padding: wp('4%'),
    width: wp('43%'),
    borderLeftWidth: 4,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.07,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 8,
  },
  iconCircle: {
    width: wp('11%'),
    height: wp('11%'),
    borderRadius: wp('5.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  cardCount: {
    fontSize: wp('5.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },
  cardTitle: {
    fontSize: wp('3%'),
    fontFamily: 'NunitoSans-Regular',
    color: colors.sellerSubText,
    marginTop: hp('0.3%'),
  },
  changeBadge: {
    marginTop: hp('1%'),
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('5%'),
    alignSelf: 'flex-start',
  },
  changeTxt: {
    fontSize: wp('2.5%'),
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Quick Actions
  actionsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: wp('3%'),
    marginBottom: hp('3%'),
  },
  actionBtn: {
    width: wp('43%'),
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('4%'),
    borderWidth: 1.5,
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('2.5%'),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  actionDot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
  },
  actionLabel: {
    fontSize: wp('3.5%'),
    fontFamily: 'Raleway-Bold',
    lineHeight: wp('5%'),
  },

  // Recent Activity
  activityCard: {
    backgroundColor: colors.sellerCard,
    borderRadius: wp('4%'),
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 7,
    marginBottom: hp('2%'),
  },
  activityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('1.2%'),
    gap: wp('3%'),
  },
  activityDot: {
    width: wp('2.5%'),
    height: wp('2.5%'),
    borderRadius: wp('1.25%'),
  },
  activityTextWrap: { flex: 1 },
  activityAction: {
    fontSize: wp('3.2%'),
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.sellerText,
  },
  activityTime: {
    fontSize: wp('2.8%'),
    fontFamily: 'NunitoSans-Regular',
    color: colors.sellerSubText,
    marginTop: hp('0.2%'),
  },
  activitySep: {
    height: 1,
    backgroundColor: colors.sellerBorder,
  },
});

export default AdminDashboard;
