import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp, hp, colors } from '../../../Constant';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import { useDispatch, useSelector } from 'react-redux';
import { AllordersGet, MyordersGet } from '../../../Redux/slices/Action/Productaction';



const ordersData = [
  {
    id: 'ord-001', orderNumber: '#ORD-92287157', date: 'March 01, 2026',
    customer: 'Ali Hassan', items: 3, total: 154.0, status: 'Delivered',
    image: require('../../../assets/Images/shoe.png'),
    product: 'Nike Air Max 270', payment: 'Credit Card',
  },
  {
    id: 'ord-002', orderNumber: '#ORD-92287158', date: 'March 02, 2026',
    customer: 'Sara Ahmed', items: 1, total: 32.0, status: 'Processing',
    image: require('../../../assets/Images/cloth1.png'),
    product: 'Formal Slim-Fit Shirt', payment: 'Cash on Delivery',
  },
  {
    id: 'ord-003', orderNumber: '#ORD-92287159', date: 'March 02, 2026',
    customer: 'Usman Malik', items: 2, total: 89.0, status: 'Shipped',
    image: require('../../../assets/Images/shoes2.png'),
    product: 'Running Shoes Pro', payment: 'JazzCash',
  },
  {
    id: 'ord-004', orderNumber: '#ORD-92287160', date: 'March 03, 2026',
    customer: 'Fatima Khan', items: 4, total: 210.0, status: 'Pending',
    image: require('../../../assets/Images/cloth4.png'),
    product: 'Casual Cotton Set (+3)', payment: 'EasyPaisa',
  },
  {
    id: 'ord-005', orderNumber: '#ORD-92287161', date: 'March 03, 2026',
    customer: 'Zara Siddiqui', items: 1, total: 17.0, status: 'Cancelled',
    image: require('../../../assets/Images/shoes3.png'),
    product: 'Canvas Slip-Ons', payment: 'Credit Card',
  },
];

const STATUS_CFG = {
  Delivered: { color: colors.sellerSuccess, bg: '#D1FAE5', icon: '✓' },
  Processing: { color: colors.sellerPrimary, bg: colors.sellerLight, icon: '⟳' },
  Shipped: { color: colors.sellerWarning, bg: '#FEF3C7', icon: '🚚' },
  Pending: { color: '#7C3AED', bg: '#EDE9FE', icon: '⏳' },
  Cancelled: { color: colors.sellerError, bg: '#FEE2E2', icon: '✕' },
};

const FILTERS = ['All', 'Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];

const summaryCounts = status => ordersData.filter(o => o.status === status).length;

// ─── Order Card ────────────────────────────────────────────────────────────────
const OrderCard = ({ item }) => {
  const firstItem = item.itemsWithProduct?.[0];
  if (!firstItem) return null;
  const cfg = STATUS_CFG[item.status] || STATUS_CFG.Pending;
  return (
    <View style={styles.card}>
      {/* Card top stripe by status */}
      <View style={[styles.cardStripe, { backgroundColor: cfg.color }]} />

      {/* Row 1: Order # + Status Badge */}
      <View style={styles.cardRow1}>
        <Text style={styles.orderNum}>{item.orderNumber||"ORD-1775896856123"}</Text>
        <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
          <Text style={[styles.badgeIcon, { color: cfg.color }]}>{cfg.icon} </Text>
          <Text style={[styles.badgeTxt, { color: cfg.color }]}>{item.status}</Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Row 2: Product image + details + price */}
      <View style={styles.productRow}>
        <Image source={{ uri: firstItem.productImage }} style={styles.productImg} resizeMode="cover" />
        <View style={styles.productDetails}>
          <Text style={styles.productName} numberOfLines={2}>{firstItem.productName}</Text>
          <Text style={styles.customerTxt}>👤 {item.customer}</Text>
          <Text style={styles.itemsTxt}>📦 {firstItem.quantity} item{firstItem.quantity > 1 ? 's' : ''}</Text>
        </View>
        <View style={styles.priceCol}>
          <Text style={styles.priceLbl}>Total</Text>
          <Text style={styles.priceVal}>${item.total.toFixed(2)}</Text>
          <Text style={styles.payTxt}>{item.payment}</Text>
        </View>
      </View>

      {/* Row 3: Date + Actions */}
      <View style={[styles.cardRow1, styles.cardFooter]}>
        <Text style={styles.dateTxt}>📅 {item.createdAt}</Text>
        <View style={styles.actions}>
          <TouchableOpacity style={styles.detailsBtn}>
            <Text style={styles.detailsBtnTxt}>Details</Text>
          </TouchableOpacity>
          {item.status === 'Pending' && (
            <TouchableOpacity style={styles.acceptBtn}>
              <Text style={styles.acceptBtnTxt}>Accept</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// ─── Main Screen ──────────────────────────── ───────────────────────────────────
const OrderHistory = () => {
  const dispatch=useDispatch()
  const {user,seller}=useSelector(state => state.user)
  const {order,loading,allproducts}=useSelector(state => state.product)
  const insets = useSafeAreaInsets();
  const [activeFilter, setActiveFilter] = useState('All');
   const Fetched=async()=>{
          try{
              const res=await dispatch(AllordersGet()).unwrap()
              showSuccessToast("data is fetched ")
              console.log("order",res)
              return res
  
          }catch(err){
              console.log("order",err)
              showErrorToast(err)
  
          }
      }
      useEffect(()=>{
        Fetched()
    },[])
const validOrders = order?.filter(o => o.orderItems && o.orderItems.length > 0);
const sellerId = seller?.userId;

const sellerOrders = validOrders?.filter(o =>
  o.orderItems?.some(item => {
    return item.SellerId=== sellerId;
  })
);
const formattedOrders = sellerOrders?.map(o => {
  const itemsWithProduct = o.orderItems.map(item => {
    let product;

    if (item.productId && typeof item.productId === 'object') {
      product = item.productId; // already populated
    } else {
      product = allproducts?.find(p => p._id === item.productId);
    }

    return {
      ...item,
      productName: product?.name || "Unknown",
      productImage: product?.image?.[0] || null,
      price: product?.price || item.price,
      sellerId: product?.sellerId,
    };
  });

  return {
    ...o,
    itemsWithProduct
  };
});

  const filtered =
    activeFilter === 'All'
      ? formattedOrders
      : formattedOrders.filter(o => o.status === activeFilter);
      console.log("TOTAL ORDERS:", order?.length);
console.log("VALID:", validOrders?.length);
console.log("SELLER:", sellerOrders?.length);
console.log("FINAL:", formattedOrders?.length);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Orders</Text>
        <View style={styles.countBadge}>
<Text style={styles.countTxt}>{filtered?.length || 0}</Text>      
  </View>
      </View>

      {/* ── Summary Row ── */}
      <View style={styles.summaryRow}>
        {[
          { lbl: 'Total', val: ordersData.length, clr: colors.sellerPrimary },
          { lbl: 'Pending', val: summaryCounts('Pending'), clr: '#7C3AED' },
          { lbl: 'Shipped', val: summaryCounts('Shipped'), clr: colors.sellerWarning },
          { lbl: 'Delivered', val: summaryCounts('Delivered'), clr: colors.sellerSuccess },
        ].map(s => (
          <View key={s.lbl} style={styles.sumItem}>
            <Text style={[styles.sumVal, { color: s.clr }]}>{s.val}</Text>
            <Text style={styles.sumLbl}>{s.lbl}</Text>
          </View>
        ))}
      </View>

      {/* ── Filter Chips ── */}
      <FlatList
        data={FILTERS}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={f => f}
        contentContainerStyle={styles.filterRow}
        renderItem={({ item: f }) => (
          <TouchableOpacity
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}>
            <Text style={[styles.filterTxt, activeFilter === f && styles.filterTxtActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ── Orders List ── */}
      <FlatList
        data={filtered}
        keyExtractor={o => o._id}
        renderItem={({ item }) => <OrderCard item={item} />}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📭</Text>
            <Text style={styles.emptyTxt}>No {activeFilter} orders</Text>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.sellerBg },

  // Header
  header: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: colors.sellerCard,
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.8%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
    elevation: 3,
  },
  headerTitle: {
    fontSize: wp('5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginRight: wp('2%'),
  },
  countBadge: {
    backgroundColor: colors.sellerPrimary,
    borderRadius: wp('3%'),
    paddingHorizontal: wp('2.5%'),
    paddingVertical: hp('0.2%'),
  },
  countTxt: { color: '#fff', fontSize: wp('3%'), fontFamily: 'NunitoSans-SemiBold' },

  // Summary
  summaryRow: {
    flexDirection: 'row', justifyContent: 'space-around',
    backgroundColor: colors.sellerCard,
    paddingVertical: hp('1.5%'),
    borderBottomWidth: 1,
    borderBottomColor: colors.sellerBorder,
  },
  sumItem: { alignItems: 'center' },
  sumVal: { fontSize: wp('4.5%'), fontFamily: 'Raleway-Bold' },
  sumLbl: {
    fontSize: wp('2.8%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
  },

  // Filter
  filterRow: {
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1%'),
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
  filterTxt: {
    fontSize: wp('3%'),
    color: colors.sellerText,
    fontFamily: 'NunitoSans-Regular',
  },
  filterTxtActive: { color: '#fff', fontFamily: 'NunitoSans-SemiBold' },

  // List
  listContent: {
    paddingHorizontal: wp('4%'),
    paddingTop: hp('1%'),
    paddingBottom: hp('4%'),
  },

  // Card
  card: {
    backgroundColor: colors.sellerCard,
    borderRadius: wp('4%'),
    marginBottom: hp('1.5%'),
    overflow: 'hidden',
    elevation: 3,
    shadowColor: colors.sellerPrimary,
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  cardStripe: { height: hp('0.5%') },

  cardRow1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: wp('4%'),
    paddingVertical: hp('1.2%'),
  },
  orderNum: {
    fontSize: wp('3.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },
  badge: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.4%'),
    borderRadius: wp('5%'),
    gap: wp('1%'),
  },
  badgeIcon: { fontSize: wp('3%') },
  badgeTxt: { fontSize: wp('3%'), fontFamily: 'NunitoSans-SemiBold' },

  divider: { height: 1, backgroundColor: colors.sellerBorder, marginHorizontal: wp('4%') },

  // Product Row
  productRow: {
    flexDirection: 'row', alignItems: 'center',
    padding: wp('4%'), gap: wp('3%'),
  },
  productImg: {
    width: wp('15%'), height: wp('15%'),
    borderRadius: wp('3%'),
    backgroundColor: '#EEF2FF',
  },
  productDetails: { flex: 1 },
  productName: {
    fontSize: wp('3.3%'),
    fontFamily: 'NunitoSans-SemiBold',
    color: colors.sellerText,
    marginBottom: hp('0.4%'),
  },
  customerTxt: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
    marginBottom: hp('0.2%'),
  },
  itemsTxt: { fontSize: wp('3%'), color: colors.sellerSubText, fontFamily: 'NunitoSans-Regular' },

  priceCol: { alignItems: 'flex-end' },
  priceLbl: { fontSize: wp('2.8%'), color: colors.sellerSubText, fontFamily: 'NunitoSans-Regular' },
  priceVal: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },
  payTxt: { fontSize: wp('2.5%'), color: colors.sellerSubText, fontFamily: 'NunitoSans-Regular', marginTop: hp('0.2%') },

  // Footer
  cardFooter: {
    backgroundColor: colors.sellerBg,
    borderTopWidth: 1,
    borderTopColor: colors.sellerBorder,
  },
  dateTxt: { fontSize: wp('3%'), color: colors.sellerSubText, fontFamily: 'NunitoSans-Regular' },
  actions: { flexDirection: 'row', gap: wp('2%') },
  detailsBtn: {
    borderWidth: 1, borderColor: colors.sellerPrimary,
    paddingHorizontal: wp('3.5%'), paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  detailsBtnTxt: {
    color: colors.sellerPrimary,
    fontSize: wp('3%'),
    fontFamily: 'NunitoSans-SemiBold',
  },
  acceptBtn: {
    backgroundColor: colors.sellerPrimary,
    paddingHorizontal: wp('3.5%'), paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  acceptBtnTxt: { color: '#fff', fontSize: wp('3%'), fontFamily: 'NunitoSans-SemiBold' },

  // Empty
  empty: { alignItems: 'center', paddingTop: hp('10%'), gap: hp('1.5%') },
  emptyIcon: { fontSize: wp('10%') },
  emptyTxt: { fontSize: wp('4%'), color: colors.sellerSubText, fontFamily: 'NunitoSans-Regular' },
});

export default OrderHistory;
