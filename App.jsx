// import { View, Text, StatusBar } from 'react-native'
// import React from 'react'
// import { NavigationContainer } from '@react-navigation/native'
// import AuthStack from './Src/Navigation/Authstack'
//  import Toast from 'react-native-toast-message';
// import { Provider } from "react-redux";
// import { store } from './Src/Redux/store';
// import Bottomtab from './Src/Navigation/MainStack/Bottomtab';
// import { colors } from './Src/Constant';
// import AppStack from './Src/Navigation/AppStack';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native"
// import GST, { colors, RF } from "../styles/GST"

// // Custom Trash Icon Component (no external library)
// const TrashIcon = () => (
//   <View style={styles.trashIcon}>
//     <View style={styles.trashLid} />
//     <View style={styles.trashBody}>
//       <View style={styles.trashLine} />
//       <View style={styles.trashLine} />
//     </View>
//   </View>
// )
// const App = () => {
//   return (
//     <Provider store={store}>
//     <NavigationContainer>

//       <StatusBar
//               // translucent
//               backgroundColor={colors.DarkWhite}
//               barStyle="dark-content"
//             />
//       {/* <AuthStack /> */}
//       {/* <Bottomtab/> */}
//       <AppStack/>
//        <Toast />
//     </NavigationContainer>
//     </Provider>
//   )
// }

// export default App
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GST, { colors, RF } from './Src/Constant';
import Deleteicon  from './Src/assets/SVG/Deleteicon.svg'
import Add  from './Src/assets/SVG/Add.svg'

const CartItem = ({
  productImage = 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
  title = 'Lorem ipsum dolor sit amet consectetur.',
  price = '$17.00',
  selectedColor = 'Pink',
  selectedSize = 'M',
  onDelete,
  onColorSelect,
  onSizeSelect,
}) => {
  const TrashIcon = () => 
    <Deleteicon height={RF(20)} width={RF(20)} />


  return (
    <View style={styles.cartItemContainer}>
      {/* Product Image with Delete Button */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: productImage }}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <TrashIcon />
        </TouchableOpacity>
      </View>

      {/* Product Details */}
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{title}</Text>
        <Text style={styles.productPrice}>{price}</Text>

        {/* Selection Options */}
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            style={[
              styles.optionButton,
              styles.colorOption,
              selectedColor === 'Pink' && styles.selectedOption,
            ]}
            onPress={() => onColorSelect && onColorSelect('Pink')}
          >
            <Text
              style={[
                styles.optionText,
                selectedColor === 'Pink' && styles.selectedOptionText,
              ]}
            >
              Pink
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.optionButton,
              styles.sizeOption,
              selectedSize === 'M' && styles.selectedOption,
            ]}
            onPress={() => onSizeSelect && onSizeSelect('M')}
          >
            <Text
              style={[
                styles.optionText,
                selectedSize === 'M' && styles.selectedOptionText,
              ]}
            >
              M
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Add  height={25} width={RF(25)} style={{position:"absolute",bottom:20,right:10}}/>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItemContainer: {
    ...GST.ROW,
    // backgroundColor: colors.DarkWhite,
    padding: RF(16),
    marginVertical: RF(8),
    borderRadius: RF(12),

  },
  imageContainer: {
    position: 'relative',
    marginRight: RF(16),
  },
  productImage: {
    width: RF(110),
    height: RF(110),
    borderRadius: RF(12),
    backgroundColor: colors.lightpink,
  },
  deleteButton: {
    position: 'absolute',
    bottom: RF(22),
    left: RF(15),
    width: RF(32),
    height: RF(32),
    borderRadius: RF(16),
    backgroundColor: colors.DarkWhite,
    ...GST.CENTER,
    shadowColor: colors.Black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  trashLid: {
    width: RF(12),
    height: RF(2),
    backgroundColor: colors.pink,
    borderRadius: RF(1),
    marginBottom: RF(1),
  },
  trashBody: {
    width: RF(10),
    height: RF(12),
    backgroundColor: 'transparent',
    borderWidth: RF(1.5),
    borderColor: colors.pink,
    borderTopWidth: 0,
    borderBottomLeftRadius: RF(2),
    borderBottomRightRadius: RF(2),
    alignItems: 'center',
    paddingTop: RF(2),
  },
  trashLine: {
    width: RF(1),
    height: RF(6),
    backgroundColor: colors.pink,
    marginVertical: RF(0.5),
  },
  productDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  productTitle: {
    ...GST.description,
    fontSize: RF(16),
    color: colors.darkblack,
    lineHeight: RF(22),
    marginBottom: RF(8),
  },
  productPrice: {
    fontSize: RF(24),
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
    marginBottom: RF(16),
  },
  optionsContainer: {
    ...GST.ROW,
    gap: RF(12),
  },
  optionButton: {
    paddingHorizontal: RF(20),
    paddingVertical: RF(10),
    borderRadius: RF(8),
    minWidth: RF(60),
    ...GST.CENTER,
  },
  colorOption: {
    backgroundColor: colors.lightblue,
  },
  sizeOption: {
    backgroundColor: colors.darkgrey,
  },
  selectedOption: {
    backgroundColor: colors.lightblue,
  },
  optionText: {
    fontSize: RF(14),
    fontFamily: 'NunitoSans-Regular',
    color: colors.darkblack,
  },
  selectedOptionText: {
    color: colors.darkblack,
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default CartItem;
