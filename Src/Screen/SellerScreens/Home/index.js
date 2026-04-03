import React, { useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { wp, hp, colors } from '../../../Constant';
import CartItem from '../../../Component/Cartitem';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllProducts,DeleteProduct } from '../../../Redux/slices/Action/Productaction.js';
import { showErrorToast, showSuccessToast } from '../../../utils/Toast';
import Loader from '../../../Component/Loader/Loader.js';

// ─── Custom Seller Product Data ───────────────────────────────────────────────
// const sellerProducts = [
//   {
//     id: 'sp-1',
//     title: 'Nike Air Max 270 - Breathable Running Shoe',
//     price: 120,
//     color: 'Midni Blue',
//     size: 'M',
//     quantity: 5,
//     image: require('../../../assets/Images/shoe.png'),
//     status: 'In Stock',
//     sold: 38,
//   },
//   {
//     id: 'sp-2',
//     title: 'Casual Cotton T-Shirt - Premium Quality',
//     price: 17,
//     color: 'Light Gray',
//     size: 'M',
//     quantity: 12,
//     image: require('../../../assets/Images/cloth1.png'),
//     status: 'In Stock',
//     sold: 74,
//   },
//   {
//     id: 'sp-3',
//     title: 'Formal Slim-Fit Shirt - Office Wear',
//     price: 32,
//     color: 'White',
//     size: 'L',
//     quantity: 0,
//     image: require('../../../assets/Images/cloth4.png'),
//     status: 'Out of Stock',
//     sold: 21,
//   },
//   {
//     id: 'sp-4',
//     title: 'Classic Running Shoes - Lightweight Design',
//     price: 89,
//     color: 'Black',
//     size: 'M',
//     quantity: 3,
//     image: require('../../../assets/Images/shoes2.png'),
//     status: 'Low Stock',
//     sold: 56,
//   },
// ];

const stats = [
  { id: 's1', label: 'Products', value: '24', color: colors.sellerPrimary, bg: colors.sellerLight },
  { id: 's2', label: 'Orders', value: '138', color: colors.sellerSuccess, bg: '#D1FAE5' },
  { id: 's3', label: 'Revenue', value: '$4.2K', color: colors.sellerWarning, bg: '#FEF3C7' },
  { id: 's4', label: 'Reviews', value: '4.8★', color: colors.sellerAccent, bg: '#CFFAFE' },
];

const STATUS_CFG = {
  'In Stock': { color: colors.sellerSuccess, bg: '#D1FAE5', dot: '#10B981' },
  'Low Stock': { color: colors.sellerWarning, bg: '#FEF3C7', dot: '#F59E0B' },
  'Out of Stock': { color: colors.sellerError, bg: '#FEE2E2', dot: '#EF4444' },
};

const SellerHome = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch = useDispatch();
  const {allproducts,currentPage,totalPages,isfetchMore,loading,error}=useSelector(state=>state.product)
  const {seller}=useSelector(state=>state.user)
  const sellerProducts = allproducts.filter(p => p.sellerId === seller.userId);
  console.log('products',sellerProducts)
 
  const FetchProducts= async ()=>{
    try {
      const res=await dispatch(GetAllProducts({page:1,limit:3})).unwrap();
      console.log('Fetched products:', res);
      showSuccessToast('Products fetched successfully!');
      return res;
    } catch (err) {
      console.log('Error fetching products:', err);
      showErrorToast(err || 'Failed to fetch products');
    }
  }
  const DeleteProductHandler= async (id)=>{
    try {
        const res=await dispatch(DeleteProduct(id)).unwrap();
        showSuccessToast('Product deleted successfully!');
        return res;
    } catch (err) {

      showErrorToast(err || 'Failed to delete product');
    }
  }

  useEffect(() => {
    FetchProducts()
  }, []);

  const FetchMore= async ()=>{
    if(!isfetchMore && currentPage<totalPages){
    try {
      const res=await dispatch(GetAllProducts({page:currentPage+1,limit:3})).unwrap();
      console.log('Fetched more products:', res);
      showSuccessToast('More products fetched successfully!');
      return res;
    } catch (err) {
      console.log('Error fetching more products:', err);
      showErrorToast(err || 'Failed to fetch more products');
    }
  }

}

  const renderProduct = ({ item }) => {
    const sc = STATUS_CFG[item.status] || STATUS_CFG['In Stock'];
    return (
      <View style={styles.productCard}>
        <CartItem
          productImage={{ uri: item?.image?.[0] }}
          title={item?.description}
          price={`$${item?.price}`}
          color={item?.color}
          size={item?.size}
          quantity={item?.quantity||1}
          // addcart
          onQuantityChange={qty => console.log(`${item.id} qty=${qty}`)}
          onDelete={() =>console.log('Delete',item.id) || DeleteProductHandler(item._id)}
        />
        {/* Status & Edit Row */}
        <View style={styles.cardFooter}>
          <View style={[styles.statusBadge, { backgroundColor: sc.bg }]}>
            <View style={[styles.statusDot, { backgroundColor: sc.dot }]} />
            <Text style={[styles.statusTxt, { color: sc.color }]}>{item?.stock||0}</Text>
          </View>
          <View style={styles.footerActions}>
            <Text style={styles.soldTxt}>Sold: {item.sold||0}</Text>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => navigation.navigate('EditProduct', {  product: {
        ...item,
        image: item.image?.map(img => ({ uri: img })) || [],
      }, })}>
              <Text style={styles.editBtnTxt}>✏️ Edit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {
        loading&&<Loader/>
      }
      <FlatList
        data={sellerProducts}
        keyExtractor={item => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={renderProduct}
        onEndReached={FetchMore}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
        
          <View style={{ paddingVertical: hp('2%'), alignItems: 'center' }}>
          {isfetchMore && 
            <ActivityIndicator size={'small'}/>
        }
          </View>

        
        }
        ListHeaderComponent={
          <View>
            {/* ── Header ── */}
            <View style={styles.header}>
              <View style={styles.headerLeft}>
                <Text style={styles.greeting}>Good Morning</Text>
                <Text style={styles.shopName}>My Shop Dashboard</Text>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => navigation.navigate('CreateProduct')}>
                <Text style={styles.addBtnTxt}>+ Add</Text>
              </TouchableOpacity>
            </View>

            {/* ── Stats ── */}
            <FlatList
              data={stats}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={s => s.id}
              contentContainerStyle={styles.statsRow}
              renderItem={({ item: s }) => (
                <View style={[styles.statCard, { backgroundColor: s.bg }]}>
                  <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
                  <Text style={[styles.statLabel, { color: s.color }]}>{s.label}</Text>
                </View>
              )}
            />

            {/* ── Section Header ── */}
            <View style={styles.sectionRow}>
              <Text style={styles.sectionTitle}>My Products</Text>
              <Text style={styles.sectionCount}>{sellerProducts.length} items</Text>
            </View>
          </View>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.sellerBg },
  listContent: { paddingHorizontal: wp('4%'), paddingBottom: hp('4%') },

  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('2%'),
    marginBottom: hp('2%'),
  },
  headerLeft: { flex: 1 },
  greeting: {
    fontSize: wp('3.2%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
  },
  shopName: {
    fontSize: wp('5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
    marginTop: hp('0.3%'),
  },
  addBtn: {
    backgroundColor: colors.sellerPrimary,
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    borderRadius: wp('2%'),
  },
  addBtnTxt: {
    color: '#fff',
    fontSize: wp('3.5%'),
    fontFamily: 'NunitoSans-SemiBold',
  },

  // Stats
  statsRow: { gap: wp('3%'), paddingBottom: hp('2%') },
  statCard: {
    borderRadius: wp('3.5%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('5%'),
    alignItems: 'center',
    minWidth: wp('22%'),
  },
  statValue: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway-Bold',
  },
  statLabel: {
    fontSize: wp('2.8%'),
    fontFamily: 'NunitoSans-Regular',
    marginTop: hp('0.3%'),
  },

  // Section Header
  sectionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1.5%'),
  },
  sectionTitle: {
    fontSize: wp('4.5%'),
    fontFamily: 'Raleway-Bold',
    color: colors.sellerText,
  },
  sectionCount: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
  },

  // Product Card
  productCard: {
    backgroundColor: colors.sellerCard,
    borderRadius: wp('4%'),
    padding: wp('3.5%'),
    marginBottom: hp('1.5%'),
    elevation: 3,
    shadowColor: '#4F46E5',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    borderWidth: 1,
    borderColor: colors.sellerBorder,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp('1%'),
    paddingTop: hp('1%'),
    borderTopWidth: 1,
    borderTopColor: colors.sellerBorder,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('3%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('5%'),
    gap: wp('1.5%'),
  },
  statusDot: {
    width: wp('2%'),
    height: wp('2%'),
    borderRadius: wp('1%'),
  },
  statusTxt: {
    fontSize: wp('3%'),
    fontFamily: 'NunitoSans-SemiBold',
  },
  footerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp('3%'),
  },
  soldTxt: {
    fontSize: wp('3%'),
    color: colors.sellerSubText,
    fontFamily: 'NunitoSans-Regular',
  },
  editBtn: {
    borderWidth: 1,
    borderColor: colors.sellerPrimary,
    paddingHorizontal: wp('3.5%'),
    paddingVertical: hp('0.5%'),
    borderRadius: wp('2%'),
  },
  editBtnTxt: {
    color: colors.sellerPrimary,
    fontSize: wp('3%'),
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default SellerHome;
