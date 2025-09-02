import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import GST, { colors, fontFamily, RF } from "../../Constant";
import Deleteicon from '../../assets/SVG/Deleteicon.svg';
import Add from '../../assets/SVG/Add.svg'
import { useState } from 'react';
import NewItem from '../NewItem';
fontFamily

// ... existing imports ...

const CartItem = ({
  productImage = require("../../assets/Images/cartimg.png"),
  title = 'Lorem ipsum dolor sit amet \nconsectetur.',
  price = '$17.00',
  selectedColor = 'Pink',
  selectedSize = 'M',
  onDelete,
  onColorSelect,
  onSizeSelect,
  addcart,
  quantity = 1, // Add this prop
  onQuantityChange, // Add this prop
  size,
  color,
}) => {
  const TrashIcon = () => <Deleteicon height={RF(20)} width={RF(20)} />;

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChange && onQuantityChange(quantity - 1);
    } else {
      onDelete && onDelete();
    }
  };

  const handleIncrement = () => {
    onQuantityChange && onQuantityChange(quantity + 1);
  };

  return (
    <View style={styles.cartItemContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={productImage}
          style={styles.productImage}
          resizeMode="cover"
        />
        <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
          <TrashIcon />
        </TouchableOpacity>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{title}</Text>
        {addcart ? (
          <Text style={GST.subdescription}>{color}, Size {size}</Text>
        ) : (
          <Text style={styles.productPrice}>{price}</Text>
        )}
        <View style={styles.optionsContainer}>
          {
            addcart?
          
          <Text style={styles.productPrice}>{price*quantity}</Text>:
          <>
          <View style={{...GST.ROW,gap:RF(5)}}>
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
                {color}
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
                {size}
              </Text>
            </TouchableOpacity>
            </View>
            </>
          
}
          {addcart ? (
            <View style={{ ...GST.mid_row, gap: RF(10) }}>
              <TouchableOpacity
                style={{
                  ...GST.CENTER,
                  height: RF(25),
                  width: RF(25),
                  backgroundColor: colors.DarkWhite,
                  borderColor: colors.blue,
                  borderWidth: 1,
                  borderRadius: RF(100),
                }}
                onPress={handleDecrement}
              >
                <Text style={{ ...GST.subdescription, color: colors.blue, marginBottom: RF(5) }}>
                  -
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  ...GST.CENTER,
                  backgroundColor: colors.lightblue,
                  padding: RF(5),
                  width: RF(35),
                  borderRadius: RF(10),
                }}
              >
                <Text style={{...GST.description, fontFamily: fontFamily.DMreg}}>{quantity}</Text>
              </View>
              <TouchableOpacity
                style={{
                  ...GST.CENTER,
                  height: RF(25),
                  width: RF(25),
                  backgroundColor: colors.DarkWhite,
                  borderColor: colors.blue,
                  borderWidth: 1,
                  borderRadius: RF(100),
                }}
                onPress={handleIncrement}
              >
                <Text style={{ ...GST.subdescription, color: colors.blue, marginBottom: RF(5) }}>
                  +
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity>
              <Add height={25} width={RF(25)} />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

// ... rest of the styles remain the same ...

const styles = StyleSheet.create({
  cartItemContainer: {
    ...GST.ROW,
    borderRadius: RF(12),
    width: '100%',
    marginTop:RF(10),
    justifyContent:"space-between",
    paddingHorizontal:RF(2)
  },
  imageContainer: {
    width: RF(120),
    height: RF(110),
    padding: RF(3),
    borderRadius: RF(12),
    backgroundColor: colors.DarkWhite,
    elevation: 5,
  },
  productImage: {
    height: '100%',
    width: '100%',
    borderRadius: RF(10),
    backgroundColor: colors.lightpink,
  },
  deleteButton: {
    position: 'absolute',
    bottom: RF(15),
    left: RF(15),
    width: RF(30),
    height: RF(30),
    borderRadius: RF(16),
    backgroundColor: colors.DarkWhite,
    ...GST.CENTER,
  },

  productDetails: {
     height:RF(110),
     width:"59%",
    justifyContent:"space-between",
    borderRadius:RF(12),
  },
  productTitle: {
    ...GST.smallesttxt,
    color: colors.darkblack,
    fontSize: RF(12),
  },
  productPrice: {
    ...GST.description,
    fontFamily: 'Raleway-Bold',
    color: colors.darkblack,
  },
  optionsContainer: {
    ...GST.CENTERCONTAINER,
    width: '100%',
  },
  optionButton: {
    paddingHorizontal: RF(15),
    paddingVertical: RF(4),
    borderRadius: RF(8),
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
    ...GST.subdescription,
    fontFamily: 'NunitoSans-Regular',
    color: colors.darkblack,
  },
  selectedOptionText: {
    color: colors.darkblack,
    fontFamily: 'NunitoSans-SemiBold',
  },
});

export default CartItem;
