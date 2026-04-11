import React, { useState, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import GST, {
  wp,
  hp,
  colors,
  fontSize,
  fontFamily,
  radius,
} from '../../../../Constant';
import CustomInput from '../../../../Component/Custominput';
import CustomButton from '../../../../Component/Custombutton';
import Dropicon from '../../../../assets/SVG/Dropicon.svg';
import UserIcon from '../../../../assets/SVG/Activeprofile.svg';
import { useDispatch,useSelector } from 'react-redux';
import Loader from '../../../../Component/Loader/Loader';
import { UpdateCartItem,CreateOrder,initializePaymentSheet} from '../../../../Redux/slices/Action/Productaction';
import { showErrorToast, showSuccessToast } from '../../../../utils/Toast';
const InputField = ({
  label,
  field,
  placeholder,
  Icon,
  keyboardType = 'default',
  multiline = false,
  value,
  onChangeText,
  error,
}) => (
  <View style={styles.fieldContainer}>
    <Text style={styles.label}>{label}</Text>
    <View style={[styles.inputWrapper, error && styles.inputError]}>
      {Icon && (
        <View style={styles.iconContainer}>
          <Icon width={wp('5%')} height={wp('5%')} />
        </View>
      )}
      <CustomInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        containerStyle={styles.customInputStyle}
        inputStyle={styles.inputTextStyle}
        placeholderTextColor={colors.dimBlack}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
    {error && <Text style={styles.errorText}>⚠️ {error}</Text>}
  </View>
);

const OrderScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const dispatch=useDispatch();
  const {cart,allproducts,currentorder,order,loading,clientSecret}=useSelector(state=>state.product)
  const cartItems = cart.map(cartItem => {
    const product = allproducts.find(p => p._id === cartItem.productId);;
    return {
      ...cartItem,
      name: product?.name || 'Unknown Product',
        image: product?.image || null,
        price: product?.price || 0,
    };
  });
  


  const [formData, setFormData] = useState({
    name: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
  });
  const handleCreateOrder = async () => {
  try {
    // 1️⃣ Create order
    const orderRes = await dispatch(
      CreateOrder({ cartId: cart?.[0]?.cartId, shippingAddress: formData })
    ).unwrap();

    console.log("✅ NEW ORDER:", orderRes);

    // 2️⃣ Use DIRECT response (NOT Redux state)
    await dispatch(
      initializePaymentSheet({ orderId: orderRes._id })
    ).unwrap();

    showSuccessToast('Order created successfully!');
    navigation.navigate('Payment',{
  orderId: orderRes._id,
});

  } catch (err) {
    console.log('Error creating order:', err);
    showErrorToast(err || 'Failed to create order');
  }
};

  const [errors, setErrors] = useState({});

  const handleInputChange = useCallback((field, value) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
    // Clear error for this field when user starts typing
    setErrors(prevErrors => ({
      ...prevErrors,
      [field]: '',
    }));
  }, []);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = 'Postal Code is required';
    }
    if (!formData.country.trim()) {
      newErrors.country = 'Country is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmitOrder = useCallback(() => {
    if (!validateForm()) {
      Alert.alert(
        '❌ Validation Error',
        'Please fill in all required fields correctly',
      );
      return;
    }

    // Here you would typically send the order data to your backend
    console.log('Order Data:', formData);
    Alert.alert('✅ Success', 'Order placed successfully!', [
      {
        text: 'Continue Shopping',
        onPress: () => navigation.navigate('Cart'),
      },
    ]);
  }, [validateForm, formData, navigation]);

  const inputFields = useMemo(
    () => [
      {
        label: 'Full Name',
        field: 'name',
        placeholder: 'Enter your full name',
        icon: UserIcon,
        keyboardType: 'default',
      },
      {
        label: 'Delivery Address',
        field: 'address',
        placeholder: 'Enter your complete address',
        icon: Dropicon,
        multiline: true,
      },
      {
        label: 'City',
        field: 'city',
        placeholder: 'Enter your city',
        icon: Dropicon,
        keyboardType: 'default',
      },
      {
        label: 'Postal/ZIP Code',
        field: 'postalCode',
        placeholder: 'Enter postal code',
        icon: Dropicon,
        keyboardType: 'numeric',
      },
      {
        label: 'Country',
        field: 'country',
        placeholder: 'Enter your country',
        icon: Dropicon,
        keyboardType: 'default',
      },
    ],
    [],
  );

  return (
    <SafeAreaView
      style={[
        styles.container,
        { paddingTop: insets.top, paddingBottom: insets.bottom },
      ]}
    >
        
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
        bounces={false}
      >
        {
            loading&&<Loader/>
        }
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>📦 Order Details</Text>
          <Text style={styles.headerSubtitle}>
            Enter your delivery information
          </Text>
        </View>

        {/* Form Container */}
        <View style={styles.formContainer}>
          {inputFields.map(field => (
            <InputField
              key={field.field}
              label={field.label}
              field={field.field}
              placeholder={field.placeholder}
              Icon={field.icon}
              keyboardType={field.keyboardType}
              multiline={field.multiline || false}
              value={formData[field.field]}
              onChangeText={value => handleInputChange(field.field, value)}
              error={errors[field.field]}
            />
          ))}
        </View>

        {/* Order Summary Section */}
        {/* <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Order Summary</Text>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>PKR 4,999</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>PKR 299</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>PKR 5,298</Text>
          </View>
        </View> */}

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <CustomButton
            btnTitle="Place Order"
            onPress={handleCreateOrder}
            style={styles.submitButton}
            txtstyle={styles.buttonText}
          />
        </View>

        {/* Spacing */}
        <View style={{ height: hp('3%') }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('1%'),
  },
  headerTitle: {
    fontSize: fontSize.extraLarge,
    fontWeight: '700',
    color: colors.darkblack,
    fontFamily: fontFamily.bold,
    marginBottom: hp('0.5%'),
  },
  headerSubtitle: {
    fontSize: fontSize.small,
    color: colors.dimBlack,
    fontFamily: fontFamily.DMreg,
  },
  formContainer: {
    paddingHorizontal: wp('5%'),
    paddingTop: hp('2%'),
    paddingBottom: hp('2%'),
  },
  fieldContainer: {
    marginBottom: hp('2%'),
  },
  label: {
    fontSize: fontSize.avgSmall,
    fontWeight: '600',
    color: colors.darkblack,
    marginBottom: hp('0.8%'),
    fontFamily: fontFamily.bold,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.darkgrey,
    borderRadius: radius.radius3,
    paddingHorizontal: wp('3%'),
    // paddingVertical: hp('1.2%'),
    borderWidth: 2,
    borderColor: colors.darkgrey,
  },
  inputError: {
    borderColor: colors.red,
    backgroundColor: '#FFF5F5',
  },
  iconContainer: {
    marginRight: wp('2%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  customInputStyle: {
    flex: 1,
    backgroundColor: 'transparent',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  inputTextStyle: {
    width: '100%',
    fontSize: fontSize.small,
    color: colors.darkblack,
    fontFamily: fontFamily.DMreg,
  },
  errorText: {
    fontSize: fontSize.extraSmall,
    color: colors.red,
    marginTop: hp('0.5%'),
    fontFamily: fontFamily.DMreg,
    fontWeight: '500',
  },
  summarySection: {
    marginHorizontal: wp('5%'),
    marginBottom: hp('2%'),
    backgroundColor: colors.darkgrey,
    borderRadius: radius.radius3,
    padding: wp('4%'),
    borderLeftWidth: 4,
    borderLeftColor: colors.blue,
  },
  summaryTitle: {
    fontSize: fontSize.medium,
    fontWeight: '700',
    color: colors.darkblack,
    marginBottom: hp('1.5%'),
    fontFamily: fontFamily.bold,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp('1%'),
  },
  summaryLabel: {
    fontSize: fontSize.small,
    color: colors.dimBlack,
    fontFamily: fontFamily.DMreg,
  },
  summaryValue: {
    fontSize: fontSize.small,
    color: colors.darkblack,
    fontWeight: '600',
    fontFamily: fontFamily.bold,
  },
  divider: {
    height: 1,
    backgroundColor: colors.DarkWhite,
    marginVertical: hp('1%'),
  },
  totalLabel: {
    fontSize: fontSize.medium,
    fontWeight: '700',
    color: colors.darkblack,
    fontFamily: fontFamily.bold,
  },
  totalValue: {
    fontSize: fontSize.medium,
    fontWeight: '700',
    color: colors.blue,
    fontFamily: fontFamily.bold,
  },
  buttonContainer: {
    paddingHorizontal: wp('5%'),
    paddingBottom: hp('2%'),
  },
  submitButton: {
    backgroundColor: colors.blue,
    paddingVertical: hp('1.8%'),
    borderRadius: radius.radius3,
    shadowColor: colors.blue,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    fontSize: fontSize.medium,
    fontWeight: '700',
    color: colors.white,
    fontFamily: fontFamily.bold,
  },
});

export default OrderScreen;
